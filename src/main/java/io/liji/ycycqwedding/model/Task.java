package io.liji.ycycqwedding.model;

import lombok.Data;
import sun.jvm.hotspot.jdi.IntegerTypeImpl;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * created by jili on 2018/8/28
 */
@Data
@Entity
public class Task {

    @Id
    @GeneratedValue
    private Integer id;
    private String openid;
    private Integer taskId;
    private Integer status;
    private String extra;
}
