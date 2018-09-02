package io.liji.ycycqwedding.web;

import com.alibaba.fastjson.JSONObject;
import com.google.common.base.Strings;
import io.liji.ycycqwedding.constants.JsonResponseStatusEnum;
import io.liji.ycycqwedding.constants.WechatApiConstants;
import io.liji.ycycqwedding.model.JsonResponse;
import io.liji.ycycqwedding.model.User;
import io.liji.ycycqwedding.service.UserService;
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
}
