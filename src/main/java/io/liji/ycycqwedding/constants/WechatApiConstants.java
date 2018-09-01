package io.liji.ycycqwedding.constants;

import io.liji.ycycqwedding.config.WechatConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.stereotype.Component;

/**
 * created by jili on 2018/9/1
 */
@Component
public class WechatApiConstants {

    @Autowired
    private static WechatConfig wechatConfig;

    public static final String getOpenid(String code) {
        return "https://api.weixin.qq.com/sns/jscode2session?appid=" + wechatConfig.getAppId() + "&secret=" + wechatConfig.getAppSecret() + "&js_code=" + code + "&grant_type=authorization_code";
    }
}
