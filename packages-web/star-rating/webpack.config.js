const webpack = require("webpack");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        StarRating: "./src/components/StarRatingContainer.ts"
    },
    output: {
        path: path.resolve(__dirname, "dist/tmp"),
        filename: "src/com/mendix/widget/custom/starrating/StarRating.js",
        libraryTarget: "umd"
    },
    resolve: {
        extensions: [ ".ts", ".js", ".jsx", ".json" ],
        alias: {
            "tests": path.resolve(__dirname, "./tests"),
            "react-rating": path.resolve(__dirname, "./node_modules/react-rating/src/react-rating.js")
        }
    },
    module: {
        rules: [
            { test: /\.ts$/, use: "ts-loader" },
            { test: /\.css$/, loader: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"}) },
            { test: /\.jsx?$/, loader: "babel-loader" }
        ]
    },
    devtool: "source-map",
    externals: [ "react", "react-dom" ],
    plugins: [
        new CopyWebpackPlugin([
            { from: "src/**/*.js" },
            { from: "src/**/*.xml" }
        ], {
            copyUnmodified: true
        }),
        new ExtractTextPlugin( {filename: "./src/com/mendix/widget/custom/starrating/ui/StarRating.css" }),
        new webpack.LoaderOptionsPlugin({
            debug: true
        })
    ]
};
