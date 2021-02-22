const webpack = require("webpack");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const widgetConfig = {
    entry: {
        StarRating: "./src/components/StarRatingContainer.ts"
    },
    output: {
        path: path.resolve(__dirname, "dist/tmp"),
        filename: "src/com/mendix/widget/custom/starrating/StarRating.js",
        libraryTarget: "umd"
    },
    resolve: {
        extensions: [".ts", ".js", ".jsx", ".json"],
        alias: {
            tests: path.resolve(__dirname, "./tests"),
            "react-rating": path.resolve(__dirname, "./node_modules/react-rating/src/react-rating.js")
        }
    },
    module: {
        rules: [
            { test: /\.ts$/, use: "ts-loader" },
            {
                test: /\.s?css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            },
            { test: /\.jsx?$/, loader: "babel-loader" }
        ]
    },
    devtool: "source-map",
    externals: ["react", "react-dom"],
    plugins: [
        new CopyWebpackPlugin([{ from: "src/**/*.js" }, { from: "src/**/*.xml" }], { copyUnmodified: true }),
        new MiniCssExtractPlugin({
            filename: "./src/com/mendix/widget/custom/starrating/ui/StarRating.css",
            ignoreOrder: false
        }),
        new webpack.LoaderOptionsPlugin({ debug: true })
    ]
};

const previewConfig = {
    entry: "./src/StarRating.webmodeler.ts",
    output: {
        path: path.resolve(__dirname, "dist/tmp"),
        filename: "src/StarRating.webmodeler.js",
        libraryTarget: "commonjs"
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [
            { test: /\.ts$/, use: "ts-loader" },
            { test: /\.css$/, use: "raw-loader" },
            { test: /\.(scss)$/, use: [{ loader: "raw-loader" }, { loader: "sass-loader" }] }
        ]
    },
    devtool: "inline-source-map",
    externals: ["react", "react-dom"],
    plugins: [new webpack.LoaderOptionsPlugin({ debug: true })]
};

module.exports = [widgetConfig, previewConfig];
