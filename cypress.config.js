import { defineConfig } from 'cypress';


export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:5173',
  },
  projectId: process.env.CYPRESS_PROJECT_ID
});
