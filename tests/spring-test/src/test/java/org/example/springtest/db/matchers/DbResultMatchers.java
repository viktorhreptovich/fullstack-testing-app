package org.example.springtest.db.matchers;

import static io.qameta.allure.Allure.step;
import static org.springframework.test.util.AssertionErrors.assertNotNull;

public class DbResultMatchers {

    public static DbResultMatcher exists() {
        return result ->
            step(
                "Expect entity exists",
                () -> assertNotNull("Entity", (result.getEntity()))
            );
    }

}
