const merge = require("webpack-merge");
const baseConfig = require("../utils-react-widgets/configs/webpack.config.prod");

const customConfig = {
    module: {
        rules: [
            {
                test: /signature_pad.m.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            }
        ]
    }
};
const previewConfig = {
    module: {
        rules: [
            {
                test: /signature_pad.m.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            }
        ]
    }
};

module.exports = [merge(baseConfig[0], customConfig), merge(baseConfig[1], previewConfig)];
