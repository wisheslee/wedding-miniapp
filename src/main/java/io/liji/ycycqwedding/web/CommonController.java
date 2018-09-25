package io.liji.ycycqwedding.web;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.JSONReader;
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





    @GetMapping(value = "hello")
    public String hello() {
        log.info("测试接口");
        return "hello world!";
    }

    @PostMapping(value = "/errors")
    public JsonResponse errors(@RequestBody String e) {
        log.error("出错啦",e);
        return JsonResponse.create();
    }
}
