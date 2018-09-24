package io.liji.ycycqwedding.service;

import com.google.common.base.Strings;
import io.liji.ycycqwedding.constants.TaskLockStatus;
import io.liji.ycycqwedding.dao.mapper.TaskMapper;
import io.liji.ycycqwedding.model.Task;
import io.liji.ycycqwedding.model.vo.TaskStatusVO;
import io.liji.ycycqwedding.utils.ListUtils;
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
            if (i == 1) {
                task.setLockStatus(TaskLockStatus.UNLOCK.getCode());
            } else {
                task.setLockStatus(TaskLockStatus.LOCK.getCode());
            }
            this.createTask(task);
        }
    }

    private void createTask(Task task) {
        if (task == null)
            return;
        taskMapper.createTask(task);
    }

    public void updateTaskStatus(String openid, int taskId) {
        if (Strings.isNullOrEmpty(openid))
            return;
        taskMapper.updateTaskStatus(openid, taskId);
    }

    public List<Task> getTasksByOpenid(@Param("openid") String openid) {
        if(Strings.isNullOrEmpty(openid))
            return new ArrayList<>();
        return taskMapper.getTasksByOpenid(openid);
    }

    public List<Task> getCompleteTasksByOpenids(List<String> openids) {
        if(ListUtils.isNullOrEmpty(openids))
            return new ArrayList<>();
        return taskMapper.getCompleteTasksByOpenids(openids);
    }

    void deleteTaskByTaskId(int taskId) {
        taskMapper.deleteTaskByTaskId(taskId);
    }

    void deleteTaskByOpenidAndTaskId(String openid, int taskId) {
        taskMapper.deleteTaskByOpenidAndTaskId(openid, taskId);
    }

    public void updateLockStatus(TaskStatusVO vo) {
        taskMapper.unlockStatus(vo.getOpenid(), vo.getTaskId());
    }

}
