const commonConfig = require("./webpack.config.common");
const { join } = require("path");
const merge = require("webpack-merge");
const variables = require("./variables");
const webpack = require("webpack");
const fetch = require("node-fetch");
const { readFile } = require("fs").promises;
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const { promisify } = require("util");

const packagePath = variables.package.packagePath.replace(/\./g, "/");
const widgetName = variables.package.widgetName;
const name = widgetName.toLowerCase();

const mxHost = variables.package.config.mendixHost || "http://localhost:8080";
const developmentPort = variables.package.config.developmentPort || "3000";

const isHotRefresh = true;

const devConfig = {
    mode: "development",
    devtool: "source-map",
    externals: [{ "react-refresh/runtime": "root ReactRefreshRuntime" }],
    devServer: {
        hot: true,
        inline: true,
        contentBase: [join(process.cwd(), "./src"), join(process.cwd(), "./dist/tmp")],
        compress: true,
        port: developmentPort,
        overlay: false,
        before(app) {
            const compiler = webpack({
                entry: require.resolve("react-refresh/runtime"),
                mode: "development",
                devtool: false,
                output: {
                    path: join(process.cwd(), "dist/tmp2"),
                    filename: "runtime.js",
                    library: "ReactRefreshRuntime"
                }
            });
            /* const { createFsFromVolume, Volume } = require('memfs');
            const webpack = require('webpack');

            const fs = createFsFromVolume(new Volume());
            const compiler = webpack({ / options / });

            compiler.outputFileSystem = fs;
            compiler.run((err, stats) => {
                // Read the output later:
                const content = fs.readFileSync('...');
            });*/
            const runtimeCompilation = promisify(compiler.run.bind(compiler))();
            app.get("/mxclientsystem/mxui/mxui.js", async (req, res) => {
                const request = await fetch(`${mxHost}/mxclientsystem/mxui/mxui.js`);
                const mxui = await request.text();
                await runtimeCompilation;
                const runtimeCode = await readFile(join(process.cwd(), "dist/tmp2/runtime.js"));
                res.send(`${runtimeCode}\nReactRefreshRuntime.injectIntoGlobalHook(window);\n${mxui}`);
            });
        },
        proxy: [
            {
                context: [`!widgets/${packagePath}/${name}/${widgetName}.js`],
                target: mxHost,
                onError(err, req, res) {
                    if (res && res.writeHead) {
                        res.writeHead(500, {
                            "Content-Type": "text/plain"
                        });
                        if (err.code === "ECONNREFUSED") {
                            res.end(
                                `Please make sure that the Mendix server is running at ${mxHost} or change the configuration through your package.json`
                            );
                        } else {
                            res.end(`Error connecting to Mendix server\\n ${JSON.stringify(err, null, 2)}`);
                        }
                    }
                }
            }
        ]
    },
    plugins: isHotRefresh
        ? [new webpack.HotModuleReplacementPlugin(), new ReactRefreshWebpackPlugin({ forceEnable: true })]
        : [],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    ...(isHotRefresh
                        ? [
                              {
                                  loader: "babel-loader",
                                  options: {
                                      cacheDirectory: true,
                                      plugins: [require("react-refresh/babel")]
                                  }
                              }
                          ]
                        : []),
                    {
                        loader: "ts-loader",
                        options: {
                            compilerOptions: isHotRefresh
                                ? {
                                      module: "es6"
                                  }
                                : {}
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
                            ["@babel/plugin-transform-react-jsx", { pragma: "createElement" }],
                            ...(isHotRefresh ? [require("react-refresh/babel")] : [])
                        ]
                    }
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            { test: /\.png$/, loader: "url-loader?limit=100000" },
            { test: /\.jpg$/, loader: "file-loader" },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?limit=10000&mimetype=application/octet-stream"
            },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?limit=10000&mimetype=image/svg+xml"
            }
        ]
    }
};

const previewDevConfig = {
    mode: "development",
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: ["to-string-loader", "css-loader", "sass-loader"]
            }
        ]
    }
};

module.exports = [merge(commonConfig[0], devConfig), merge(commonConfig[1], previewDevConfig), commonConfig[2]];
