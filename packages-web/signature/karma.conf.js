const webpackConfigs = require("./webpack.config");
const path = require("path");
const webpackConfig = webpackConfigs[0];
Object.assign(webpackConfig, {
    devtool: "inline-source-map",
    externals: [
        "react/lib/ExecutionEnvironment",
        "react/lib/ReactContext",
        "react/addons",
        "jsdom",
        /^mxui\/|^mendix\/|^dojo\/|^dijit\//
    ]
});

module.exports = function(config) {
    if (config.codeCoverage) {
        Object.assign(webpackConfig, {
            module: Object.assign(webpackConfig.module, {
                rules: webpackConfig.module.rules.concat([ {
                    test: /\.+(ts|tsx)$/,
                    enforce: "post",
                    loader: "istanbul-instrumenter-loader",
                    include: path.resolve(__dirname, "src"),
                    exclude: /\.(spec)\.ts$/
                } ])
            })
        });
    }

    const configuration = {
        basePath: "",
        frameworks: [ "jasmine" ],
        files: [
            { pattern: "src/**/*.ts", watched: true },
            { pattern: "tests/**/*.ts", watched: true },
            "tests/test-index.js"
        ],
        exclude: [],
        preprocessors: { "tests/test-index.js": [ "webpack", "sourcemap" ] },
        webpack: webpackConfig,
        webpackServer: { noInfo: true },
        reporters: [ "spec", config.codeCoverage ? "coverage" : "kjhtml" ],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: [ "Chrome" ],
        customLaunchers: {
            Chrome_travis_ci: {
                base: "Chrome",
                flags: [ "--no-sandbox" ]
            }
        },
        singleRun: false,
        concurrency: Infinity,
        coverageReporter: {
            dir: "./dist/testresults",
            reporters: [
                { type: "json", subdir: ".", file: "coverage.json" },
                { type: "text" }
            ]
        }
    };

    if (process.env.TRAVIS) {
        configuration.browsers = [ "Chrome_travis_ci" ];
    }

    config.set(configuration);
};
