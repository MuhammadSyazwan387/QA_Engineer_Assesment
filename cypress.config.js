const { defineConfig } = require("cypress");

const environments = {
  prod: "https://parabank.parasoft.com"
};

module.exports = defineConfig({
  e2e: {
    baseUrl: environments[process.env.ENV] || environments.prod,
  },
});
