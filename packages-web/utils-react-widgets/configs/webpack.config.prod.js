const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const variables = require("./variables");
// console.log("variables", variables);

const widgetName = variables.package.widgetName;
const name = widgetName.toLowerCase();
const cwd = variables.path;

const widgetConfig = {
    context: cwd,
    entry: path.resolve(cwd, `./src/components/${widgetName}Container.ts`),
    output: {
        path: path.resolve(cwd, "dist/tmp"),
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
            tests: path.resolve(cwd, "./tests")
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
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "sass-loader"]
                })
            }
        ]
    },
    mode: "production",
    devtool: "source-map",
    externals: ["react", "react-dom"],
    plugins: [
        new ExtractTextPlugin({
            filename: `./widgets/com/mendix/widget/custom/${name}/ui/${widgetName}.css`
        }),
        new ForkTsCheckerWebpackPlugin(),
        new CopyWebpackPlugin(
            [
                {
                    from: "src/**/*.xml",
                    toType: "template",
                    to: "widgets/[name].[ext]"
                }
            ],
            { copyUnmodified: true }
        ),
        new webpack.ContextReplacementPlugin(/^testSourcePath$/, path.resolve(cwd, "src"))
    ]
};

const previewConfig = {
    entry: path.resolve(cwd, `./src/${widgetName}.webmodeler.ts`),
    output: {
        path: path.resolve(cwd, "dist/tmp"),
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
