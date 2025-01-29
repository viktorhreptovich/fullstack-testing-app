import { expect, Locator, Page, test } from '@playwright/test';
import { SignInForm } from '../forms/auth/signin.form';
import { SignUpForm } from '../forms/auth/signup.form';

export class AuthPage {
  private page: Page;
  private path: string;
  private container: Locator;
  private _signUpForm: () => SignUpForm;
  get signUpForm() {
    return this._signUpForm();
  }

  private _signInForm: () => SignInForm;
  get signInForm() {
    return this._signInForm();
  }

  constructor(page: Page) {
    this.page = page;
    this.path = '/auth';
    this.container = page.getByTestId('container').filter({ has: page.getByTestId('form-auth') });
    this._signUpForm = () => new SignUpForm(this.container.getByTestId('form-auth'));
    this._signInForm = () => new SignInForm(this.container.getByTestId('form-auth'));
  }

  async open() {
    await test.step(`Open Auth page`, async () => {
      await this.page.goto(this.path);
    });
  }

  async shouldBeOpened() {
    await test.step(`Auth page should be opened`, async () => {
      await expect(this.container).toBeVisible();
    });
  }
}
