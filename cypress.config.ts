import { defineConfig } from 'cypress';
import grep from '@cypress/grep/src/plugin';
import * as process from 'process';

export default defineConfig({
  e2e: {
    baseUrl: process.env.BASEURL || 'http://localhost:5173',
    pageLoadTimeout: 60000,
    requestTimeout: 20000,
    responseTimeout: 20000,
    defaultCommandTimeout: 20000,
    setupNodeEvents(on, config) {
      grep(config);
      return config;
    },
  },
  env: {
    API_URL: process.env.API_URL, // Read the API_URL from the environment
  },
});
