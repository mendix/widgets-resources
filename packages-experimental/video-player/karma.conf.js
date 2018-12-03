const webpackConfig = require("./webpack.config")[0];
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

webpackConfig.devtool = "none";

module.exports = function(config) {
    if (config.codeCoverage) {
        Object.assign(webpackConfig, {
            module: Object.assign(webpackConfig.module, {
                rules: webpackConfig.module.rules.concat([ {
                    test: /\.tsx?$/,
                    enforce: "post",
                    loader: "istanbul-instrumenter-loader",
                    include: path.resolve(__dirname, "src"),
                    exclude: /node_modules|\.spec\.tsx?$/
                } ])
            })
        });
    }

    config.set({
        basePath: "",
        frameworks: [ "jasmine" ],
        files: [
            { pattern: "tests/**/*.ts", watched: true },
            { pattern: "tests/**/*.tsx", watched: true },
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
