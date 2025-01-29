import { expect, Locator, Page, test } from '@playwright/test';
import { SignUpForm } from '../forms/auth/signup.form';

export class SignUpPage {
  private readonly page: Page;
  private readonly path: string;
  private readonly container: Locator;
  private readonly _signUpForm: () => SignUpForm;
  get signUpForm() {
    return this._signUpForm();
  }

  constructor(page: Page) {
    this.page = page;
    this.path = '/signup';
    this.container = page.getByTestId('container').filter({ has: page.getByTestId('form-auth') });
    this._signUpForm = () => new SignUpForm(this.container.getByTestId('form-auth'));
  }

  async open() {
    await test.step(`Open 'Sign up' page`, async () => {
      await this.page.goto(this.path);
    });
  }

  async shouldBeOpened() {
    await test.step(`'Sign up' page should be opened`, async () => {
      await expect(this.container).toBeVisible();
    });
  }
}
