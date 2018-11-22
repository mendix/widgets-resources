const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const package = require("./package");
const widgetName = package.widgetName;
const name = package.widgetName.toLowerCase();
const host = "http://10.211.55.3:8080/";

const widgetConfig = {
    entry: `./src/components/${widgetName}Container.tsx`,
    output: {
        path: path.resolve(__dirname, "dist/tmp"),
        filename: `widgets/com/mendix/widget/custom/${name}/${widgetName}.js`,
        libraryTarget: "umd"
    },
    devServer: {
        port: 3000,
        proxy: [ {
            context: [ "**", `!/widgets/com/mendix/widget/custom/${name}/${widgetName}.js` ],
            target: host,
            onError: function(err, req, res) {
                if (res && res.writeHead) {
                    res.writeHead(500, {
                        "Content-Type": "text/plain"
                    });
                    if (err.code === "ECONNREFUSED") {
                        res.end("Please make sure that the Mendix server is running at " + host
                            + " or change the configuration \n > npm config set transcript-editor:mendixhost http://host:port");
                    } else {
                        res.end("Error connecting to Mendix server"
                            + "\n " + JSON.stringify(err, null, 2));
                    }
                }
            }
        } ]
    },
    resolve: {
        extensions: [ ".ts", ".js", ".tsx" ],
        alias: {
            "tests": path.resolve(__dirname, "./tests")
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "ts-loader",
                    options: { transpileOnly: true }
                }
            },
            {
                test: /\.(css|scss)$/, use: [
                    "style-loader", "css-loader", "sass-loader"
                ]
            }
        ]
    },
    devtool: "eval",
    externals: [ "react", "react-dom" ],
    mode: "development",
    plugins: [
        new ForkTsCheckerWebpackPlugin(),
        new CopyWebpackPlugin(
            [ {
                from: "src/**/*.xml",
                toType: "template",
                to: "widgets/[name].[ext]"
            } ],
            { copyUnmodified: true }
        )
    ]
};

const previewConfig = {
    entry: `./src/${widgetName}.webmodeler.tsx`,
    output: {
        path: path.resolve(__dirname, "dist/tmp"),
        filename: `widgets/${widgetName}.webmodeler.js`,
        libraryTarget: "commonjs"
    },
    resolve: {
        extensions: [ ".ts", ".js", ".tsx" ]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "ts-loader",
                    options: {
                        transpileOnly: true,
                        compilerOptions: {
                            "module": "CommonJS",
                        }
                    }
                }
            },
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
    externals: [ "react", "react-dom" ]
};

module.exports = [ widgetConfig, previewConfig ];
