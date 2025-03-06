const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'gt49yt',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
