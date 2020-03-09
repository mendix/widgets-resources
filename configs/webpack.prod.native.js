const merge = require("webpack-merge");
const baseConfig = require("@mendix/pluggable-widgets-tools/configs/webpack.native.config.js");

const customConfig = {
    // Custom configuration goes here
    devtool: false,
    externals: [
        "big.js",
        "react",
        "react-dom",
        "react-native",
        "react-native-camera",
        "react-native-firebase",
        "react-native-geocoder",
        "react-native-maps",
        "react-native-svg",
        "react-native-video",
        "react-native-view-shot",
        "react-native-webview"
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        cacheDirectory: true,
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                        plugins: [
                            ["@babel/plugin-proposal-class-properties", { loose: true }],
                            ["@babel/plugin-transform-react-jsx", { pragma: "createElement" }],
                            "@babel/plugin-transform-flow-strip-types"
                        ]
                    }
                }
            },
            {
                test: /\.jsx?$/,
                include: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        cacheDirectory: true,
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                        plugins: [
                            ["@babel/plugin-proposal-class-properties", { loose: true }],
                            "@babel/plugin-transform-react-jsx",
                            "@babel/plugin-transform-flow-strip-types"
                        ]
                    }
                }
            }
        ]
    }
};

const customConfigurations = [merge(baseConfig[0], customConfig)];

if (baseConfig.length === 2) {
    customConfigurations.push(baseConfig[1]);
}

module.exports = customConfigurations;
