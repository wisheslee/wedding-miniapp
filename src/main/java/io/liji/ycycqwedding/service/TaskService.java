package io.liji.ycycqwedding.service;

import com.google.common.base.Strings;
import io.liji.ycycqwedding.dao.mapper.TaskMapper;
import io.liji.ycycqwedding.model.Task;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * created by jili on 2018/8/30
 */
@Service
public class TaskService {

    @Resource
    private TaskMapper taskMapper;

    public void createDefaultTasks(String openid) {
        for (int i = 1; i < 7; i++) {
            Task task = new Task();
            task.setOpenid(openid);
            task.setTaskId(i);
            this.createTask(task);
        }
    }

    private void createTask(Task task) {
        if (task == null)
            return;
        taskMapper.createTask(task);
    }

    public void updateTaskStatus(String openid) {
        if (Strings.isNullOrEmpty(openid))
            return;
        taskMapper.updateTaskStatus(openid);
    }

    public void updateTaskExtra(String openid, String extra) {
        if(Strings.isNullOrEmpty(openid))
            return;
        taskMapper.updateTaskExtra(openid, extra);
    }

    public List<Task> getTasksByOpenid(@Param("openid") String openid) {
        if(Strings.isNullOrEmpty(openid))
            return new ArrayList<>();
        return taskMapper.getTasksByOpenid(openid);
    }

    void deleteTaskByTaskId(int taskId) {
        taskMapper.deleteTaskByTaskId(taskId);
    }

    void deleteTaskByOpenidAndTaskId(String openid, int taskId) {
        taskMapper.deleteTaskByOpenidAndTaskId(openid, taskId);
    }
}
