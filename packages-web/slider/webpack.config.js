const webpack = require("webpack");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: "./src/components/SliderContainer.ts",
    output: {
        path: path.resolve(__dirname, "dist/tmp"),
        filename: "src/com/mendix/widget/custom/slider/Slider.js",
        libraryTarget: "umd"
    },
    resolve: {
        extensions: [ ".ts", ".js" ],
        alias: {
            "tests": path.resolve(__dirname, "./tests")
        }
    },
    module: {
        rules: [
            { test: /\.ts$/, loader: "ts-loader" },
            { test: /\.css$/, loader: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
            }) },
            { test: /\.scss$/, loader: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [
                    { loader: "css-loader" },
                    { loader: "sass-loader" }
                ]
            }) }
        ]
    },
    devtool: "source-map",
    externals: [ "react", "react-dom" ],
    plugins: [
        new CopyWebpackPlugin([ { from: "src/**/*.xml" } ], { copyUnmodified: true }),
        new ExtractTextPlugin({ filename: "./src/com/mendix/widget/custom/slider/ui/Slider.css" }),
        new webpack.LoaderOptionsPlugin({ debug: true })
    ]
};
