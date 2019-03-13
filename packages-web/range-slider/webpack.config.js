const webpack = require("webpack");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const widgetConfig = {
    entry: "./src/components/RangeSliderContainer.ts",
    output: {
        path: path.resolve(__dirname, "dist/tmp"),
        filename: (chunkData) => {
            const fileName = chunkData.chunk.name === "main" ? "RangeSlider" : "[name]";
            return `src/com/mendix/widget/custom/RangeSlider/${fileName}.js`;
        },
        libraryTarget:  "umd"
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
    mode: "development",
    externals: [ "react", "react-dom" ],
    plugins: [
        new CopyWebpackPlugin([ { from: "src/**/*.xml" } ], { copyUnmodified: true }),
        new ExtractTextPlugin({ filename: "./src/com/mendix/widget/custom/RangeSlider/ui/RangeSlider.css" }),
        new webpack.LoaderOptionsPlugin({ debug: true })
    ]
};

const previewConfig = {
    entry: "./src/RangeSlider.webmodeler.ts",
    output: {
        path: path.resolve(__dirname, "dist/tmp"),
        filename: "src/RangeSlider.webmodeler.js",
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
    mode: "development",
    externals: [ "react", "react-dom" ],
    plugins: [
        new webpack.LoaderOptionsPlugin({ debug: true })
    ]
};

module.exports = [ widgetConfig, previewConfig ];
