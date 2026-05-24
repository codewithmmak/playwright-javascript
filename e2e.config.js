// @ts-check
const dotenv = require("dotenv");
const isCI = !!process.env.CI;

const envFile = process.env.ENV_FILE || ".env.dev";
dotenv.config({ path: envFile });

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */
const config = {
  testDir: "./e2e-tests",
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000,
  },
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: isCI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: isCI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // reporter: 'html',
  reporter: [
    ["list"],
    ["html"],
    ["./my-awesome-reporter.js"],
    ["allure-playwright", { outputFolder: "allure-results" }],
  ],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    headless: process.env.HEADED === "true" ? false : true,
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.BASE_URL || "https://demo.vercel.store",

    // screenshot: 'only-on-failure',
    screenshot: isCI ? "only-on-failure" : "only-on-failure",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: isCI ? "on-first-retry" : "retain-on-failure",
  },

  /* Configure projects for major browsers */
  projects: [
    // {
    //     name: 'chromium',
    //     use: {
    //         ...devices['Desktop Chrome'],
    //     },
    // },

    // {
    //     name: 'firefox',
    //     use: {
    //         ...devices['Desktop Firefox'],
    //     },
    // },

    // {
    //     name: 'webkit',
    //     use: {
    //         ...devices['Desktop Safari'],
    //     },
    // },

    /* Test against mobile viewports. */
    // {
    //     name: 'Mobile Chrome',
    //     use: {
    //         ...devices['Galaxy S9+'],
    //     },
    // },
    // {
    //     name: 'Mobile Safari',
    //     use: {
    //         ...devices['iPhone X'],
    //     },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: {
    //     channel: 'msedge',
    //   },
    // },
    {
      name: "Google Chrome",
      use: {
        channel: "chrome",
      },
    },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: "test-results/",

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },
};

module.exports = config;
