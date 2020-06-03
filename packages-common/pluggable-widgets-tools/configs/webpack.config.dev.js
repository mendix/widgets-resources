const commonConfig = require("./webpack.config.common");
const { join } = require("path");
const merge = require("webpack-merge");
const variables = require("./variables");
const webpack = require("webpack");
const fetch = require("node-fetch");

const packagePath = variables.package.packagePath.replace(/\./g, "/");
const widgetName = variables.package.widgetName;
const name = widgetName.toLowerCase();

const mxHost = variables.package.config.mendixHost || "http://localhost:8080";
const developmentPort = variables.package.config.developmentPort || "3000";

const isHotRefresh = process.argv.indexOf("--hot") !== -1;

const tsLoaders = [
    {
        loader: "babel-loader",
        options: {
            cacheDirectory: true,
            plugins: [require("react-refresh/babel")]
        }
    },
    {
        loader: "ts-loader"
    }
];

if (!isHotRefresh) {
    tsLoaders.shift();
}

const devConfig = {
    mode: "development",
    devtool: "source-map",
    devServer: {
        contentBase: join(process.cwd(), "dist/tmp"),
        compress: true,
        port: developmentPort,
        overlay: {
            errors: true
        },
        before(app) {
            app.get("/mxclientsystem/mxui/mxui.js", async (req, res) => {
                const request = await fetch(`${mxHost}/mxclientsystem/mxui/mxui.js`);
                const mxui = await request.text();
                const { injectIntoGlobalHook } = require("react-refresh/runtime");
                const fileReturn = `${injectIntoGlobalHook}
if (typeof window !== 'undefined') {
  injectIntoGlobalHook(window);
  window.$RefreshReg$ = () => {};
  window.$RefreshSig$ = () => type => type;
}
${mxui}`;
                res.send(fileReturn);
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
    plugins: isHotRefresh ? [new webpack.HotModuleReplacementPlugin()] : [],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: tsLoaders
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
                            isHotRefresh ? require("react-refresh/babel") : ""
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
