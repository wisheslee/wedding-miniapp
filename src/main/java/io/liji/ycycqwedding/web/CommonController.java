package io.liji.ycycqwedding.web;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.google.common.base.Strings;
import com.google.common.collect.Lists;
import io.liji.ycycqwedding.constants.JsonResponseStatusEnum;
import io.liji.ycycqwedding.constants.TaskConstant;
import io.liji.ycycqwedding.constants.WechatApiConstants;
import io.liji.ycycqwedding.model.JsonResponse;
import io.liji.ycycqwedding.model.Task;
import io.liji.ycycqwedding.model.User;
import io.liji.ycycqwedding.model.vo.TaskStatusVO;
import io.liji.ycycqwedding.service.TaskService;
import io.liji.ycycqwedding.service.UserService;
import io.liji.ycycqwedding.utils.OpenidUtil;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.HttpEntity;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * created by jili on 2018/8/18
 */
@RestController
@Slf4j
public class CommonController {

    @Autowired
    private UserService userService;
    @Autowired
    private TaskService taskService;

    @PostMapping(value = "/login")
    public JsonResponse auth(@RequestBody JSONObject object) {
        String code = object.getString("code");
        if (Strings.isNullOrEmpty(code))
            return JsonResponse.create()
                    .setStatus(JsonResponseStatusEnum.YOUFUCKUP.getCode())
                    .setMsg("无效code");
        return userService.Login(code);
    }

    @GetMapping(value = "hello")
    public String hello() {
        return "hello world!";
    }

    @GetMapping(value = "/complete_list")
    public JsonResponse getComleteList() {
        List<User> userList = userService.getUsersCompleteAtLeastOne();
        return JsonResponse.create().setData(userList);
    }

    @PostMapping(value = "/user")
    public JsonResponse updateUser(@RequestBody User user) {
        if (Strings.isNullOrEmpty(user.getOpenid()))
            return JsonResponse.create().setStatus(JsonResponseStatusEnum.YOUFUCKUP.getCode()).setMsg("openid不正确");
        user.setOpenid(OpenidUtil.realOpenid(user.getOpenid()));
        userService.updateInfo(user);
        return JsonResponse.create();
    }

    @PostMapping(value = "/update_task_status")
    public JsonResponse updateTaskStatus(@RequestBody TaskStatusVO vo) {
        vo.setOpenid(OpenidUtil.realOpenid(vo.getOpenid()));
        taskService.updateTaskStatus(vo.getOpenid(), vo.getTaskId());
        userService.updateTaskUpdateTime(vo.getOpenid());
        List<Task> taskList = taskService.getCompleteTasksByOpenids(Lists.newArrayList(vo.getOpenid()));
        if (taskList.size() == TaskConstant.taskAmount) {
            userService.updateCompleteStatus(vo.getOpenid());
        }
        return JsonResponse.create();
    }

    @PostMapping(value = "/get_task_list")
    public JsonResponse getTaskList(@RequestBody JSONObject jsonObject) {
        String openid = OpenidUtil.realOpenid(jsonObject.getString("openid"));
        if(Strings.isNullOrEmpty(openid))
            return JsonResponse.create().setStatus(JsonResponseStatusEnum.YOUFUCKUP.getCode()).setMsg("openid不正确");
        List<Task> taskList = taskService.getTasksByOpenid(openid);
        log.info("get_task_list，数量" + taskList.size() + "openid"+ openid);
        return JsonResponse.create().setData(taskList);
    }
}
