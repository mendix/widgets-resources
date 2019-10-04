const merge = require("webpack-merge");
const baseConfig = require("../../configs/webpack.dev.native.js");

const customConfig = {
    // Custom configuration goes here
    externals: [/react-native-gesture-handler\/*/, "react-navigation"]
};

module.exports = [merge(baseConfig[0], customConfig)];
