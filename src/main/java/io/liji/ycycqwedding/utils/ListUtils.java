package io.liji.ycycqwedding.utils;

import java.util.List;

/**
 * created by jili on 2018/9/2
 */

public class ListUtils {
    public static <T> boolean isNullOrEmpty(List<T> list) {
        return list == null || list.size() == 0;
    }
}
