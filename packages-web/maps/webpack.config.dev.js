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

const editorConfig = baseConfig.length === 3 ? baseConfig[2] : undefined;

const customConfigurations = [merge(baseConfig[0], customConfig), baseConfig[1]];

if (editorConfig) {
    customConfigurations.push(editorConfig);
}

module.exports = customConfigurations;
