const webpack = require("webpack");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const pkg = require("./package");

const widgetName = pkg.widgetName;
const name = pkg.widgetName.toLowerCase();
const packageName = process.env.npm_package_name;
const mxHost = process.env.npm_package_config_mendixHost || "http://localhost:8080";
const developmentPort = process.env.npm_package_config_developmentPort || "3000";

const widgetConfig = {
    entry: `./src/components/${widgetName}Container.ts`,
    output: {
        path: path.resolve(__dirname, "dist/tmp"),
        filename: `widgets/com/mendix/widget/custom/${name}/${widgetName}.js`,
        libraryTarget: "umd",
        publicPath: "/"
    },
    devServer: {
        port: developmentPort,
        proxy: [ {
            context: [ "**", `!/widgets/com/mendix/widget/custom/${name}/${widgetName}.js` ],
            target: mxHost,
            ws: true,
            onError: function(err, req, res) {
                if (res) {
                    res.writeHead(500, {
                        "Content-Type": "text/plain"
                    });
                    if (err.code === "ECONNREFUSED") {
                        res.end("Please make sure that the Mendix server is running at " + mxHost
                            + " or change the configuration \n "
                            + "> npm config set " + packageName + ":mendixhost http://host:port");
                    } else {
                        res.end("Error connecting to Mendix server"
                        + "\n " + JSON.stringify(err, null, 2));
                    }
                }
            }
        } ],
        stats: "errors-only"
    },
    resolve: {
        extensions: [ ".ts", ".tsx", ".js" ],
        alias: {
            tests: path.resolve(__dirname, "./tests")
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
            { test: /signature_pad.m.js$/, use: [ {
                    loader: "babel-loader",
                    options: { presets: [ "@babel/preset-env" ] }
            } ] },
            { test: /\.s?css$/, loader: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader!sass-loader"
            }) }
        ]
    },
    mode: "development",
    devtool: "source-map",
    externals: [ "react", "react-dom" ],
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
        new ExtractTextPlugin({ filename: `./widgets/com/mendix/widget/custom/${name}/ui/${widgetName}.css` }),
        new webpack.LoaderOptionsPlugin({
            debug: true
        })
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
        extensions: [ ".ts", ".tsx", ".js" ]
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "ts-loader", options: {
                compilerOptions: {
                    "module": "CommonJS",
                }
            }},
            { test: /\.css$/, use: "raw-loader" },
            { test: /\.scss$/, use: [
                { loader: "raw-loader" },
                { loader: "sass-loader" }
            ] }
        ]
    },
    mode: "development",
    devtool: "inline-source-map",
    externals: [ "react", "react-dom" ],
    plugins: [
        new webpack.LoaderOptionsPlugin({ debug: true })
    ]
};

module.exports = [ widgetConfig, previewConfig ];
