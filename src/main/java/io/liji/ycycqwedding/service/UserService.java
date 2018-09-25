package io.liji.ycycqwedding.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.google.common.base.Strings;
import io.liji.ycycqwedding.constants.JsonResponseStatusEnum;
import io.liji.ycycqwedding.constants.TaskStatusEnum;
import io.liji.ycycqwedding.constants.WechatApiConstants;
import io.liji.ycycqwedding.dao.mapper.UserMapper;
import io.liji.ycycqwedding.model.JsonResponse;
import io.liji.ycycqwedding.model.Task;
import io.liji.ycycqwedding.model.User;
import io.liji.ycycqwedding.utils.ListUtils;
import io.liji.ycycqwedding.utils.OpenidUtil;
import jdk.nashorn.internal.runtime.linker.LinkerCallSite;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.*;
import java.util.stream.Collector;
import java.util.stream.Collectors;

/**
 * created by jili on 2018/8/30
 */
@Service
@Slf4j
public class UserService {
    @Resource
    private UserMapper userMapper;
    @Resource
    private TaskService taskService;
    @Resource
    private WechatApiConstants wechatApiConstants;

    /**
     * 对没有登录过的用户进行登录，主要是获取openid建立用户，并创建6个默认任务
     * @param code
     * @return
     */
    public JsonResponse Login(String code) {
        CloseableHttpClient httpClient = HttpClients.createDefault();
        HttpGet httpGet = new HttpGet(wechatApiConstants.getOpenid(code));
        String openid = null;
        String sessionKey = null;
        try {
            CloseableHttpResponse response = httpClient.execute(httpGet);
            HttpEntity entity = response.getEntity();
            if (entity != null) {
                JSONObject obj = JSONObject.parseObject(EntityUtils.toString(entity));
                openid = obj.getString("openid");
                sessionKey = obj.getString("session_key");
            }
        } catch (Exception e) {
            log.error("登录错误", e);
        }
        User user = this.getUser(openid);
        if (user != null) {
            this.updateSesionKey(openid, sessionKey);
        } else {
            //有新用户时，创建6个新的task
            user = new User();
            user.setOpenid(openid);
            this.createUser(user);
            user = this.getUser(openid);
            taskService.createDefaultTasks(openid);

        }
        user.setTaskList(taskService.getTasksByOpenid(openid));
        //混淆openid，传回前端
        user.setOpenid(OpenidUtil.mixOpenid(openid));
        return JsonResponse.create().setData(user);
    }


    /**
     * 排行榜
     * @return
     */
    public List<User> getUsersCompleteAtLeastOne() {
        List<User> userList = userMapper.getUsersCompleteAtLeastOne();
        if(ListUtils.isNullOrEmpty(userList))
            return new ArrayList<>();
        List<String> userOpenids = userList.stream().map(User::getOpenid).collect(Collectors.toList());
        List<Task> usersCompleteTaskList = taskService.getCompleteTasksByOpenids(userOpenids);
        Map<String, List<Task>> taskMap = usersCompleteTaskList.stream().collect(Collectors.groupingBy(Task::getOpenid));
        for (User user : userList) {
            List<Task> tasks = taskMap.get(user.getOpenid());
            if (tasks != null) {
                user.setTaskList(tasks);
            } else {
                user.setTaskList(new ArrayList<>());
            }
        }
        userList.sort((u1, u2) -> {
            if(u2.getTaskList().size() > u1.getTaskList().size()) {
                return 1;
            } else if (u2.getTaskList().size() < u1.getTaskList().size()) {
                return -1;
            } else {
                return u1.getTaskUpdateTime().compareTo(u2.getTaskUpdateTime());
            }
        });
        if (userList.size() > 10) {
            return userList.subList(0, 10);
        } else {
            return userList;
        }
    }

    /**
     * 更新用户信息，目前用来授权后更新头像和昵称
     * @param user
     */
    public void updateInfo(User user) {
        userMapper.updateInfo(user);
    }


    /**
     * 创建用户
     * @param user
     */
    public void createUser(User user) {
        if (user == null)
            return;
        userMapper.createUser(user);
    }

    /**
     * 根据openid获取用户
     * @param openid
     * @return
     */
    public User getUser(String openid) {
        if (Strings.isNullOrEmpty(openid))
            return null;
        return userMapper.getUser(openid);
    }


    public List<User> getCompletedUser() {
        List<User> userList = userMapper.getCompletedUser();
        if (ListUtils.isNullOrEmpty(userList)) {
            return new ArrayList<>();
        } else {
            return userList;
        }
    }
    /**
     * 将用户标记为完成状态，可领取奖励
     * @param openid
     */
    public void updateCompleteStatus(String openid) {
        if (Strings.isNullOrEmpty(openid))
            return;
        userMapper.updateCompleteStatus(openid);
    }

    /**
     * 标记用户为已领取奖励
     * @param openid
     */
    public void updateRewardStatus(User user) {
        if (Strings.isNullOrEmpty(user.getOpenid()))
            return;
        userMapper.updateRewardStatus(user.getOpenid(), user.getReward());
    }

    /**
     * 更新sessionkey，目前没有用到sessionkey
     * @param openid
     * @param sesesionKey
     */
    private void updateSesionKey(String openid, String sesesionKey) {
        userMapper.updateSessionKey(openid, sesesionKey);
    }

    /**
     * 完成一个任务时，将用户表里的最近任务完成事件更新，用作排行版的排序
     * @param openid
     */
    public void updateTaskUpdateTime(String openid) {
        userMapper.updateTaskUpdateTime(openid);
    }
}
