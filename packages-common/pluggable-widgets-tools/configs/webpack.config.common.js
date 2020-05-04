const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const variables = require("./variables");

const packagePath = variables.package.packagePath.replace(/\./g, "/");
const widgetName = variables.package.widgetName;
const name = widgetName.toLowerCase();

const widgetConfig = {
    entry: variables.widgetEntry,
    output: {
        path: path.join(variables.projectPath, "/dist/tmp"),
        filename: `widgets/${packagePath}/${name}/${widgetName}.js`,
        libraryTarget: "umd",
        publicPath: "/"
    },
    resolve: {
        extensions: [".ts", ".js", ".tsx", ".jsx"],
        alias: {
            tests: `${variables.projectPath}/tests`
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
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
                            "react-hot-loader/babel"
                        ]
                    }
                }
            }
        ]
    },
    externals: [/^mendix\//, "react", "big.js"],
    plugins: [
        new CopyWebpackPlugin(
            [
                {
                    from: `${variables.projectPath}/src/**/*.xml`,
                    toType: "template",
                    to: "widgets/[name].[ext]"
                }
            ],
            { copyUnmodified: true }
        )
    ]
};

const previewConfig = {
    entry: variables.previewEntry,
    output: {
        path: path.join(variables.projectPath, "/dist/tmp"),
        filename: `widgets/${widgetName}.editorPreview.js`,
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
                            ["@babel/plugin-transform-react-jsx", { pragma: "createElement" }],
                            "react-hot-loader/babel"
                        ]
                    }
                }
            }
        ]
    },
    externals: [/^mendix\//, "react", "react-dom"]
};

const editorConfigConfig = {
    mode: "production",
    devtool: false,
    entry: variables.editorConfigEntry,
    output: {
        path: path.join(variables.projectPath, "/dist/tmp"),
        filename: `widgets/${widgetName}.editorConfig.js`,
        libraryTarget: "commonjs"
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: "ts-loader",
                options: {
                    compilerOptions: {
                        module: "CommonJS"
                    }
                }
            },
            {
                test: /\.js$/,
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
            }
        ]
    }
};

module.exports = [widgetConfig, previewConfig, editorConfigConfig];
