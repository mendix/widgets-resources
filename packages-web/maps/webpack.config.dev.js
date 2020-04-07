const merge = require("webpack-merge");
const baseConfig = require("../../configs/webpack.dev.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const customConfig = {
    output: {
        filename: "widgets/com/mendix/widget/custom/Maps/Maps.js"
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: "url-loader"
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "./widgets/com/mendix/widget/custom/Maps/ui/Maps.css",
            ignoreOrder: false
        })
    ]
};

const customPreviewConfig = {
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: "url-loader"
            }
        ]
    }
};

const customConfigurations = [merge(baseConfig[0], customConfig), merge(baseConfig[1], customPreviewConfig)];

if (baseConfig.length === 3) {
    customConfigurations.push(baseConfig[2]);
}

module.exports = customConfigurations;
