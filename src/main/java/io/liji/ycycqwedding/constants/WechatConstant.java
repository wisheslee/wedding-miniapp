package io.liji.ycycqwedding.constants;


/**
 * created by jili on 2018/8/18
 */

public class WechatConstant {
    public static final String APP_ID = "wxde61fb45f6d68a5f";
    public static final String APP_SECRET = "4b70a22117c2463cf55bbfd6739f65e0";

    public static final String GET_OPENID_URL(String code) {
        return "https://api.weixin.qq.com/sns/jscode2session?appid=" + APP_ID + "&secret=" + APP_SECRET + "&js_code=" + code + "&grant_type=authorization_code";
    }
}
