import { defineConfig } from '@playwright/test';

require('dotenv').config();

export default defineConfig({
  testMatch: ["tests/profile-update.test.ts"]
});
