package objects.forms;

import com.codeborne.selenide.SelenideElement;
import io.qameta.allure.Step;

import static com.codeborne.selenide.Condition.*;
import static utils.selectors.ElementSelectors.byTestId;

public class SignUpForm {

    private final SelenideElement container;
    private final SelenideElement userNameInput;
    private final SelenideElement userNameError;
    private final SelenideElement emailInput;
    private final SelenideElement emailError;
    private final SelenideElement passwordInput;
    private final SelenideElement passwordError;
    private final SelenideElement signUpError;
    private final SelenideElement signUpButton;
    private final SelenideElement goSignInButton;

    public SignUpForm(SelenideElement container) {
        this.container = container;
        this.userNameInput = container.$(byTestId("input-username"));
        this.userNameError = container.$(byTestId("error-username"));
        this.emailInput = container.$(byTestId("input-email"));
        this.emailError = container.$(byTestId("error-email"));
        this.passwordInput = container.$(byTestId("input-password"));
        this.passwordError = container.$(byTestId("error-password"));
        this.signUpError = container.$(byTestId("error-signup"));
        this.signUpButton = container.$(byTestId("button-signup"));
        this.goSignInButton = container.$(byTestId("link-go-signin"));
    }

    @Step("'Sign up' form should be visible")
    public SignUpForm shouldBeVisible() {
        this.userNameInputShouldBeVisible();
        this.emailInputShouldBeVisible();
        this.passwordInputShouldBeVisible();
        this.signUpButtonShouldBeVisible();
        this.goSignInButtonShouldBeVisible();
        return this;
    }

    @Step("Fill form with '{userName}', '{email}' and '{password}'")
    public SignUpForm fillForm(String userName, String email, String password) {
        this.fillUserNameInput(userName);
        this.fillEmailInput(email);
        this.fillPasswordInput(password);
        return this;
    }

    @Step("Set form to '{userName}', '{email}' and '{password}'")
    public SignUpForm setForm(String userName, String email, String password) {
        this.setUserNameInput(userName);
        this.setEmailInput(email);
        this.setPasswordInput(password);
        return this;
    }

    @Step("Errors should not be visible")
    public SignUpForm errorsShouldNotBeVisible() {
        this.userNameErrorShouldNotBeVisible();
        this.emailErrorShouldNotBeVisible();
        this.passwordErrorShouldNotBeVisible();
        return this;
    }

    @Step("'Username' input should be visible")
    public SignUpForm userNameInputShouldBeVisible() {
        this.userNameInput.shouldBe(visible);
        return this;
    }

    @Step("Fill 'Username' input with '{userName}'")
    public SignUpForm fillUserNameInput(String userName) {
        this.userNameInput.sendKeys(userName);
        return this;
    }

    @Step("Set 'Username' input to '{userName}'")
    public SignUpForm setUserNameInput(String userName) {
        this.userNameInput.setValue(userName);
        return this;
    }

    @Step("'Username' error should be visible")
    public SignUpForm userNameErrorShouldBeVisible() {
        this.userNameError.shouldBe(visible);
        return this;
    }

    @Step("'Username' error: '{errorMessage}' should be visible")
    public SignUpForm userNameErrorShouldBeVisible(String errorMessage) {
        this.userNameError.shouldHave(exactText(errorMessage));
        return this;
    }

    @Step("'Username' error should not be visible")
    public SignUpForm userNameErrorShouldNotBeVisible() {
        this.userNameError.shouldNotBe(visible);
        return this;
    }

    @Step("'Email' input should be visible")
    public SignUpForm emailInputShouldBeVisible() {
        this.emailInput.shouldBe(visible);
        return this;
    }

    @Step("Fill 'Email' input with '{email}'")
    public SignUpForm fillEmailInput(String email) {
        this.emailInput.sendKeys(email);
        return this;
    }

    @Step("Set 'Email' input to '{email}'")
    public SignUpForm setEmailInput(String email) {
        this.emailInput.setValue(email);
        return this;
    }

    @Step("'Email' error should be visible")
    public SignUpForm emailErrorShouldBeVisible() {
        this.emailError.shouldBe(visible);
        return this;
    }

    @Step("'Email' error: '{errorMessage}' should be visible")
    public SignUpForm emailErrorShouldBeVisible(String errorMessage) {
        this.emailError.shouldHave(exactText(errorMessage));
        return this;
    }

    @Step("'Email' error should not be visible")
    public SignUpForm emailErrorShouldNotBeVisible() {
        this.emailError.shouldNotBe(visible);
        return this;
    }

    @Step("'Password' input should be visible")
    public SignUpForm passwordInputShouldBeVisible() {
        this.passwordInput.shouldBe(visible);
        return this;
    }

    @Step("Fill 'Password' input with '{password}'")
    public SignUpForm fillPasswordInput(String password) {
        this.passwordInput.sendKeys(password);
        return this;
    }

    @Step("Set 'Password' input to '{password}'")
    public SignUpForm setPasswordInput(String password) {
        this.passwordInput.setValue(password);
        return this;
    }

    @Step("'Password' error should be visible")
    public SignUpForm passwordErrorShouldBeVisible() {
        this.passwordError.shouldBe(visible);
        return this;
    }

    @Step("'Password' error: '{errorMessage}' should be visible")
    public SignUpForm passwordErrorShouldBeVisible(String errorMessage) {
        this.passwordError.shouldHave(exactText(errorMessage));
        return this;
    }

    @Step("'Password' error should not be visible")
    public SignUpForm passwordErrorShouldNotBeVisible() {
        this.passwordError.shouldNotBe(visible);
        return this;
    }

    @Step("'Sign up' error should be visible")
    public SignUpForm signUpErrorShouldBeVisible() {
        this.signUpError.shouldBe(visible);
        return this;
    }

    @Step("'Sign up' error: '{errorMessage}' should be visible")
    public SignUpForm signUpErrorShouldBeVisible(String errorMessage) {
        this.signUpError.shouldHave(exactText(errorMessage));
        return this;
    }

    @Step("'Sign up' error should not be visible")
    public SignUpForm signUpErrorShouldNotBeVisible() {
        this.signUpError.shouldNotBe(visible);
        return this;
    }

    @Step("'Sign up' button should be visible")
    public SignUpForm signUpButtonShouldBeVisible() {
        this.signUpButton.shouldHave(exactText("Sign up"));
        return this;
    }

    @Step("'Sign up' button should be disabled")
    public SignUpForm signUpButtonShouldBeDisabled() {
        this.signUpButton.shouldBe(disabled);
        return this;
    }

    @Step("'Sign up' button should be enabled")
    public SignUpForm signUpButtonShouldBeEnabled() {
        this.signUpButton.shouldBe(enabled);
        return this;
    }

    @Step("Click 'Sign up' button")
    public SignUpForm clickSignUpButton() {
        this.signUpButton.click();
        return this;
    }

    @Step("'Go to sign in' button should be visible")
    public SignUpForm goSignInButtonShouldBeVisible() {
        this.goSignInButton.shouldHave(exactText("You already have an account?"));
        return this;
    }

    @Step("Click 'Go to sign in' button")
    public SignUpForm clickGoSignInButton() {
        this.goSignInButton.click();
        return this;
    }

}