const merge = require("webpack-merge");
const baseConfig = require("@mendix/custom-widgets-utils-internal/configs/webpack.config.prod");
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

/**
 * First plugin of the baseConfig extracts the CSS into `custom/maps/ui/Maps.css` (note the lowercase of the folder).
 * This for some reason causes the folder to be entirely renamed to lowercase, also for the JS files.
 * This causes breaking changes for users that try to update towards v1.0.10 (which introduces this bug).
 * Removing the first plugin solves this issue.
 *  */ 
baseConfig[0].plugins.shift();

module.exports = [merge(baseConfig[0], customConfig), merge(baseConfig[1], customPreviewConfig)];
