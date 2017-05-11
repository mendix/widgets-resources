var webpackConfig = require("./webpack.config");
const path = require("path");
Object.assign(webpackConfig, {
    devtool: "inline-source-map",
    externals: [
        "react/lib/ExecutionEnvironment",
        "react/lib/ReactContext",
        "react/addons",
        "jsdom"
    ]
});

module.exports = function(config) {
    if (config.codeCoverage) {
        Object.assign(webpackConfig, {
            module: Object.assign(webpackConfig.module, {
                rules: webpackConfig.module.rules.concat([ {
                    test: /\.ts$/,
                    include: path.resolve(__dirname, "src"),
                    loader: "istanbul-instrumenter-loader",
                    enforce: "post",
                    exclude: /\.(spec)\.ts$/
                } ])
            })
        });
    }

    config.set({
        basePath: "",
        frameworks: [ "jasmine" ],
        files: [
            { pattern: "src/**/*.ts", included: false, served: false, watched: true },
            { pattern: "tests/**/*.ts", included: false, served: false, watched: true },
            "tests/test-index.js"
        ],
        exclude: [],
        preprocessors: { "tests/test-index.js": [ "webpack", "sourcemap" ] },
        webpack: webpackConfig,
        webpackServer: { noInfo: true },
        reporters: [ "progress", config.codeCoverage ? "coverage" : "kjhtml" ],
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
    });
};
