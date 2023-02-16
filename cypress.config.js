import { defineConfig } from 'cypress';


export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:5173',
    testIsolation: false,
    specPattern: ['cypress/e2e/components/dashboard/**/*.cy.js', 'cypress/e2e/**/*.cy.{js,ts}'],
  },
  projectId: process.env.CYPRESS_PROJECT_ID
});
