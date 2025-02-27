package tests.auth;

import backend.services.AuthService;
import io.qameta.allure.*;
import objects.pages.SignUpPage;
import org.testng.annotations.Test;
import tests.BaseTest;

import static backend.dto.ErrorResponseDto.conflict;
import static backend.dto.ErrorResponseDto.internalServerError;
import static utils.factories.ObjectProvider.instance;

@Epic("Autorization")
@Feature("Sign up")
@Story("Sign up form")
public class SignUpTest extends BaseTest {

    private final SignUpPage signUpPage = instance(SignUpPage.class);

    @Test(description = "'Sign up' form should be correct")
    public void signUpPageShouldBeCorrect() {
        signUpPage
            .open()
            .shouldBeOpen();
        signUpPage.signUpForm()
            .shouldBeVisible()
            .errorsShouldNotBeVisible()
            .signUpErrorShouldNotBeVisible()
            .signUpButtonShouldBeDisabled();
    }


    @AllureId("eebf0a74-f539-485f-a830-ced6f79f941d")
    @Description("Should show error: 'User already exists' when user exists")
    @Test(description = "Should show 'Sign up' error when user exists")
    public void shouldShowSignUpErrorWhenUserExists() {
        AuthService
            .signUp()
            .testId("eebf0a74-f539-485f-a830-ced6f79f941d")
            .withError(conflict("Email \"test1@test.com\" already in use"))
            .mock();

        signUpPage
            .open();
        signUpPage.signUpForm()
            .fillForm("existing", "existing@test.org", "password123")
            .clickSignUpButton();
        signUpPage.signUpForm()
            .signUpErrorShouldBeVisible("Email \"test1@test.com\" already in use");
    }

    @AllureId("d8fbacfc-c022-4688-a546-fcea55f54667")
    @Test(description = "Should show 'Sign up' error when server error")
    public void shouldShowSignUpErrorWhenServerError() {
        AuthService
            .signUp()
            .testId("d8fbacfc-c022-4688-a546-fcea55f54667")
            .withError(internalServerError())
            .mock();

        signUpPage
            .open();
        signUpPage.signUpForm()
            .fillForm("existing", "existing@test.org", "password123")
            .clickSignUpButton()
            .signUpErrorShouldBeVisible("Something went wrong. Please try again later.");
    }

}
