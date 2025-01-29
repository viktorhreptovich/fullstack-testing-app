import { expect, Locator, test } from '@playwright/test';

export class SignInForm {
  private container: Locator;
  private emailInput: Locator;
  private passwordInput: Locator;
  private signInButton: Locator;
  private goSignUpButton: Locator;

  constructor(container: Locator) {
    this.container = container;
    this.emailInput = container.getByTestId('input-email');
    this.passwordInput = container.getByTestId('input-password');
    this.signInButton = container.getByTestId('button-auth');
    this.goSignUpButton = container.getByTestId('button-go-signup');
  }

  async shouldBeVisible() {
    await test.step(`"Sign in" form should be visible`, async () => {
      await this.emailInputShouldBeVisible();
      await this.passwordInputShouldBeVisible();
      await this.signInButtonShouldBeVisible();
      await this.goSignUpButtonShouldBeVisible();
    });
  }

  async emailInputShouldBeVisible() {
    await test.step(`"Email" input should be visible`, async () => {
      await expect(this.emailInput).toBeVisible();
    });
  }

  async passwordInputShouldBeVisible() {
    await test.step(`"Password" input should be visible`, async () => {
      await expect(this.passwordInput).toBeVisible();
    });
  }

  async signInButtonShouldBeVisible() {
    await test.step(`"Sign in" button should be visible`, async () => {
      await expect(this.signInButton).toBeVisible();
      await expect(this.signInButton).toHaveText('Sign in');
    });
  }

  async goSignUpButtonShouldBeVisible() {
    await test.step(`"You don't have an account?" button should be visible`, async () => {
      await expect(this.goSignUpButton).toBeVisible();
      await expect(this.goSignUpButton).toHaveText(`You don\'t have an account?`);
    });
  }

  async clickGoSignUpButton() {
    await test.step('Click "You don\'t have an account?" button', async () => {
      await this.goSignUpButton.click();
    });
  }
}
