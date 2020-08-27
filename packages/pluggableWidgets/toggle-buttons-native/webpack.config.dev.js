const [
    baseWidgetConfig,
    baseEditorConfigConfig
] = require("@mendix/pluggable-widgets-tools/configs/webpack.native.config.js");

baseWidgetConfig.module.rules
    .find(rule => String(rule.test) === String(/\.jsx?$/) && String(rule.include) === String(/node_modules/))
    .use.options.plugins.push("@babel/plugin-transform-flow-strip-types");

module.exports = [baseWidgetConfig, baseEditorConfigConfig];
