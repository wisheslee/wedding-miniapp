package io.liji.ycycqwedding.constants;

import lombok.Getter;

/**
 * created by jili on 2018/8/28
 */
@Getter
public enum UserRewardStatusEnum {
    UNREWARD(0, "未奖励"),
    REWARDED(1, "已奖励");

    UserRewardStatusEnum(Integer code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    private Integer code;
    private String msg;
}
