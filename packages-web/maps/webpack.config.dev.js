const merge = require("webpack-merge");
const baseConfig = require("../../configs/webpack.dev.js");

const customConfig = {
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

module.exports = [merge(baseConfig[0], customConfig), merge(baseConfig[1], customConfig), editorConfig];
