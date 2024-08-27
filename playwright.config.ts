import { defineConfig, devices } from '@playwright/test';



/**
 * Test configuration.
 */
export default defineConfig({
  timeout: 100000,
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 2 :undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    screenshot: "only-on-failure",
    video: "on",
    // Context geolocation
    geolocation: { latitude: 35.9375, longitude: 14.3754 },
    permissions: ['geolocation'],
    // Emulates the user locale.
    locale: 'en-GB',

    // Emulates the user timezone.
    timezoneId: 'Europe/Paris',
  },

  /* Project Configuration*/
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
    {
      name: 'api',
      use: {
        baseURL: process.env.API_BASE_URL || 'http://localhost:3000',
        trace: 'on-first-retry', // Trace for debugging
        headless: true, // No browser UI needed
        video: 'off', // Video recording not needed
        viewport: null, // Not needed for API tests
      },
    },
  ],

});