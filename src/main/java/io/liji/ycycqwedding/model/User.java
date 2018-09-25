package io.liji.ycycqwedding.model;

import io.liji.ycycqwedding.constants.UserCompleteStatusEnum;
import io.liji.ycycqwedding.constants.UserRewardStatusEnum;
import lombok.Data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * created by jili on 2018/8/28
 */
@Data
public class User {
    private String openid;
    private String name;
    private String avatar;
    private String sessionKey;
    //所有任务是否完成
    private Integer completeStatus = UserCompleteStatusEnum.UNCOMPLETE.getCode();
    //完成后是否领取奖励
    private Integer rewardStatus = UserRewardStatusEnum.UNREWARD.getCode();
    private String reward;
    private Date taskUpdateTime;
    private Date createTime;
    private Date updateTime;


    /**
     * 非数据库字段
     */
    private List<Task> taskList = new ArrayList<>();
}
