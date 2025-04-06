package org.example.springtest.api.matchers;

import feign.Response;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ApiResult<T> {

    private final Response response;

    public ApiResult<T> expect(ApiResultMatcher matcher) {
        matcher.match(this);
        return this;
    }

}
