const webpack = require("webpack");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: "./src/components/StarRatingContainer.ts",
    output: {
        path: path.resolve(__dirname, "dist/tmp"),
        filename: "src/com/mendix/widget/custom/StarRating/StarRating.js",
        libraryTarget:  "umd",
        umdNamedDefine: true,
        library: "com.mendix.widget.StarRating.StarRating"
    },
    resolve: {
        extensions: [ "", ".ts", ".js", ".jsx", ".json" ],
        alias: {
            "tests": path.resolve(__dirname, "./tests"),
            "react-rating": path.resolve(__dirname, "./node_modules/react-rating/src/react-rating.js")
        }
    },
    errorDetails: true,
    module: {
        loaders: [
            { test: /\.ts$/, loader: "ts-loader" },
            { test: /\.json$/, loader: "json" },
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
            { test: /\.jsx?$/, loader: "babel-loader" }
        ]
    },
    devtool: "source-map",
    externals: [ "react", "react-dom" ],
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
