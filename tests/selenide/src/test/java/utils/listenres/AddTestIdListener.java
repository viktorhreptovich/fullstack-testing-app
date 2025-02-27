package utils.listenres;

import io.qameta.allure.AllureId;
import lombok.extern.log4j.Log4j2;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.events.WebDriverListener;

import java.lang.reflect.Method;
import java.net.URL;
import java.util.Optional;

import static com.codeborne.selenide.Selenide.localStorage;

@Log4j2
public class AddTestIdListener implements WebDriverListener {

    private final Optional<String> testId;

    public AddTestIdListener(Method test) {
        log.info("Add @AllureId annotation to {}", test.getName());
        this.testId = Optional.ofNullable(test.getAnnotation(AllureId.class)).map(AllureId::value);
        if (testId.isEmpty()) {
            log.warn("Test {} doesn't have @AllureId annotation", test.getName());
        }
    }

    @Override
    public void afterTo(WebDriver.Navigation navigation, String url) {
        testId.ifPresent(this::setTestIdToLocalStorage);
    }

    @Override
    public void afterTo(WebDriver.Navigation navigation, URL url) {
        testId.ifPresent(this::setTestIdToLocalStorage);
    }

    private void setTestIdToLocalStorage(String testId) {
        localStorage().setItem("test-id", testId);
    }

}
