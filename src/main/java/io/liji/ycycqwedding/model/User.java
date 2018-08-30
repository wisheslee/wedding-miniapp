package io.liji.ycycqwedding.model;

import io.liji.ycycqwedding.constants.UserCompleteStatusEnum;
import io.liji.ycycqwedding.constants.UserRewardStatusEnum;
import lombok.Data;

import java.util.Date;

/**
 * created by jili on 2018/8/28
 */
@Data
public class User {
    private String openid;
    private String name;
    private String avatar;
    //所有任务是否完成
    private Integer completeStatus = UserCompleteStatusEnum.UNCOMPLETE.getCode();
    //完成后是否领取奖励
    private Integer rewardStatus = UserRewardStatusEnum.UNREWARD.getCode();
    private Date createTime;
    private Date updateTIme;
}
