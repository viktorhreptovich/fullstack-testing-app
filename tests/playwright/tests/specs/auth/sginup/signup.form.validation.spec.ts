import { test } from '@playwright/test';
import { AuthPage } from '../../../objects/pages/auth.page';
import signUpFormValidationData from '../../../testdata/signup.form.validation.json';
import { SignUpPage } from '../../../objects/pages/signup.page';

test.describe('Auth', () => {
  test.describe('"Sign up" form validation (json file)', () => {
    signUpFormValidationData.forEach(
      ({
        testCaseTitle,
        userName,
        userNameError,
        email,
        emailError,
        password,
        passwordError,
        signUpButtonDisabled,
      }) => {
        test(`${testCaseTitle}`, async ({ page }) => {
          const signUpPage = new SignUpPage(page);

          await signUpPage.open();
          const signUpForm = signUpPage.signUpForm;
          await signUpForm.setForm(userName, email, password);
          userNameError
            ? await signUpForm.userNameErrorShouldBeVisible(userNameError)
            : await signUpForm.userNameErrorShouldNotBeVisible();
          emailError
            ? await signUpForm.emailErrorShouldBeVisible(emailError)
            : await signUpForm.emailErrorShouldNotBeVisible();
          passwordError
            ? await signUpForm.passwordErrorShouldBeVisible(passwordError)
            : await signUpForm.passwordErrorShouldNotBeVisible();
          signUpButtonDisabled
            ? await signUpForm.signUpButtonShouldBeDisabled()
            : await signUpForm.signUpButtonShouldBeEnabled();
        });
      },
    );
  });
});
