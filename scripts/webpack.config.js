const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const pkg = require(path.join(process.cwd(), "package.json"));
const widgetName = pkg.config.widgetName;
const name = pkg.config.widgetName.toLowerCase();

const config = {
    entry: `./src/${widgetName}.tsx`,
    output: {
        path: path.resolve(process.cwd(), "dist/tmp"),
        filename: `widgets/mendix/native/${name}/${widgetName}.js`,
        libraryTarget: "commonjs2"
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            },
            {
                test: /\.jsx?$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["module:metro-react-native-babel-preset"]
                    }
                }
            }
        ]
    },
    mode: "development",
    devtool: false,
    externals: ["react", "react-dom", "react-native", "react-native-camera", "react-native-maps"],
    plugins: [
        new CopyWebpackPlugin([{ from: "src/**/*.xml", toType: "template", to: "widgets/[name].[ext]" }], {
            copyUnmodified: true
        })
    ]
};

module.exports = config;
