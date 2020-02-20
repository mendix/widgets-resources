const merge = require("webpack-merge");
const baseConfig = require("../../configs/webpack.dev.js");
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

const customConfigurations = [merge(baseConfig[0], customConfig), baseConfig[1]];

if (baseConfig.length === 3) {
    customConfigurations.push(baseConfig[2]);
}

module.exports = customConfigurations;
