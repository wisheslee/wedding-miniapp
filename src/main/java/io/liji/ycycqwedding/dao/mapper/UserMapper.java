package io.liji.ycycqwedding.dao.mapper;

import io.liji.ycycqwedding.model.User;
import org.apache.ibatis.annotations.Param;

import javax.annotation.ParametersAreNonnullByDefault;
import java.util.List;

/**
 * created by jili on 2018/8/28
 */

public interface UserMapper {

    void createUser(User user);

    void updateCompleteStatus(@Param("openid") String openid);

    void updateRewardStatus(@Param("openid") String openid, @Param("reward") String reward);

    void updateSessionKey(@Param("openid") String openid, @Param("sessionKey") String sessionKey);

    void updateTaskUpdateTime(@Param("openid") String openid);

    User getUser(@Param("openid") String openid);

    List<User> getUsersAll();

    List<User> getUsersCompleteAtLeastOne();

    List<User> getCompletedUser();

    void updateInfo(User user);

    void updateWords(@Param("openid") String openid, @Param("words") String words);
}
