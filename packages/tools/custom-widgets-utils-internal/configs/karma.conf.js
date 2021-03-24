const webpackConfig = require("./webpack.config.prod")[0];
const path = require("path");
const variables = require("./variables");

const libPath = process.cwd();
const cwd = variables.path;

Object.assign(webpackConfig, {
    devtool: "inline-source-map",
    externals: ["react/lib/ExecutionEnvironment", "react/lib/ReactContext", "react/addons", "jsdom"]
});

module.exports = function(config) {
    if (config.codeCoverage) {
        Object.assign(webpackConfig, {
            module: Object.assign(webpackConfig.module, {
                rules: webpackConfig.module.rules.concat([
                    {
                        test: /\.ts$/,
                        enforce: "post",
                        loader: "istanbul-instrumenter-loader",
                        include: path.resolve(__dirname, "src"),
                        exclude: /\.(spec)\.ts$/
                    }
                ])
            })
        });
    }
    const index = path.resolve(libPath, "test-configs/test-index.js");
    config.set({
        basePath: cwd,
        frameworks: ["jasmine"],
        files: [{ pattern: "src/**/*.ts", watched: true }, { pattern: "tests/**/*.ts", watched: true }, index],
        exclude: [],
        preprocessors: { [index]: ["webpack", "sourcemap"] },
        webpack: webpackConfig,
        webpackServer: { noInfo: true },
        reporters: ["progress", config.codeCoverage ? "coverage" : "kjhtml"],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ["Chrome"],
        singleRun: false,
        concurrency: Infinity,
        coverageReporter: {
            dir: "./dist/testresults",
            reporters: [{ type: "json", subdir: ".", file: "coverage.json" }, { type: "text" }]
        }
    });
};
