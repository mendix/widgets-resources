const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const package = require("./package");
const widgetName = package.widgetName;
const name = package.widgetName.toLowerCase();

const widgetConfig = {
    entry: `./src/components/${widgetName}Container.ts`,
    output: {
        path: path.resolve(__dirname, "dist/tmp"),
        filename: `widgets/com/mendix/widget/custom/${name}/${widgetName}.js`,
        libraryTarget: "umd",
    },
    devServer: {
        port: 4000,
        proxy: [ {
            context: [ "**", `!/widgets/com/mendix/widget/custom/${name}/${widgetName}.js` ],
            target: "http://localhost:8080"
        } ],
        stats: "errors-only"
    },
    resolve: {
        extensions: [ ".ts", ".js" ],
        alias: {
            "tests": path.resolve(__dirname, "./tests")
        }
    },
    module: {
        rules: [ { test: /\.ts$/, use: "ts-loader" },
            { test: /\.(css|scss)$/, use: [
                "style-loader", "css-loader", "sass-loader"
            ] },
        ]
    },
    mode: "development",
    externals: [ "react", "react-dom" ],
    plugins: [
        new CopyWebpackPlugin(
            [ {
                from: "src/**/*.xml",
                toType: "template",
                to: "widgets/[name].[ext]"
            } ],
            { copyUnmodified: true }
        ),
        new webpack.LoaderOptionsPlugin({ debug: true })
    ]
};

const previewConfig = {
    entry: `./src/${widgetName}.webmodeler.ts`,
    output: {
        path: path.resolve(__dirname, "dist/tmp"),
        filename: `widgets/${widgetName}.webmodeler.js`,
        libraryTarget: "commonjs"
    },
    resolve: {
        extensions: [ ".ts", ".js" ]
    },
    module: {
        rules: [
            { test: /\.ts$/, loader: "ts-loader", options: {
                compilerOptions: {
                    "module": "CommonJS",
                }
            }},
            { test: /\.css$/, use: "raw-loader" },
            { test: /\.scss$/, use: [
                    { loader: "raw-loader" },
                    { loader: "sass-loader" }
                ]
            }
        ]
    },
    mode: "development",
    externals: [ "react", "react-dom" ],
    plugins: [ new webpack.LoaderOptionsPlugin({ debug: true }) ]
};

module.exports = [ widgetConfig, previewConfig ];
