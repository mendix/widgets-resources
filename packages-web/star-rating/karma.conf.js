var webpackConfig = require("./webpack.config");
const path = require("path");
Object.assign(webpackConfig, {
    debug: true,
    devtool: "inline-source-map",
    externals: webpackConfig.externals.concat([
        "react/lib/ExecutionEnvironment",
        "react/lib/ReactContext",
        "react/addons",
        "jsdom"
    ])
});

module.exports = function(config) {
    if(config.instrumenter) {
        console.log("With instrumenter");
        Object.assign(webpackConfig, {
            module: Object.assign(webpackConfig.module, {
                postLoaders: [ {
                    test: /\.ts$/,
                    loader: "istanbul-instrumenter",
                    include: path.resolve(__dirname, "src"),
                    exclude: /\.(spec)\.ts$/
                } ]
            })
        });
    }

    config.set({
        basePath: "",
        frameworks: [ "jasmine" ],
        files: [
            { pattern: "src/**/*.ts", included: false },
            { pattern: "tests/**/*.ts", included: false },
            "tests/test-index.js"
        ],
        exclude: [],
        preprocessors: {
            "tests/test-index.js": [ "webpack", "sourcemap" ]
        },
        webpack: webpackConfig,
        webpackServer: { noInfo: true },
        reporters: [ "progress", config.instrumenter ? "coverage": "kjhtml" ],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: [ "Chrome" ],
        singleRun: false,
        concurrency: Infinity,
        coverageReporter: {
            dir: "./dist/testresults",
            reporters: [
                { type: "json", subdir: ".", file: "coverage.json" },
                { type: "text" }
            ]
        }
    })
};
