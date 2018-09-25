package io.liji.ycycqwedding.utils;

import com.google.common.base.Strings;

/**
 * created by jili on 2018/9/3
 */

public class OpenidUtil {
    public static String realOpenid(String openid) {
        if(Strings.isNullOrEmpty(openid))
            return null;
        return openid.substring(1, openid.length() - 1);
    }

    public static String mixOpenid(String openid) {
        if (Strings.isNullOrEmpty(openid)) {
            return null;
        }
        return "x" + openid + "l";
    }
}

