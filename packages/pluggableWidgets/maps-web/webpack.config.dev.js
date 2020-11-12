const { merge } = require("webpack-merge");
const baseConfig = require("@mendix/pluggable-widgets-tools/configs/webpack.config.dev");

const customConfig = {
    output: {
        filename: "widgets/com/mendix/widget/custom/Maps/Maps.js"
    }
};

module.exports = [merge(baseConfig[0], customConfig), ...baseConfig.slice(1)];
