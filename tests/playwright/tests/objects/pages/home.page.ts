import { expect, Locator, type Page, test } from '@playwright/test';

export class HomePage {
  private page: Page;
  private path: string;
  private conainer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.path = '/';
    this.conainer = this.page.getByTestId('container').filter({ hasText: 'Home' });
  }

  async open() {
    await test.step(`Open home page`, async () => {
      await this.page.goto(this.path);
    });
  }

  async shouldBeOpened() {
    await test.step(`Home page should be opened`, async () => {
      await expect(this.conainer).toBeVisible();
    });
  }
}
