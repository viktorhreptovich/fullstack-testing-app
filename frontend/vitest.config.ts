import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      globals: true,
      include: ['test/unit/**/*.spec.ts'],
      reporters: ['default','html'],
      outputFile: './reports/unit-tests-report.html',
      testTimeout: 30000,
    },
  }),
);
