import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  expect: {
    timeout: 2000,
  },
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  outputDir: './reports/test-results',
  reporter: [
    // ['json', { outputFile: 'results.json' }],
    // ['./reporter/my-reporter.ts', {}],
    ['html', { open: process.env.CI ? 'never' : 'always', outputFolder: './reports/html-report' }],
    // [
    //   'monocart-reporter',
    //   {
    //     name: 'My Test Report',
    //     outputFile: './reports/monocart-report/index.html',
    //     traceViewerUrl: '/trace/index.html?trace={traceUrl}',
    //   },
    // ],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    actionTimeout: 3000,
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    cwd: '../../frontend',
    command: 'npm run dev -- --port 5138',
    port: 5138,
    reuseExistingServer: !process.env.CI,
    timeout: 10000,
    stdout: 'pipe',
  },
});
