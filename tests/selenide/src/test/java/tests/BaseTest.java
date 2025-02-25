package tests;

import com.codeborne.selenide.WebDriverRunner;
import com.codeborne.selenide.logevents.SelenideLogger;
import io.qameta.allure.selenide.AllureSelenide;
import lombok.extern.log4j.Log4j2;
import org.openqa.selenium.WebDriver;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.AfterSuite;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.BeforeSuite;
import utils.listenres.AddTestIdListener;
import utils.wiremock.WiremockServer;
import wiremock.com.fasterxml.jackson.core.JsonProcessingException;

import java.lang.reflect.Method;

import static utils.factories.WebDriverProvider.createDriver;
import static utils.wiremock.WiremockServer.wiremockServer;

@Log4j2
public class BaseTest {

    protected WiremockServer wiremockServer;

    @BeforeSuite
    public void beforeSuite() throws JsonProcessingException {
        this.wiremockServer = wiremockServer();
        this.wiremockServer.start();
    }

    @AfterSuite
    public void afterSuite() {
        this.wiremockServer.stop();
    }

    @BeforeMethod(description = "Открыть браузер")
    public void beforeMethod(Method test) {
        SelenideLogger.addListener("AllureSelenide", new AllureSelenide()
            .screenshots(true)
            .savePageSource(true)
            .includeSelenideSteps(false)
        );

        WebDriver driver = createDriver(
            test,
            new AddTestIdListener(test)
        );
        WebDriverRunner.setWebDriver(driver);
    }

    @AfterMethod(alwaysRun = true, description = "Закрыть браузер")
    public void afterMethod(Method test) {
        if (WebDriverRunner.hasWebDriverStarted()) {
            WebDriverRunner.closeWebDriver();
        }
    }

}
