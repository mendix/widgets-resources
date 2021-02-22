const path = require("path");
const fs = require("fs");

const debug = process.env.DEBUG;
// const url = "https://badge.mxapps.io/"; // process.env.URL || "https://localhost:8080/";
const url = process.env.URL || "https://localhost:8080/";
const variables = require("../../../configs/variables");
// console.log(process.env.URL);
// console.log(path.resolve(variables.path, "test/e2e/tsconfig.json"));

const e2ePath = path.join(variables.path, "/dist/e2e/");
if (!fs.existsSync(e2ePath)) {
    fs.mkdirSync(e2ePath, { recursive: true });
}

exports.config = {
    before() {
        require("@babel/register");
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
        helpers: [require("@babel/register")],
        defaultTimeoutInterval: debug ? 60 * 60 * 1000 : 30 * 1000
    },
    afterTest: test => {
        if (test.passed) {
            return;
        }
        console.log(test);
        const browserName = browser.capabilities.browserName;
        const timestamp = new Date().toJSON().replace(/:/g, "-");
        const testName = test.fullName.replace(/ /g, "_");
        const filename = `TESTFAIL_${browserName}_${testName}_${timestamp}.png`;
        const filePath = path.join(e2ePath, filename);
        browser.saveScreenshot(filePath);
        console.log("Saved screenshot: ", filePath);
    }
};
