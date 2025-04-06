package org.example.springtest.api.matchers;

@FunctionalInterface
public interface ApiResultMatcher {

    void match(ApiResult result);

}
