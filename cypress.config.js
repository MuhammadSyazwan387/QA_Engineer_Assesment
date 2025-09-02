const { defineConfig } = require("cypress");

const environments = {
  prod: "https://parabank.parasoft.com",
  // you can add more envs later, e.g. staging: "https://staging.example.com"
};

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    baseUrl: environments[process.env.ENV] || environments.prod,
    setupNodeEvents(on, config) {
      // Enable @cypress/grep plugin for filtering tests
      require("@cypress/grep/src/plugin")(config);

      // Optional: Add retries for flaky tests
      config.retries = { runMode: 2, openMode: 0 }; // 2 retries in CI runs

      return config;
    },
  },
  reporter: "junit",
  reporterOptions: {
    mochaFile: "cypress/reports/test-results-[hash].xml", // XML reports path
    toConsole: true,
  },
  video: false,               // Disable video recording in CI
  trashAssetsBeforeRuns: true // Delete old screenshots/videos to avoid permission issues
});
