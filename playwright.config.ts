// import { defineConfig, devices } from '@playwright/test';

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
// export default defineConfig({
//   testDir: './tests',
/* Run tests in files in parallel */
// fullyParallel: true,
/* Fail the build on CI if you accidentally left test.only in the source code. */
// forbidOnly: !!process.env.CI,
/* Retry on CI only */
// retries: process.env.CI ? 2 : 0,
/* Opt out of parallel tests on CI. */
// workers: process.env.CI ? 1 : undefined,
/* Reporter to use. See https://playwright.dev/docs/test-reporters */
// reporter: 'html',
/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
// use: {
/* Base URL to use in actions like `await page.goto('/')`. */
// baseURL: 'http://127.0.0.1:3000',

/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
//   trace: 'on-first-retry',
// },

/* Configure projects for major browsers */
// projects: [
//   {
//     name: 'chromium',
//     use: { ...devices['Desktop Chrome'] },
//   },

// {
//   name: 'firefox',
//   use: { ...devices['Desktop Firefox'] },
// },

// {
//   name: 'webkit',
//   use: { ...devices['Desktop Safari'] },
// },

/* Test against mobile viewports. */
// {
//   name: 'Mobile Chrome',
//   use: { ...devices['Pixel 5'] },
// },
// {
//   name: 'Mobile Safari',
//   use: { ...devices['iPhone 12'] },
// },

/* Test against branded browsers. */
// {
//   name: 'Microsoft Edge',
//   use: { ...devices['Desktop Edge'], channel: 'msedge' },
// },
// {
//   name: 'Google Chrome',
//   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
// },
// ],

/* Run your local dev server before starting the tests */
// webServer: {
//   command: 'npm run start',
//   url: 'http://127.0.0.1:3000',
//   reuseExistingServer: !process.env.CI,
// },
// });

import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests", // Thư mục chứa các file test
  fullyParallel: true, // Chạy các test song song
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",

  // ✅ Thêm baseURL để Playwright xác định được đường dẫn test
  use: {
    baseURL: "http://localhost:8082", // Cập nhật đúng URL local của bạn
    headless: false, // Chạy test ở chế độ có giao diện (debug dễ hơn)
    viewport: { width: 1280, height: 720 },
    trace: "on-first-retry",
  },

  projects: [
    // {
    //   name: "chromium",
    //   use: { ...devices["Desktop Chrome"] },
    // },
    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"] },
    // },
    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] },
    // },
    // {
    //   name: "Mobile Chrome",
    //   use: { ...devices["Pixel 5"] },
    // },
    // {
    //   name: "Mobile Safari",
    //   use: { ...devices["iPhone 12"] },
    // },
    // {
    //   name: "Microsoft Edge",
    //   use: { ...devices["Desktop Edge"], channel: "msedge" },
    // },
    {
      name: "Google Chrome",
      use: { ...devices["Desktop Chrome"], channel: "chrome" },
    },
  ],

  // ✅ Bật server để chạy Playwright test đúng môi trường
  webServer: {
    command: "npx expo start --port 8082 --non-interactive",
    // command: 'npm run start', // Chạy lệnh để khởi động server
    url: "http://localhost:8082",
    reuseExistingServer: !process.env.CI, // Tái sử dụng server nếu đang chạy
  },
});
