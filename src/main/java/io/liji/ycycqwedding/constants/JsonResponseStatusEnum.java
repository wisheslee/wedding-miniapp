package io.liji.ycycqwedding.constants;

import lombok.Getter;

/**
 * created by jili on 2018/9/1
 */
@Getter
public enum JsonResponseStatusEnum {
    success(200, "成功"),
    YOUFUCKUP(400, "失败"),
    IFUCKUP(500, "失败");
    private Integer code;
    private String msg;

    JsonResponseStatusEnum(Integer code, String msg) {
        this.code = code;
        this.msg = msg;
    }
}
