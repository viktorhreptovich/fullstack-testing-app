package org.example.springtest.configurations;

import feign.ResponseInterceptor;
import feign.okhttp.OkHttpClient;
import org.example.springtest.interceptors.AllureOkHttp3Interceptor;
import org.example.springtest.interceptors.ApiResponseInterceptor;
import org.example.springtest.interceptors.SwaggerInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FeignConfig {

    @Bean
    public OkHttpClient okHttpClient() {
        okhttp3.OkHttpClient client = new okhttp3.OkHttpClient.Builder()
            .addInterceptor(new AllureOkHttp3Interceptor())
            .addInterceptor(new SwaggerInterceptor())
            .build();
        return new OkHttpClient(client);
    }

    @Bean
    public ResponseInterceptor responseInterceptor() {
        return new ApiResponseInterceptor();
    }

}
