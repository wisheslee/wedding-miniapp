package io.liji.ycycqwedding.constants;

import lombok.Getter;

/**
 * @author jili
 * @date 2018/9/23
 */
@Getter
public enum TaskLockStatus {
    UNLOCK(0, "已解锁"),
    LOCK(1, "未解锁");

    private Integer code;
    private String msg;

    TaskLockStatus(Integer code, String msg) {
        this.code = code;
        this.msg = msg;
    }
}
