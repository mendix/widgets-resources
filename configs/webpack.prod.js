const merge = require("webpack-merge");
const baseConfig = require("../packages-common/pluggable-widgets-tools/configs/webpack.config.prod.js"); // Can also be webpack.config.prod.js

const customConfig = {
    // Custom configuration goes here
    devtool: false
};
const previewConfig = {
    // Custom configuration goes here
    devtool: false
};

const customConfigurations = [merge(baseConfig[0], customConfig), merge(baseConfig[1], previewConfig)];

const hasEditorConfig = baseConfig.length === 3;

if (hasEditorConfig) {
    customConfigurations.push(baseConfig[2]);
}

module.exports = customConfigurations;
