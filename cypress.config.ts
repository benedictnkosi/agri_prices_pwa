import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "43jo7w",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      const environment = config.env.ENV || 'dev'; // Default to 'dev' if ENV is not set

      // Define base URLs for different environments
      const baseUrls: { [key: string]: string } = {
        dev: 'http://localhost:5173',
      };

      // Set the baseUrl based on the environment
      config.baseUrl = baseUrls[environment];

      return config;
    },
  },
});
