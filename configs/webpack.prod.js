const merge = require("webpack-merge");
const baseConfig = require("@mendix/pluggable-widgets-tools/configs/webpack.config.prod.js"); //Can also be webpack.config.prod.js

const customConfig = {
    // Custom configuration goes here
    devtool: false
};
const previewConfig = {
    // Custom configuration goes here
    devtool: false
};

module.exports = [merge(baseConfig[0], customConfig), merge(baseConfig[1], previewConfig)];
