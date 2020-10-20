const { merge } = require("webpack-merge");
const baseConfig = require("@mendix/pluggable-widgets-tools/configs/webpack.config.prod");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const customConfig = {
    output: {
        filename: "widgets/com/mendix/widget/custom/Maps/Maps.js"
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "./widgets/com/mendix/widget/custom/Maps/ui/Maps.css",
            ignoreOrder: false
        })
    ]
};

module.exports = [merge(baseConfig[0], customConfig), ...baseConfig.slice(1)];
