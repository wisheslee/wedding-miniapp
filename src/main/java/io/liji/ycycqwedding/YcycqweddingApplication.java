package io.liji.ycycqwedding;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("io.liji.ycycqwedding.dao.mapper")
public class YcycqweddingApplication {

    public static void main(String[] args) {
        SpringApplication.run(YcycqweddingApplication.class, args);
    }
}
