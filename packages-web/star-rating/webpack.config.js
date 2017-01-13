const webpack = require("webpack");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: "./src/com/mendix/widget/StarRating/StarRating.ts",
    output: {
        path: path.resolve(__dirname, "dist/tmp"),
        filename: "src/com/mendix/widget/StarRating/StarRating.js",
        libraryTarget:  "umd",
        umdNamedDefine: true,
        library: "com.mendix.widget.StarRating.StarRating"
    },
    resolve: {
        extensions: [ "", ".ts", ".js", ".json" ],
        alias: {
            "tests": path.resolve(__dirname, "./tests")
        }
    },
    errorDetails: true,
    module: {
        loaders: [
            { test: /\.ts$/, loader: "ts-loader" },
            { test: /\.json$/, loader: "json" },
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") }
        ]
    },
    devtool: "source-map",
    externals: [ "mxui/widget/_WidgetBase", "dojo/_base/declare" ],
    plugins: [
        new CopyWebpackPlugin([
            { from: "src/**/*.js" },
            { from: "src/**/*.xml" },
            { from: "src/**/*.css" }
        ], {
            copyUnmodified: true
        }),
        new ExtractTextPlugin("./src/com/mendix/widget/StarRating/ui/StarRating.css")
    ],
    watch: true
};
