package utils.selectors;

import org.openqa.selenium.By;

public abstract class ElementSelectors {

    public static By byTestId(String testId) {
        return By.cssSelector(String.format("[data-testid='%s']", testId));
    }

}
