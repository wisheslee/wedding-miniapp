package io.liji.ycycqwedding.model;

import io.liji.ycycqwedding.constants.TaskStatusEnum;
import lombok.Data;
import sun.jvm.hotspot.jdi.IntegerTypeImpl;

import java.util.Date;


/**
 * created by jili on 2018/8/28
 */
@Data
public class Task {
    private Integer id;
    private String openid;
    private Integer taskId;
    private Integer status = TaskStatusEnum.UNCOMPLETE.getCode();
    private String extra;
    private boolean deleted = false;
    private Date createTime;
    private Date updateTime;
}
