package org.example.springtest.interceptors;

import feign.InvocationContext;
import feign.Response;
import feign.ResponseInterceptor;
import feign.Util;
import org.example.springtest.api.matchers.ApiResult;

import java.io.IOException;

import static feign.Util.ensureClosed;

public class ApiResponseInterceptor implements ResponseInterceptor {

    private static final long MAX_RESPONSE_BUFFER_SIZE = 8192L;

    private static Response disconnectResponseBodyIfNeeded(Response response) throws IOException {
        final boolean shouldDisconnectResponseBody =
            response.body() != null
                && response.body().length() != null
                && response.body().length() <= MAX_RESPONSE_BUFFER_SIZE;
        if (!shouldDisconnectResponseBody) {
            return response;
        }

        try {
            final byte[] bodyData = Util.toByteArray(response.body().asInputStream());
            return response.toBuilder().body(bodyData).build();
        } finally {
            ensureClosed(response.body());
        }
    }

    @Override
    public Object intercept(InvocationContext invocationContext, Chain chain) throws Exception {
        return new ApiResult(invocationContext.response());
    }

}
