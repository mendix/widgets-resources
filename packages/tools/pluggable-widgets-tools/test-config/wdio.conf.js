const { join } = require("path");
const { existsSync, mkdirSync } = require("fs");
const debug = process.env.DEBUG;
const browserName = process.env.BROWSER || "firefox";
const url = process.env.URL || "http://localhost:8080/";
const serverIp = process.env.SERVER_IP || "127.0.0.1";
const serverPort = process.env.SERVER_PORT || 4444;

const resultsPath = join(process.cwd(), "tests/e2e/screenshot-results");
const baselinePath = join(process.cwd(), "tests/e2e/screenshot-baseline");

if (!existsSync(resultsPath)) {
    mkdirSync(resultsPath, { recursive: true });
}

console.warn("Starting wdio with ", url, browserName);

exports.config = {
    host: serverIp,
    port: serverPort,
    specs: [join(process.cwd(), "./tests/e2e/**/*.spec.js"), join(process.cwd(), "./tests/e2e/**/*.spec.ts")],
    maxInstances: 1,
    capabilities: [
        {
            browserName,
            "moz:firefoxOptions": {
                prefs: { "media.navigator.streams.fake": true, "media.navigator.permission.disabled": true }
            }
        }
    ],
    sync: true,
    logLevel: "error",
    coloredLogs: true,
    bail: 0,
    screenshotPath: resultsPath,
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
                baselineFolder: baselinePath,
                formatImageName: "{tag}-{logName}-{browserName}",
                screenshotPath: resultsPath,
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
    jasmineOpts: {
        defaultTimeoutInterval: debug ? 60 * 60 * 1000 : 30 * 1000
    },
    autoCompileOpts: {
        // Enable/disable auto-compilation (enabled by default)
        autoCompile: true,

        // Configure how ts-node is automatically included when present
        tsNodeOpts: {
            transpileOnly: true,
            project: join(process.cwd(), "./tests/e2e/tsconfig.json")
        }
    },
    afterTest: (test, context, { error }) => {
        // take a screenshot anytime a test fails
        if (error) {
            const timestamp = new Date().toJSON().replace(/:/g, "-");
            const testName = test.id;
            const filePath = join(resultsPath, `TESTFAIL_${browserName}_${testName}_${timestamp}.png`);
            browser.saveScreenshot(filePath);
            console.log("Saved screenshot: ", filePath);
        }
    }
};
