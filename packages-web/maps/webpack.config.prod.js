const merge = require("webpack-merge");
const baseConfig = require("../../configs/webpack.prod.js");
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

const editorConfig = baseConfig.length === 3 ? baseConfig[2] : undefined;

const customConfigurations = [merge(baseConfig[0], customConfig), merge(baseConfig[1], customPreviewConfig)];

if (editorConfig) {
    customConfigurations.push(editorConfig);
}

module.exports = customConfigurations;
