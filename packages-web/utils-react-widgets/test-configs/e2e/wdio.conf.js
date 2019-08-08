const path = require("path");

const debug = process.env.DEBUG;
// const url = "https://badge.mxapps.io/"; // process.env.URL || "https://localhost:8080/";
const url = process.env.URL || "https://localhost:8080/";
const variables = require("../../configs/variables");
// console.log(process.env.URL);
// console.log(path.resolve(variables.path, "test/e2e/tsconfig.json"));

exports.config = {
    before() {
        require("ts-node").register({ files: true, project: path.resolve(variables.path, "tests/e2e/tsconfig.json") });
    },
    host: "127.0.0.1",
    port: 4444,
    specs: [variables.path + "/tests/e2e/**/*.spec.ts"],
    maxInstances: debug ? 1 : 5,
    capabilities: [
        {
            maxInstances: debug ? 1 : 5,
            browserName: "chrome"
        }
    ],
    sync: true,
    logLevel: "silent",
    coloredLogs: true,
    bail: 0,
    screenshotPath: path.resolve(variables.path, "dist/wdio/"),
    baseUrl: url,
    waitforTimeout: 30000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 0,
    services: ["selenium-standalone"],
    framework: "jasmine",
    reporters: ["spec"],
    execArgv: debug ? ["--inspect"] : undefined,
    // Options to be passed to Jasmine.
    jasmineNodeOpts: {
        defaultTimeoutInterval: debug ? 60 * 60 * 1000 : 30 * 1000,
        expectationResultHandler: (passed, assertion) => {
            if (passed) {
                return;
            }
            browser.saveScreenshot(variables.path + "dist/wdio/assertionError_" + assertion.error.message + ".png");
        }
    }
};
