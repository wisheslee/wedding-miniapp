package io.liji.ycycqwedding.service;

import com.google.common.base.Strings;
import io.liji.ycycqwedding.dao.mapper.UserMapper;
import io.liji.ycycqwedding.model.User;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * created by jili on 2018/8/30
 */
@Service
public class UserService {
    @Resource
    private UserMapper userMapper;

    public void createUser(User user) {
        if(user == null)
            return;
        userMapper.createUser(user);
    }

    public User getUser(String openid) {
        if(Strings.isNullOrEmpty(openid))
            return null;
        return userMapper.getUser(openid);
    }

    public void updateCompleteStatus(String openid) {
        if(Strings.isNullOrEmpty(openid))
            return;
        userMapper.updateCompleteStatus(openid);
    }

    public void updateRewardStatus(String openid) {
        if(Strings.isNullOrEmpty(openid))
            return;
        userMapper.updateRewardStatus(openid);
    }
}
