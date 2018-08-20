package io.liji.ycycqwedding.web;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * created by jili on 2018/8/18
 */
@RestController
public class AuthController {
    @PostMapping(value = "/auth")
    public String auth() {
        return null;
    }

    @GetMapping(value = "hello")
    public String hello() {
        return "hello world!";
    }
}
