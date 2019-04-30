const webpack = require("webpack");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const package = require("./package");
const widgetName = package.widgetName;

const mxHost = process.env.npm_package_config_mendixHost || "http://localhost:8080";
const developmentPort = process.env.npm_package_config_developmentPort || "3000";

const widgetConfig = {
    entry: `./src/components/${widgetName}Container.ts`,
    output: {
        path: path.resolve(__dirname, "dist/tmp"),
        filename: (chunkData) => {
            const fileName = chunkData.chunk.name === "main" ? widgetName : "[name]";
            return `widgets/com/mendix/widget/custom/${widgetName}/${fileName}.js`
        },
        libraryTarget: "umd",
        publicPath: "/"
    },
    devServer: {
        port: developmentPort,
        proxy: [ {
            context: [ "**", `!/widgets/com/mendix/widget/custom/${widgetName}/${widgetName}.js` ],
            target: mxHost,
            onError: function(err, req, res) {
                if (res) {
                    res.writeHead(500, {
                        "Content-Type": "text/plain"
                    });
                    if (err.code === "ECONNREFUSED") {
                        res.end("Please make sure that the Mendix server is running at " + mxHost
                            + " or change the configuration \n "
                            + "> npm config set maps:mendixhost http://host:port");
                    } else {
                        res.end("Error connecting to Mendix server"
                        + "\n " + JSON.stringify(err, null, 2));
                    }
                }
            }
        } ],
        stats: "errors-only",
        overlay: {
            errors: true
        }
    },
    resolve: {
        extensions: [ ".ts", ".js" ],
        alias: {
            "tests": path.resolve(__dirname, "./tests")
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: "ts-loader",
                    options: {
                        transpileOnly: true
                    }
                }
            },
            { test: /\.(css|scss)$/, use: [
                "style-loader", "css-loader", "sass-loader"
            ] },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: "url-loader"
            }
        ]
    },
    mode: "development",
    devtool: "eval",
    externals: [ "mendix/lang", "react", "react-dom" ],
    plugins: [
        new ForkTsCheckerWebpackPlugin(),
        new CopyWebpackPlugin(
            [ {
                from: "src/**/*.xml",
                toType: "template",
                to: "widgets/[name].[ext]"
            } ],
            { copyUnmodified: true }
        ),
        // new ExtractTextPlugin({ filename: `./src/com/mendix/widget/custom/[name]/ui/[name].css` }),
        new webpack.LoaderOptionsPlugin({ debug: true })
    ]
};

const previewConfig = {
    entry: {
        Maps: `./src/${widgetName}.webmodeler.ts`,
    },
    output: {
        path: path.resolve(__dirname, "dist/tmp"),
        filename: `widgets/${widgetName}.webmodeler.js`,
        libraryTarget: "commonjs"
    },
    resolve: {
        extensions: [ ".ts", ".js" ],
    },
    module: {
        rules: [
            { test: /\.ts$/, use: "ts-loader" },
            { test: /\.css$/, loader: "raw-loader" }
        ]
    },
    mode: "development",
    devtool: "eval",
    externals: [ "react", "react-dom" ],
    plugins: [
        new webpack.LoaderOptionsPlugin({ debug: true })
    ]
};

module.exports = [ widgetConfig, previewConfig ];
