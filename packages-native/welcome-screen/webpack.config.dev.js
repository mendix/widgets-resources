const merge = require("webpack-merge");
const baseConfig = require("../../configs/webpack.dev.native.js");

const customConfig = {
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".ios.js", ".ios.jsx", ".ios.ts", ".ios.tsx"]
    }
};

module.exports = [merge(baseConfig[0], customConfig)];
