import { defineConfig } from 'vitest/config';
import swc from 'unplugin-swc';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    include: ['src/**/*.pact.spec.ts'],
    testTimeout: 30000,
    setupFiles: ['allure-vitest/setup'],
    reporters: [
      'default',
      [
        'allure-vitest/reporter',
        {
          resultsDir: './reports/allure-results',
          reportDir: './reports/pact-provider-report',
        },
      ],
    ],
    globalSetup: ['vitest.allure.report.ts'],
  },
  plugins: [
    // This is required to build the test files with SWC
    swc.vite({
      // Explicitly set the module type to avoid inheriting this value from a `.swcrc` config file
      module: { type: 'es6' },
    }),
  ],
  define: {
    __PACT_DIR__: JSON.stringify('../pacts'),
    __PACT_DIR_TEMP__: JSON.stringify('../pacts/temp-pacts'),
  },
});

declare global {
  const __PACT_DIR__: string;
  const __PACT_DIR_TEMP__: string;
}
