var webpackConfig = require("./webpack.config");
Object.assign(webpackConfig, {
    debug: true,
    devtool: "inline-source-map",
    externals: webpackConfig.externals.concat([
        "react/lib/ExecutionEnvironment",
        "react/lib/ReactContext",
        "react/addons",
        "jsdom"
    ]),
    postLoaders: [ {
        test: /\.ts$/,
        loader: "istanbul-instrumenter",
        include: path.resolve(__dirname, "src"),
        exclude: /\.(spec)\.ts$/
    } ]
});

module.exports = function(config) {
    config.set({
        basePath: "",
        frameworks: [ "jasmine" ],
        files: [
            { pattern: "src/**/*.ts", watched: true, included: false, served: false },
            { pattern: "tests/**/*.ts", watched: true, included: false, served: false },
            "tests/test-index.js"
        ],
        exclude: [],
        preprocessors: { "tests/test-index.js": [ "webpack", "sourcemap" ] },
        webpack: webpackConfig,
        webpackServer: { noInfo: true },
        reporters: [ "progress", "kjhtml", "coverage" ],
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
