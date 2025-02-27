package utils.factories;

import org.openqa.selenium.Capabilities;
import org.openqa.selenium.chrome.ChromeOptions;

import java.lang.reflect.Method;

public class CapabilitiesFactory {

    public static Capabilities getCapabilities(Method testMethod) {

//        Map<String, Object> selenoidOptions = TestConfiguration.getSelenoidOptions();
        ChromeOptions chromeOptions = new ChromeOptions();
        chromeOptions.addArguments("--headless");
//        chromeOptions.setCapability("selenoid:options", selenoidOptions);
//        if (TestConfiguration.isHeadless()) {
//            chromeOptions.addArguments("--headless");
//        }
        chromeOptions.addArguments("--remote-allow-origins=*");
        return chromeOptions;
    }

}
