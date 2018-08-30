package io.liji.ycycqwedding.constants;

import lombok.Getter;

/**
 * created by jili on 2018/8/28
 */
@Getter
public enum TaskStatusEnum {
    UNCOMPLETE(0, "未完成"),
    COMPELED(1, "已完成");

    private Integer code;
    private String msg;
    TaskStatusEnum(Integer code, String msg) {
        this.code = code;
        this.msg = msg;
    }


}
