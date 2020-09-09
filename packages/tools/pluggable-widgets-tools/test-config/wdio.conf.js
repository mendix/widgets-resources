const { join } = require("path");
const { existsSync, mkdirSync } = require("fs");
const debug = process.env.DEBUG;
const browserName = process.env.BROWSER || "firefox";
const url = process.env.URL || "http://localhost:8080/";

const e2ePath = join(process.cwd(), "dist/e2e/");
if (!existsSync(e2ePath)) {
    mkdirSync(e2ePath, { recursive: true });
}

console.warn("Starting wdio with ", url, browserName);

exports.config = {
    before() {
        require("@babel/register");
        require("ts-node").register({ files: true, project: join(process.cwd(), "./tests/e2e/tsconfig.json") });
    },
    host: "127.0.0.1",
    port: 4444,
    specs: [join(process.cwd(), "./tests/e2e/**/*.spec.js"), join(process.cwd(), "./tests/e2e/**/*.spec.ts")],
    maxInstances: 1,
    capabilities: [
        {
            browserName,
            "goog:chromeOptions": {
                args: debug ? ["--no-sandbox"] : ["--no-sandbox", "--headless", "--disable-gpu", "--disable-extensions"]
            }
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
    services: [
        ["selenium-standalone"],
        [
            "image-comparison",
            // The options for image-comparison
            {
                baselineFolder: e2ePath + "/tests/screenshot-baseline/",
                formatImageName: "{logName}-{width}x{height}--{browserName}",
                screenshotPath: e2ePath + "/tests/screenshot/",
                savePerInstance: false,
                autoSaveBaseline: true,
                blockOutStatusBar: true,
                blockOutToolBar: true,
                hideScrollBars: true
            }
        ]
    ],
    framework: "jasmine",
    reporters: ["spec"],
    execArgv: debug ? ["--inspect"] : undefined,
    jasmineNodeOpts: {
        defaultTimeoutInterval: debug ? 60 * 60 * 1000 : 30 * 1000
    },
    afterTest: test => {
        if (test.passed) {
            return;
        }
        const timestamp = new Date().toJSON().replace(/:/g, "-");
        const testName = test.fullName.replace(/ /g, "_");
        const filename = `TESTFAIL_${browserName}_${testName}_${timestamp}.png`;
        const filePath = join(e2ePath, filename);
        browser.saveScreenshot(filePath);
        console.log("Saved screenshot: ", filePath);
    }
};
