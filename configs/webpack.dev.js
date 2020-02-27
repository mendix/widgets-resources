const merge = require("webpack-merge");
const baseConfig = require("@mendix/pluggable-widgets-tools/configs/webpack.config.dev.js"); // Can also be webpack.config.prod.js

const customConfig = {
    // Custom configuration goes here
    devtool: "source-map",
    externals: ["mendix"]
};
const previewConfig = {
    // Custom configuration goes here
    devtool: "inline-source-map"
};

module.exports = [merge(baseConfig[0], customConfig), merge(baseConfig[1], previewConfig)];
