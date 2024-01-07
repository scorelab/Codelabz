import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:5173/",
    testIsolation: false
  },

  projectId: process.env.CYPRESS_PROJECT_ID,

  component: {
    devServer: {
      framework: "react",
      bundler: "webpack"
    }
  }
});
