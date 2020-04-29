const merge = require("webpack-merge");
const baseConfig = require("../packages-common/pluggable-widgets-tools/configs/webpack.config.dev.js"); // Can also be webpack.config.prod.js

const customConfig = {
    // Custom configuration goes here
    devtool: "source-map",
    externals: ["mendix"]
};
const previewConfig = {
    // Custom configuration goes here
    devtool: "inline-source-map"
};

const customConfigurations = [merge(baseConfig[0], customConfig), merge(baseConfig[1], previewConfig)];

const hasEditorConfig = baseConfig.length === 3;

if (hasEditorConfig) {
    customConfigurations.push(baseConfig[2]);
}

module.exports = customConfigurations;
