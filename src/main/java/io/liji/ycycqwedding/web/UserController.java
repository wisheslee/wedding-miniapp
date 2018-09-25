package io.liji.ycycqwedding.web;

import com.alibaba.fastjson.JSONObject;
import com.google.common.base.Strings;
import io.liji.ycycqwedding.constants.JsonResponseStatusEnum;
import io.liji.ycycqwedding.constants.UserRewardStatusEnum;
import io.liji.ycycqwedding.model.JsonResponse;
import io.liji.ycycqwedding.model.User;
import io.liji.ycycqwedding.service.TaskService;
import io.liji.ycycqwedding.service.UserService;
import io.liji.ycycqwedding.utils.OpenidUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
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
public class UserController {

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

    @PostMapping(value = "/user")
    public JsonResponse updateUser(@RequestBody User user) {
        log.info("/user", user);
        if (Strings.isNullOrEmpty(user.getOpenid())) {
            log.error("openid不正确");
            return JsonResponse.create().setStatus(JsonResponseStatusEnum.YOUFUCKUP.getCode()).setMsg("openid不正确");
        }
        user.setOpenid(OpenidUtil.realOpenid(user.getOpenid()));
        userService.updateInfo(user);
        return JsonResponse.create();
    }

    @GetMapping(value = "/user")
    public JsonResponse getUser(String openid) {
        if (Strings.isNullOrEmpty(openid)) {
            log.error("openid不正确");
            return JsonResponse.create().setStatus(JsonResponseStatusEnum.YOUFUCKUP.getCode()).setMsg("openid不正确");
        }
        openid = OpenidUtil.realOpenid(openid);
        User user = userService.getUser(openid);
        user.setTaskList(taskService.getTasksByOpenid(openid));
        user.setOpenid(OpenidUtil.mixOpenid(user.getOpenid()));
        return JsonResponse.create().setData(user);
    }

    /**
     * todo 分布式锁
     * @param user
     * @return
     */
    @PostMapping(value = "/update_reward_status")
    public synchronized JsonResponse updateRewardStatus(@RequestBody User user) {
        log.info("/update_reward_stauts", user);
        if (Strings.isNullOrEmpty(user.getOpenid())) {
            log.error("openid不正确");
            return JsonResponse.create().setStatus(JsonResponseStatusEnum.YOUFUCKUP.getCode()).setMsg("openid不正确");
        }
        if (UserRewardStatusEnum.REWARDED.getCode().equals(user.getRewardStatus())) {
            return JsonResponse.create().setStatus(400).setMsg("不能重复兑换");
        }
        user.setOpenid(OpenidUtil.realOpenid(user.getOpenid()));
        List<User> completedUserList = userService.getCompletedUser();
        if (completedUserList.size() >= 10) {
            return JsonResponse.create().setStatus(400).setMsg("很遗憾，你的速度太慢了，名额已满");
        }
        userService.updateRewardStatus(user);
        return JsonResponse.create();
    }
}
