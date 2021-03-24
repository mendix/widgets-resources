const webpack = require("webpack");
const { join, resolve } = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const variables = require("./variables");

const widgetName = variables.package.widgetName;
const name = widgetName !== "RangeSlider" ? widgetName.toLowerCase() : widgetName;

const packageName = name;
const mxHost = variables.package.config.mendixHost || "http://localhost:8080";
const developmentPort = variables.package.config.developmentPort || "3000";
const cwd = variables.path;

const widgetConfig = {
    context: cwd,
    entry: join(cwd, `src/components/${widgetName}Container.ts`),
    output: {
        path: resolve(cwd, "dist/tmp"),
        filename: chunkData => {
            const fileName = chunkData.chunk.name === "main" ? widgetName : "[name]";
            return `widgets/com/mendix/widget/custom/${name}/${fileName}.js`;
        },
        libraryTarget: "umd",
        publicPath: "/"
    },
    devServer: {
        compress: true,
        port: developmentPort,
        hot: true,
        proxy: [
            {
                target: mxHost,
                context: [`!/widgets/com/mendix/widget/custom/${name}/${widgetName}.${variables.extension}`],
                onError(err, req, res) {
                    if (res && res.writeHead) {
                        res.writeHead(500, {
                            "Content-Type": "text/plain"
                        });
                        if (err.code === "ECONNREFUSED") {
                            res.end(
                                "Please make sure that the Mendix server is running at " +
                                    mxHost +
                                    " or change the configuration \n " +
                                    "> npm config set " +
                                    packageName +
                                    ":mendixhost http://host:port"
                            );
                        } else {
                            res.end("Error connecting to Mendix server" + "\n " + JSON.stringify(err, null, 2));
                        }
                    }
                }
            }
        ],
        stats: "errors-only"
    },
    resolve: {
        extensions: [".ts", ".js", ".tsx", ".jsx"],
        alias: {
            tests: resolve(cwd, "./tests")
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            transpileOnly: true
                        }
                    }
                ]
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        cacheDirectory: true,
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                        plugins: [
                            ["@babel/plugin-proposal-class-properties", { loose: true }],
                            ["@babel/plugin-transform-react-jsx", { pragma: "createElement" }]
                        ]
                    }
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
    mode: "development",
    devtool: "source-map",
    externals: ["react", "react-dom"],
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ForkTsCheckerWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: join(cwd, "src/**/*.xml").replace(/\\/g, "/"),
                    toType: "template",
                    to: "widgets/[name].[ext]"
                }
            ]
        })
    ]
};

const previewConfig = {
    entry: resolve(cwd, `./src/${widgetName}.webmodeler.${variables.extension}`),
    output: {
        path: resolve(cwd, "dist/tmp"),
        filename: `widgets/${widgetName}.webmodeler.js`,
        libraryTarget: "commonjs"
    },
    resolve: {
        extensions: [".ts", ".js", ".tsx", ".jsx"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                options: {
                    compilerOptions: {
                        module: "CommonJS"
                    }
                }
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        cacheDirectory: true,
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                        plugins: [
                            ["@babel/plugin-proposal-class-properties", { loose: true }],
                            ["@babel/plugin-transform-react-jsx", { pragma: "createElement" }]
                        ]
                    }
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: ["to-string-loader", "css-loader", "sass-loader"]
            }
        ]
    },
    mode: "development",
    externals: ["react", "react-dom"]
};

module.exports = [widgetConfig, previewConfig];
