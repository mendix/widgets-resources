const merge = require("webpack-merge");
const baseConfig = require("@mendix/pluggable-widgets-tools/configs/webpack.native.config.js");

baseConfig[0].module.rules[2].use.options.plugins.push("@babel/plugin-transform-flow-strip-types");
baseConfig[0].mode = "production";
baseConfig[0].devtool = false;

module.exports = baseConfig;
