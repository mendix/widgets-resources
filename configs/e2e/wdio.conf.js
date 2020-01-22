const path = require("path");
const fs = require("fs");
const debug = process.env.DEBUG;
const browser = process.env.BROWSER;
const basePath = process.cwd();

const e2ePath = path.join(basePath, "/dist/e2e/");
if (!fs.existsSync(e2ePath)) {
    fs.mkdirSync(e2ePath, { recursive: true });
}

const chromeArgs = debug ? ["--no-sandbox"] : ["--no-sandbox", "--headless", "--disable-gpu", "--disable-extensions"];

exports.config = {
    before() {
        require("ts-node").register({ files: true, project: path.join(basePath, "tests/e2e/tsconfig.json") });
    },
    host: "127.0.0.1",
    port: 4444,
    specs: [basePath + "/tests/e2e/specs/*.spec.ts"],
    maxInstances: 1,
    capabilities: [
        browser && browser === "ie11"
            ? {
                  browserName: "internet explorer"
              }
            : {
                  browserName: "chrome",
                  "goog:chromeOptions": {
                      args: chromeArgs
                  }
              }
    ],
    sync: true,
    logLevel: "silent",
    coloredLogs: true,
    bail: 0,
    screenshotPath: basePath + "/dist/wdio/",
    baseUrl: debug ? "http://localhost:8080/" : process.env.URL,
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
        expectationResultHandler(passed, assertion) {
            if (passed) {
                return;
            }
            browser.saveScreenshot(`./dist/wdio/assertionError_${assertion.error.message}.png`);
        }
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
