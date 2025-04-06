package org.example.springtest.api.clients;

import org.example.springtest.api.dto.AuthSignUpDto;
import org.example.springtest.api.matchers.ApiResult;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient("auth-service")
public interface AuthClient {

    @PostMapping("/api/auth/signup")
    ApiResult signUp(@RequestBody AuthSignUpDto signUpAuthDto);

}
