package io.liji.ycycqwedding.dao.mapper;

import io.liji.ycycqwedding.model.Task;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * created by jili on 2018/8/28
 */

public interface TaskMapper {

    void createTask(Task task);

    void updateTaskStatus(@Param("openid") String openId);

    void updateTaskExtra(@Param("openid") String openid, @Param("extra") String extra);

    List<Task> getTasksByOpenid(@Param("openid") String openid);

    void deleteTaskByTaskId(@Param("taskId") int taskId);

    void deleteTaskByOpenidAndTaskId(@Param("openid") String openid, @Param("taskid") int taskId);
}
