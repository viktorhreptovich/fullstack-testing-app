package objects.pages;

import com.codeborne.selenide.SelenideElement;
import io.qameta.allure.Step;
import objects.forms.SignUpForm;

import static com.codeborne.selenide.Condition.visible;
import static com.codeborne.selenide.Selenide.$x;
import static utils.selectors.ElementSelectors.byTestId;

public class SignUpPage extends BasePage {

    private final SelenideElement container = $x("//*[@data-testid='container' and .//*[@data-testid='form-signup']]");
    private final SignUpForm signUpForm = new SignUpForm(container.$(byTestId("form-signup")));


    public SignUpPage() {
        super("/signup");
    }

    public SignUpForm signUpForm() {
        return signUpForm;
    }

    @Step("'Sign up' page should be opened")
    @Override
    public SignUpPage shouldBeOpen() {
        this.container.shouldBe(visible);
        return this;
    }

    @Step("Open 'Sign up' page")
    public SignUpPage open() {
        super.open();
        return this;
    }

}
