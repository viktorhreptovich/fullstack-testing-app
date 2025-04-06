package org.example.springtest;

import org.example.springtest.configurations.FeignConfig;
import org.example.springtest.configurations.TestConfig;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.test.context.ContextConfiguration;

@SpringBootApplication
@EnableFeignClients(basePackages = "org.example.springtest.api.clients")
@SpringBootTest
@ContextConfiguration(classes = {FeignConfig.class, TestConfig.class})
public class BaseTest {

}
