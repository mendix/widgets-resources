const path = require("path");
const fs = require("fs");
const yargs = require("yargs");

const debug = process.env.DEBUG;

const options = yargs
    .option("browser", {
        describe: "Browsers to test against",
        type: "string",
        choices: ["firefox", "chrome", "opera", "safari"],
        coerce: arg => arg.split(","),
        default: "chrome,firefox"
    })
    .option("concurrency", { describe: "Maximum number of workers to use", type: "integer", default: 2 })
    .option("grid", { describe: "Address (ip:port) of Zalenium Grid to use, if any", type: "string", default: "" })
    .option("logLevel", {
        describe: "Log level",
        type: "string",
        choices: ["trace", "debug", "info", "warn", "error", "silent"],
        default: "info"
    })
    .option("url", { describe: "Host of application", type: "string", default: "http://localhost:8080/" })
    .option("include", { describe: "Specifies spec file(s) to run", type: "string", coerce: arg => arg.split(",") })
    .option("exclude", {
        describe: "Specifies spec file(s) to exclude from run",
        type: "string",
        coerce: arg => arg.split(",")
    })
    .help(false)
    .version(false)
    .strict().argv;

const defaultInclude = ["./src/specs/*"];

const defaultExclude = [];

const include = options.include ? options.include : defaultInclude;
const exclude = options.exclude ? options.exclude : defaultExclude;

const browsers = [];
var arrayLength = options.browser.length;
for (var i = 0; i < arrayLength; i++) {
    browsers.push({
        browserName: options.browser[i]
    });
}

const resultsPath = "./results/";
if (!fs.existsSync(resultsPath)) {
    fs.mkdirSync(resultsPath, { recursive: true });
}

exports.config = {
    baseUrl: options.url,
    ...(options.grid
        ? {
              hostname: options.grid.split(":")[0],
              port: parseInt(options.grid.split(":")[1], 10)
          }
        : {
              hostname: "127.0.0.1",
              port: 4444,
              services: ["selenium-standalone"]
          }),
    specs: include,
    exclude: exclude,
    maxInstances: debug ? 1 : options.concurrency,
    capabilities: browsers,
    sync: true,
    logLevel: options.logLevel,
    outputDir: "./results",
    coloredLogs: true,
    bail: 0,
    waitforTimeout: 30000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 0,
    seleniumLogs: "./results",
    framework: "jasmine",
    reporters: [
        "spec",
        [
            "junit",
            { outputDir: "./results", outputFileFormat: o => `results-${o.cid}.${o.capabilities.browserName}.xml` }
        ]
    ],
    execArgv: debug ? ["--inspect"] : undefined,
    // Options to be passed to Jasmine.
    jasmineNodeOpts: {
        defaultTimeoutInterval: debug ? 60 * 60 * 1000 : 30 * 1000
    },
    before() {
        require("ts-node").register({ files: true });
    },
    afterTest: test => {
        if (test.passed) {
            return;
        }
        const browserName = browser.capabilities.browserName;
        const timestamp = new Date().toJSON().replace(/:/g, "-");
        const testName = test.fullName.replace(/ /g, "_");
        const filename = `TESTFAIL_${browserName}_${testName}_${timestamp}.png`;
        const filePath = path.join(resultsPath, filename);
        browser.saveScreenshot(filePath);
        console.log("Saved screenshot: ", filePath);
    }
};
