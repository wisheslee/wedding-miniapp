package io.liji.ycycqwedding.model;

import io.liji.ycycqwedding.constants.JsonResponseStatusEnum;
import lombok.Getter;

/**
 * created by jili on 2018/9/1
 */
@Getter
public class JsonResponse<T> {
    private Integer status = JsonResponseStatusEnum.success.getCode();
    private String msg;
    private T data;

    public JsonResponse() {
    }

    public static JsonResponse create() {
        return new JsonResponse();
    }

    public JsonResponse setStatus(Integer status) {
        this.status = status;
        return this;
    }

    public JsonResponse setMsg(String msg) {
        this.msg = msg;
        return this;
    }

    public JsonResponse setData(T data) {
        this.data = data;
        return this;
    }
}
