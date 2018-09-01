package io.liji.ycycqwedding.config;


import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * created by jili on 2018/8/18
 */
@Data
@Component
@ConfigurationProperties("wechat")
public class WechatConfig {

    /**
     * 小程序id
     */
    private String appId;

    /**
     * 小程序密钥
     */
    private String appSecret;
}
