package org.example.springtest.api.matchers;

public abstract class ApiResultMatchers {

    public static StatusResultMatchers status() {
        return new StatusResultMatchers();
    }

}
