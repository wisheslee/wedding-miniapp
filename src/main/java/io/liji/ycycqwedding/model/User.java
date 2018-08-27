package io.liji.ycycqwedding.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * created by jili on 2018/8/28
 */
@Data
@Entity
public class User {
    @Id
    private String openid;
    private String name;
    private String avatar;
    //所有任务是否完成
    private Integer completeStatus;
    //完成后是否领取奖励
    private Integer rewardStatus;
}
