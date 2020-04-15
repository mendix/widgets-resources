const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const variables = require("./variables");

const packagePath = variables.package.packagePath.replace(/\./g, "\/");
const widgetName = variables.package.widgetName;
const name = widgetName.toLowerCase();

const widgetConfig = {
    entry: path.join(variables.path, `/src/${widgetName}.${variables.extension}`),
    output: {
        path: path.join(variables.path, "/dist/tmp"),
        filename: `widgets/${packagePath}/${name}/${widgetName}.js`,
        libraryTarget: "umd",
        publicPath: "/"
    },
    resolve: {
        extensions: [".ts", ".js", ".tsx", ".jsx"],
        alias: {
            "tests":`${variables.path}/tests`
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [{
                    loader: "ts-loader"
                }]
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
                            ["@babel/plugin-proposal-class-properties", { "loose": true }],
                            ["@babel/plugin-transform-react-jsx", { "pragma": "createElement" }],
                            "react-hot-loader/babel"
                        ]
                    }
                }
            },
        ]
    },
    externals: [
        /^mendix\//,
        "react",
        "big.js"
    ],
    plugins: [
        new CopyWebpackPlugin(
            [{
                from: `${variables.path}/src/**/*.xml`,
                toType: "template",
                to: `widgets/[name].[ext]`
            }],
            { copyUnmodified: true }
        )
    ]
};

const previewConfig = {
    entry: path.join(variables.path, `/src/${widgetName}.${variables.preview}.${variables.extension}`),
    output: {
        path: path.join(variables.path, "/dist/tmp"),
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
                        "module": "CommonJS",
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
                            ["@babel/plugin-proposal-class-properties", { "loose": true }],
                            ["@babel/plugin-transform-react-jsx", { "pragma": "createElement" }],
                            "react-hot-loader/babel"
                        ]
                    }
                }
            }
        ]
    },
    externals: [
        /^mendix\//,
        "react",
        "react-dom"
    ]
};

const configurations = [widgetConfig, previewConfig];

if (variables.editorConfig) {
    configurations.push({
        mode: "production",
        devtool: false,
        entry: path.join(variables.path, `/src/${widgetName}.editorConfig.${variables.extension === "jsx" ? "js" : "ts"}`),
        output: {
            path: path.join(variables.path, "/dist/tmp"),
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
                            "module": "CommonJS",
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
                                ["@babel/plugin-proposal-class-properties", { "loose": true }],
                                ["@babel/plugin-transform-react-jsx", { "pragma": "createElement" }]
                            ]
                        }
                    }
                }
            ]
        }
    });
}

module.exports = configurations;
