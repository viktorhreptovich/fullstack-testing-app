import { expect, Locator, test } from '@playwright/test';

export class SignUpForm {
  private container: Locator;
  private userNameInput: Locator;
  private userNameError: Locator;
  private emailInput: Locator;
  private emailError: Locator;
  private passwordInput: Locator;
  private passwordError: Locator;
  private signUpButton: Locator;
  private goSignUpButton: Locator;
  private goSignInButton: Locator;

  constructor(container: Locator) {
    this.container = container;
    this.userNameInput = container.getByTestId('input-username');
    this.userNameError = container.getByTestId('error-username');
    this.emailInput = container.getByTestId('input-email');
    this.emailError = container.getByTestId('error-email');
    this.passwordInput = container.getByTestId('input-password');
    this.passwordError = container.getByTestId('error-password');
    this.signUpButton = container.getByTestId('button-auth');
    this.goSignUpButton = container.getByTestId('button-go-signup');
    this.goSignInButton = container.getByTestId('button-go-signin');
  }

  async shouldBeVisible() {
    await test.step('"Sign up" form should be visible', async () => {
      await this.userNameInputShouldBeVisible();
      await this.emailInputShouldBeVisible();
      await this.passwordInputShouldBeVisible();
      await this.signUpButtonShouldBeVisible();
      await this.goSignInButtonShouldBeVisible();
    });
  }

  async fillForm(userName: string, email: string, password: string) {
    await test.step(`Fill "Sign up" form with "${userName}", "${email}", "${password}"`, async () => {
      await this.fillUserNameInput(userName);
      await this.fillEmailInput(email);
      await this.fillPasswordInput(password);
    });
  }

  async setForm(userName: string, email: string, password: string) {
    await test.step(`Set "Sign up" form to "${userName}", "${email}", "${password}"`, async () => {
      await this.setUserNameInput(userName);
      await this.setEmailInput(email);
      await this.setPasswordInput(password);
    });
  }

  async errorsShouldNotBeVisible() {
    await test.step('"Sign up" form errors should not be visible', async () => {
      await this.userNameErrorShouldNotBeVisible();
      await this.emailErrorShouldNotBeVisible();
      await this.passwordErrorShouldNotBeVisible();
    });
  }

  async userNameInputShouldBeVisible() {
    await test.step(`"Username" input should be visible`, async () => {
      await expect(this.userNameInput).toBeVisible();
    });
  }

  async fillUserNameInput(userName: string) {
    await test.step(`Fill "Username" input with "${userName}"`, async () => {
      await this.userNameInput.fill(userName);
    });
  }

  async setUserNameInput(userName: string) {
    await test.step(`Set "Username" input to "${userName}"`, async () => {
      await this.userNameInput.fill(userName);
      await this.userNameInput.blur();
    });
  }

  async userNameErrorShouldBeVisible(errorMessage?: string) {
    if (!errorMessage) {
      await test.step(`"Username" error should be visible`, async () => {
        await expect(this.userNameError).toBeVisible();
      });
    } else {
      await test.step(`"Username" error: "${errorMessage}"  should be visible`, async () => {
        await expect(this.userNameError).toBeVisible();
        await expect(this.userNameError).toHaveText(errorMessage);
      });
    }
  }

  async userNameErrorShouldNotBeVisible() {
    await test.step(`"Username" error should not be visible`, async () => {
      await expect(this.userNameError).not.toBeVisible();
    });
  }

  async emailInputShouldBeVisible() {
    await test.step(`"Email" input should be visible`, async () => {
      await expect(this.emailInput).toBeVisible();
    });
  }

  async fillEmailInput(email: string) {
    await test.step(`Fill "Email" input with "${email}"`, async () => {
      await this.emailInput.fill(email);
    });
  }

  async setEmailInput(email: string) {
    await test.step(`Set "Email" input to "${email}"`, async () => {
      await this.emailInput.fill(email);
      await this.emailInput.blur();
    });
  }

  async emailErrorShouldBeVisible(errorMessage?: string) {
    if (!errorMessage) {
      await test.step(`"Email" error should be visible`, async () => {
        await expect(this.emailError).toBeVisible();
      });
    } else {
      await test.step(`"Email" error: "${errorMessage}"  should be visible`, async () => {
        await expect(this.emailError).toBeVisible();
        await expect(this.emailError).toHaveText(errorMessage);
      });
    }
  }

  async emailErrorShouldNotBeVisible() {
    await test.step(`"Email" error should not be visible`, async () => {
      await expect(this.emailError).not.toBeVisible();
    });
  }

  async passwordInputShouldBeVisible() {
    await test.step(`"Password" input should be visible`, async () => {
      await expect(this.passwordInput).toBeVisible();
    });
  }

  async fillPasswordInput(password: string) {
    await test.step(`Fill "Password" input with "${password}"`, async () => {
      await this.passwordInput.fill(password);
    });
  }

  async setPasswordInput(password: string) {
    await test.step(`Set "Password" input to "${password}"`, async () => {
      await this.passwordInput.fill(password);
      await this.passwordInput.blur();
    });
  }

  async passwordErrorShouldBeVisible(errorMessage?: string) {
    if (!errorMessage) {
      await test.step(`"Password" error should be visible`, async () => {
        await expect(this.passwordError).toBeVisible();
      });
    } else {
      await test.step(`"Password" error: "${errorMessage}"  should be visible`, async () => {
        await expect(this.passwordError).toBeVisible();
        await expect(this.passwordError).toHaveText(errorMessage);
      });
    }
  }

  async passwordErrorShouldNotBeVisible() {
    await test.step(`"Password" error should not be visible`, async () => {
      await expect(this.passwordError).not.toBeVisible();
    });
  }

  async signUpButtonShouldBeVisible() {
    await test.step(`"Sign up" button should be visible`, async () => {
      await expect(this.signUpButton).toBeVisible();
      await expect(this.signUpButton).toHaveText('Sign up');
    });
  }

  async signUpButtonShouldBeDisabled() {
    await test.step(`"Sign up" button should be disabled`, async () => {
      await expect(this.signUpButton).toBeDisabled();
      await expect(this.signUpButton).toHaveClass(/btn-disabled/);
    });
  }

  async signUpButtonShouldBeEnabled() {
    await test.step(`"Sign up" button should be enabled`, async () => {
      await expect(this.signUpButton).toBeEnabled();
      await expect(this.signUpButton).not.toHaveClass(/btn-disabled/);
    });
  }

  async clickSignUpButton() {
    await test.step('Click "Sign up" button', async () => {
      await this.signUpButton.click();
    });
  }

  async goSignInButtonShouldBeVisible() {
    await test.step(`"You already have an account?" button should be visible`, async () => {
      await expect(this.goSignInButton).toBeVisible();
      await expect(this.goSignInButton).toHaveText('You already have an account?');
    });
  }

  async clickGoSignInButton() {
    await test.step('Click "You already have an account?"', async () => {
      await this.goSignInButton.click();
    });
  }
}
