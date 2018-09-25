package io.liji.ycycqwedding.web;

import com.alibaba.fastjson.JSONObject;
import com.google.common.base.Strings;
import com.google.common.collect.Lists;
import io.liji.ycycqwedding.constants.JsonResponseStatusEnum;
import io.liji.ycycqwedding.constants.TaskConstant;
import io.liji.ycycqwedding.model.JsonResponse;
import io.liji.ycycqwedding.model.Task;
import io.liji.ycycqwedding.model.User;
import io.liji.ycycqwedding.model.vo.TaskStatusVO;
import io.liji.ycycqwedding.service.TaskService;
import io.liji.ycycqwedding.service.UserService;
import io.liji.ycycqwedding.utils.OpenidUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author jili
 * @date 2018/9/25
 */
@RestController
@Slf4j
public class TaskController {

    @Autowired
    private UserService userService;
    @Autowired
    private TaskService taskService;

    @GetMapping(value = "/complete_list")
    public JsonResponse getComleteList() {
        List<User> userList = userService.getUsersCompleteAtLeastOne();
        return JsonResponse.create().setData(userList);
    }

    @PostMapping(value = "/update_task_status")
    public JsonResponse updateTaskStatus(@RequestBody TaskStatusVO vo) {
        vo.setOpenid(OpenidUtil.realOpenid(vo.getOpenid()));
        taskService.updateTaskStatus(vo.getOpenid(), vo.getTaskId());
        userService.updateTaskUpdateTime(vo.getOpenid());
        List<Task> taskList = taskService.getCompleteTasksByOpenids(Lists.newArrayList(vo.getOpenid()));
        //如果6个都完成了，标记整个项目都完成了
        if (taskList.size() == TaskConstant.taskAmount) {
            userService.updateCompleteStatus(vo.getOpenid());
        }
        return JsonResponse.create();
    }

    @PostMapping(value = "/update_lock_status")
    public JsonResponse updateLockStatus(@RequestBody TaskStatusVO vo) {
        log.info("update_lock_status", vo);
        vo.setOpenid(OpenidUtil.realOpenid(vo.getOpenid()));
        if (Strings.isNullOrEmpty(vo.getOpenid())) {
            log.error("openid不正确");
            return JsonResponse.create();
        }
        taskService.updateLockStatus(vo);
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
