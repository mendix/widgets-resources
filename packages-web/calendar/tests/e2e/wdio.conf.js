const debug = process.env.DEBUG;

exports.config = {
    host: "127.0.0.1",
    port: 4444,
    specs: [ "./dist/e2e/**/*.spec.js" ],
    maxInstances: 1,
    capabilities: [ {
        maxInstances: 1,
        browserName: "chrome"
    } ],
    sync: true,
    logLevel: "silent",
    coloredLogs: true,
    bail: 0,
    screenshotPath: "dist/wdio/",
    baseUrl: debug ? "http://localhost:8080/" : "https://reactcalendar.mxapps.io/",
    waitforTimeout: 40000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 0,
    services: [ "selenium-standalone" ],
    framework: "jasmine",
    reporters: [ "spec" ],
    execArgv: debug ? [ "--inspect" ] : undefined,
    jasmineNodeOpts: {
        defaultTimeoutInterval: debug ? (60 * 60 * 1000) : (30 * 1000),
        expectationResultHandler: function(passed, assertion) {
            if (passed) {
                return;
            }
            browser.saveScreenshot(
                "dist/wdio/assertionError_" + assertion.error.message + ".png"
            );
        }
    }
};
