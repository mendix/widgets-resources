const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const widgetConfig = {
    entry: "./src/components/BadgeButtonContainer.ts",
    output: {
        path: path.resolve(__dirname, "dist/tmp"),
        filename: "src/com/mendix/widget/custom/badgebutton/BadgeButton.js",
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
            { test: /\.ts$/, use: "ts-loader" },
            { test: /\.css$/, loader: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
            }) }
        ]
    },
    devtool: "source-map",
    externals: [ "react", "react-dom" ],
    plugins: [
        new CleanWebpackPlugin("dist/tmp"),
        new CopyWebpackPlugin([ { from: "src/**/*.xml" } ], { copyUnmodified: true }),
        new ExtractTextPlugin({ filename: "./src/com/mendix/widget/custom/badgebutton/ui/BadgeButton.css" }),
        new webpack.LoaderOptionsPlugin({ debug: true })
    ]
};

const previewConfig = {
    entry: "./src/BadgeButton.webmodeler.ts",
    output: {
        path: path.resolve(__dirname, "dist/tmp"),
        filename: "src/BadgeButton.webmodeler.js",
        libraryTarget: "commonjs"
    },
    resolve: {
        extensions: [ ".ts", ".js" ]
    },
    module: {
        rules: [
            { test: /\.ts$/, use: "ts-loader" },
            { test: /\.css$/, use: "raw-loader" },
            { test: /\.scss$/, use: [
                    { loader: "raw-loader" },
                    { loader: "sass-loader" }
                ]
            }
        ]
    },
    devtool: "inline-source-map",
    externals: [ "react", "react-dom" ],
    plugins: [
        new webpack.LoaderOptionsPlugin({ debug: true })
    ]
};

module.exports = [ widgetConfig, previewConfig ];
