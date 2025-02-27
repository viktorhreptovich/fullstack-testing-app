package utils.factories;

import org.openqa.selenium.Capabilities;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.events.EventFiringDecorator;
import org.openqa.selenium.support.events.WebDriverListener;

import java.lang.reflect.Method;

public class WebDriverProvider {

    public static WebDriver createDriver(Method testMethod, WebDriverListener... listeners) {
        String hubUrl = "localhost";
//        URL hubUrl = TestConfiguration.getHubUrl();
        Capabilities capabilities = CapabilitiesFactory.getCapabilities(testMethod);
        try {
            WebDriver driver = new ChromeDriver((ChromeOptions) capabilities);
            for (WebDriverListener listener : listeners) {
                EventFiringDecorator<WebDriver> decorator = new EventFiringDecorator<>(listener);
                driver = decorator.decorate(driver);
            }
            return driver;
        } catch (Exception e) {
            throw new Error("Create driver:\n" + hubUrl + "\n" + capabilities + "\n" + e.getMessage());
        }
    }
//
//    private static void adjustBrowserSize(WebDriver driver, String browserSize) throws Exception {
//        if (browserSize != null && browserSize.matches("^([0-9][0-9]*)x([0-9][0-9]*)$")) {
//            String[] dimension = browserSize.split("x");
//            int width = Integer.parseInt(dimension[0]);
//            int height = Integer.parseInt(dimension[1]);
//            driver.manage().window().setPosition(new Point(0, 0));
//            driver.manage().window().setSize(new org.openqa.selenium.Dimension(width, height));
//        } else {
//            throw new Exception("Cannot set window size: " + browserSize);
//        }
//    }

}
