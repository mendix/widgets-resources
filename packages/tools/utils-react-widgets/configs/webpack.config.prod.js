const { join, resolve } = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const variables = require("./variables");

const widgetName = variables.package.widgetName;
const name = widgetName !== "RangeSlider" ? widgetName.toLowerCase() : widgetName;
const cwd = variables.path;

const widgetConfig = {
    context: cwd,
    entry: resolve(cwd, `./src/components/${widgetName}Container.ts`),
    output: {
        path: resolve(cwd, "dist/tmp"),
        filename: chunkData => {
            const fileName = chunkData.chunk.name === "main" ? widgetName : "[name]";
            return `widgets/com/mendix/widget/custom/${name}/${fileName}.js`;
        },
        libraryTarget: "umd",
        publicPath: "/"
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
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            }
        ]
    },
    mode: "production",
    externals: ["react", "react-dom"],
    plugins: [
        new MiniCssExtractPlugin({
            filename: `./widgets/com/mendix/widget/custom/${name}/ui/${widgetName}.css`,
            ignoreOrder: false
        }),
        new ForkTsCheckerWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: join(cwd, "src/**/*.xml").replace(/\\/g, "/"),
                    toType: "template",
                    to: "widgets/[name].[ext]"
                }
            ]
        }),
        new webpack.ContextReplacementPlugin(/^testSourcePath$/, resolve(cwd, "src"))
    ]
};

const previewConfig = {
    entry: resolve(cwd, `./src/${widgetName}.webmodeler.ts`),
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
    mode: "production",
    externals: ["react", "react-dom"]
};

module.exports = [widgetConfig, previewConfig];
