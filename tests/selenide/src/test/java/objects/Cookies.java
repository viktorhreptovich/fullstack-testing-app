package objects;

import io.qameta.allure.Step;
import org.openqa.selenium.Cookie;

import static com.codeborne.selenide.WebDriverRunner.getWebDriver;

public class Cookies {

    @Step("Добавить cookie с именем {name} и значением {value}")
    public static void addCookie(String name, String value) {
        Cookie cookie = new Cookie(name, value);
        getWebDriver().manage().addCookie(cookie);
    }

}
