import { test } from '@playwright/test';
import { tags } from '../../../utils/test.tags';
import { SignUpPage } from '../../../objects/pages/signup.page';

test.describe('Auth', { tag: tags.auth }, () => {
  test(
    'Should show "Sign up" form correctly',
    {
      annotation: [
        {
          type: 'description',
          description: '"Sign up" form should be correct',
        },
      ],
    },
    async ({ page }) => {
      const signUpPage = new SignUpPage(page);

      await signUpPage.open();
      await signUpPage.shouldBeOpened();
      await signUpPage.signUpForm.shouldBeVisible();
      await signUpPage.signUpForm.errorsShouldNotBeVisible();
      await signUpPage.signUpForm.signUpButtonShouldBeDisabled();
    },
  );
});
