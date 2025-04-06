package org.example.springtest.api.matchers;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

import static io.qameta.allure.Allure.step;
import static java.text.MessageFormat.format;
import static org.springframework.test.util.AssertionErrors.assertEquals;

public class StatusResultMatchers {

    protected StatusResultMatchers() {
    }

    public ApiResultMatcher is(int status) {
        return is(HttpStatus.valueOf(status));
    }

    public ApiResultMatcher isBadRequest() {
        return is(HttpStatus.BAD_REQUEST);
    }

    public ApiResultMatcher is(HttpStatusCode statusCode) {
        return result ->
            step(
                format("Expect response status {0}", statusCode.value()),
                () -> assertEquals("Response status", statusCode.value(), result.getResponse().status())
            );
    }


}
