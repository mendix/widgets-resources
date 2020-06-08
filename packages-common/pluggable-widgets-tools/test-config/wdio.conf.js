const path = require("path");
const fs = require("fs");

let debug = process.env.DEBUG;
if (process.argv.indexOf("--debug") > -1) {
    debug = true;
}

let url = process.env.URL || "https://localhost:8080/";
if (process.argv.indexOf("--url") > -1) {
    url = process.argv[process.argv.indexOf("--url") + 1];
}

const e2ePath = "dist/e2e/";
if (!fs.existsSync(e2ePath)) {
    fs.mkdirSync(e2ePath, { recursive: true });
}

exports.config = {
    before() {
        require("@babel/register");
        require("ts-node").register({ files: true, project: "tests/e2e/tsconfig.json" });
    },
    host: "127.0.0.1",
    port: 4444,
    specs: ["tests/e2e/**/*.spec.js", "tests/e2e/**/*.spec.ts"],
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
    screenshotPath: e2ePath,
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
        defaultTimeoutInterval: debug ? 60 * 60 * 1000 : 30 * 1000
    },
    afterTest: test => {
        if (test.passed) {
            return;
        }
        const browserName = browser.capabilities.browserName;
        const timestamp = new Date().toJSON().replace(/:/g, "-");
        const testName = test.fullName.replace(/ /g, "_");
        const filename = `TESTFAIL_${browserName}_${testName}_${timestamp}.png`;
        const filePath = path.join(e2ePath, filename);
        browser.saveScreenshot(filePath);
        console.log("Saved screenshot: ", filePath);
    }
};
