package objects.pages;

import com.codeborne.selenide.Selenide;
import configuration.TestConfiguration;
import io.qameta.allure.Step;
import objects.Cookies;

import static com.codeborne.selenide.Selenide.webdriver;
import static com.codeborne.selenide.WebDriverConditions.url;

public abstract class BasePage<T extends BasePage> {

    private final String urlPage;
    private final String fullUrlPage;

    public BasePage(String url) {
        this.urlPage = url.replace(TestConfiguration.getUrl(), "");
        this.fullUrlPage = TestConfiguration.getUrl() + this.urlPage;
    }

    @Step("Открыть страницу: {this.fullUrlPage}")
    public T open() {
        Selenide.open(fullUrlPage);
        return (T) this;
    }

    @Step("Страница открыта")
    public abstract T shouldBeOpen();

    @Step("Обновить текущую страницу")
    public T refresh() {
        Selenide.refresh();
        return (T) this;
    }

    @Step("Вернуться назад")
    public T back() {
        Selenide.back();
        return (T) this;
    }


    public T checkUrl() {
        return checkUrl(fullUrlPage);
    }

    @Step("Проверить url: {testUrl}")
    public T checkUrl(String testUrl) {
        webdriver().shouldHave(url(testUrl));
        return (T) this;
    }

    public T checkUrlWithParams(String params) {
        String urlWithParams = String.format("%s?%s", fullUrlPage, params);
        return checkUrl(urlWithParams);
    }

    public T addCookie(String name, String value) {
        Cookies.addCookie(name, value);
        return (T) this;
    }

}
