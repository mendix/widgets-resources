const { defineConfig } = require("cypress");
const getCompareSnapshotsPlugin = require("cypress-image-diff-js/dist/plugin");
const installLogsPrinter = require("cypress-terminal-report/src/installLogsPrinter");

module.exports = defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            getCompareSnapshotsPlugin(on, config);
            installLogsPrinter(on, {
                printLogsToConsole: "onFail"
            });
        },
        baseUrl: "http://localhost:8080",
        retries: 2,
        video: false,
        videoUploadOnPasses: false,
        viewportHeight: 1080,
        viewportWidth: 1280,
        chromeWebSecurity: false,
        specPattern: "cypress/integration/**/*.js",
        supportFile: "cypress/support/e2e.js"
    }
});
