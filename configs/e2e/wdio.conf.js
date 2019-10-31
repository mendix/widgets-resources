const debug = process.env.DEBUG;

exports.config = {
    before() {
        require("ts-node").register({ files: true, project: "./tests/e2e/tsconfig.json" });
    },
    host: "127.0.0.1",
    port: 4444,
    specs: ["./tests/e2e/specs/*.spec.ts"],
    maxInstances: debug ? 1 : 5,
    capabilities: [
        {
            maxInstances: debug ? 1 : 5,
            browserName: "chrome"
        }
    ],
    sync: true,
    logLevel: "debug",
    coloredLogs: true,
    seleniumLogs: "./results",
    bail: 0,
    screenshotPath: "./dist/wdio/",
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
    }
};
