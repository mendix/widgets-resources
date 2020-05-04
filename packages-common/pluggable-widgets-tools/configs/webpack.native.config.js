const webpack = require("webpack");
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
        libraryTarget: "commonjs2"
    },
    resolve: {
        extensions: [".native.js", ".js", ".jsx", ".ts", ".tsx"],
        alias: {
            tests: `${variables.projectPath}/tests`
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
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
                test: /\.jsx?$/,
                include: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        cacheDirectory: true,
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                        plugins: [
                            ["@babel/plugin-proposal-class-properties", { loose: true }],
                            "@babel/plugin-transform-react-jsx"
                        ]
                    }
                }
            }
        ]
    },
    mode: "development",
    devtool: "source-map",
    bail: true,
    externals: [
        /^mendix\//,
        "@react-native-community/art",
        "@react-native-community/async-storage",
        "@react-native-community/cameraroll",
        "@react-native-community/geolocation",
        "@react-native-community/netinfo",
        "big.js",
        "react",
        "react-dom",
        "react-native",
        "react-native-camera",
        "react-native-device-info",
        "react-native-firebase",
        "react-native-geocoder",
        "react-native-image-picker",
        "react-native-inappbrowser-reborn",
        "react-native-localize",
        "react-native-maps",
        "react-native-reanimated",
        "react-native-sound",
        "react-native-svg",
        "react-native-touch-id",
        "react-native-vector-icons",
        "react-native-video",
        "react-native-view-shot",
        "react-native-webview",
        /react-native-gesture-handler\/*/,
        "react-navigation"
    ],
    plugins: [
        new CopyWebpackPlugin(
            [
                {
                    from: `${variables.projectPath}/src/**/*.xml`,
                    toType: "template",
                    to: `widgets/[name].[ext]`
                }
            ],
            {
                copyUnmodified: true
            }
        ),
        new webpack.LoaderOptionsPlugin({ debug: true })
    ]
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

module.exports = [widgetConfig, editorConfigConfig];
