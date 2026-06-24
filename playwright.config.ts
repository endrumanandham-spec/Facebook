import { defineConfig, devices } from '@playwright/test';


// Load environment dynamically
const envName = process.env.TEST_ENV || "dev";
const envConfig = require(`./config/${envName}.env.ts`).default;

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
  testDir: './tests',
  /* Run tests in files in parallel */
  timeout: 30 * 1000,          // 30s timeout per test
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: envConfig.baseURL, // Environment-specific base URL
    headless: true,             // Run in headless mode
    screenshot: 'on',           // Capture screenshots
    video: 'retain-on-failure', // Record video only on failures
  },
reporter: [
    ['list'],                   // Console output
    ['html', { outputFolder: 'playwright-report' }] // HTML report
  ],
  projects: [
    { name: 'Chromium', use: { browserName: 'chromium' } },
    //{ name: 'Firefox', use: { browserName: 'firefox' } },
    //{ name: 'WebKit', use: { browserName: 'webkit' } }
  ]
});
