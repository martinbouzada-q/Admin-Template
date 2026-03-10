require('dotenv').config({ path: '.env' });
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: 'tests',
  timeout: 30_000,
  use: {
    headless: true,
    viewport: { width: 1280, height: 800 },
    baseURL: 'http://localhost:8080'
  },
  webServer: {
    command: 'npx http-server -c-1 -p 8080',
    port: 8080,
    reuseExistingServer: true
  }
});
