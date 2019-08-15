const merge = require("webpack-merge");
const baseConfig = require("../utils-react-widgets/configs/webpack.config.prod");

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
const previewConfig = {};

module.exports = [merge(baseConfig[0], customConfig), merge(baseConfig[1], previewConfig)];
