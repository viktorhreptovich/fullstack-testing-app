import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';
import * as os from "node:os";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      globals: true,
      include: ['test/**/*.pact.spec.ts'],
      setupFiles: ['allure-vitest/setup'],
      reporters: [
        'default',
        [
          'allure-vitest/reporter',
          {
            resultsDir: './reports/allure-results',
            reportDir: './reports/pact-consumer-report',
            environmentInfo: {
              os_platform: os.platform(),
              os_release: os.release(),
              os_version: os.version(),
              node_version: process.version,
            },
            executorInfo: {
              name: 'vitest',
              version: '3.0.5',
            }
          },
        ],
      ],
      globalSetup: ['vitest.allure.report.ts'],
    },
    define: {
      __PACT_CONSUMER_DIR__: JSON.stringify('../pacts'),
    },
  }),
);

declare global {
  const __PACT_CONSUMER_DIR__: string;
}
