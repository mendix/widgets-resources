const merge = require("webpack-merge");
const baseConfig = require("@mendix/pluggable-widgets-tools/configs/webpack.native.config.js");

baseConfig[0].module.rules[2].use.options.plugins.push("@babel/plugin-transform-flow-strip-types");

module.exports = baseConfig;
