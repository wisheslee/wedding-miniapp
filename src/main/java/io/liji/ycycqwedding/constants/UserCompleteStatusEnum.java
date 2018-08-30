package io.liji.ycycqwedding.constants;

import lombok.Getter;

/**
 * created by jili on 2018/8/28
 */
@Getter
public enum UserCompleteStatusEnum {
    UNCOMPLETE(0, "未完成"),
    COMPLETED(1, "已完成");

    UserCompleteStatusEnum(Integer code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    private Integer code;
    private String msg;
}
