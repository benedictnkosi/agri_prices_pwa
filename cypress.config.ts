import { defineConfig } from 'cypress';
import grep from '@cypress/grep/src/plugin';
import * as process from 'process';

export default defineConfig({
  e2e: {
    baseUrl: process.env.BASEURL || 'http://localhost:5173',
    pageLoadTimeout: 20000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    setupNodeEvents(on, config) {
      grep(config);
      return config;
    },
  },
});
