package io.liji.ycycqwedding.service;

import com.alibaba.fastjson.JSONObject;
import com.google.common.base.Strings;
import io.liji.ycycqwedding.constants.JsonResponseStatusEnum;
import io.liji.ycycqwedding.constants.TaskStatusEnum;
import io.liji.ycycqwedding.constants.WechatApiConstants;
import io.liji.ycycqwedding.dao.mapper.UserMapper;
import io.liji.ycycqwedding.model.JsonResponse;
import io.liji.ycycqwedding.model.Task;
import io.liji.ycycqwedding.model.User;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

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

    public JsonResponse Login(String code) {
        CloseableHttpClient httpClient = HttpClients.createDefault();
        HttpGet httpGet = new HttpGet(WechatApiConstants.getOpenid(code));
        try {
            CloseableHttpResponse response = httpClient.execute(httpGet);
            HttpEntity entity = response.getEntity();
            if (entity != null) {
                JSONObject obj = JSONObject.parseObject(EntityUtils.toString(entity));
                String openid = obj.getString("openid");
                String sessionKey = obj.getString("session_key");
                User user = this.getUser(openid);
                if (user != null) {
                    this.updateSesionKey(openid, sessionKey);
                } else {
                    user = new User();
                    user.setOpenid(openid);
                    this.createUser(user);
                }
                List<Task> taskList = taskService.createDefaultTasks(openid);
                user.setTaskList(taskList);
                return JsonResponse.create().setData(user);
            }

            return JsonResponse.create().setData("");

        } catch (Exception e) {
            log.error("登录错误" + e.getStackTrace());
            return JsonResponse.create()
                    .setStatus(JsonResponseStatusEnum.IFUCKUP.getCode())
                    .setMsg("微信获取openid失败");
        }
    }


    public void createUser(User user) {
        if (user == null)
            return;
        userMapper.createUser(user);
    }

    public User getUser(String openid) {
        if (Strings.isNullOrEmpty(openid))
            return null;
        return userMapper.getUser(openid);
    }

    public void updateCompleteStatus(String openid) {
        if (Strings.isNullOrEmpty(openid))
            return;
        userMapper.updateCompleteStatus(openid);
    }

    public void updateRewardStatus(String openid) {
        if (Strings.isNullOrEmpty(openid))
            return;
        userMapper.updateRewardStatus(openid);
    }

    private void updateSesionKey(String openid, String sesesionKey) {
        userMapper.updateSessionKey(openid, sesesionKey);
    }
}
