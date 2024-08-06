import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: process.env.BASEURL || 'http://localhost:5173',
    pageLoadTimeout: 10000,
  },
});
