const webpack = require("webpack");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        StarRating: "./src/components/StarRatingContainer.ts",
        StarRatingView: "./src/components/StarRatingViewContainer.ts"
    },
    output: {
        path: path.resolve(__dirname, "dist/tmp"),
        filename: "src/com/mendix/widget/custom/StarRating/[name].js",
        libraryTarget:  "umd"
    },
    resolve: {
        extensions: [ ".ts", ".js", ".jsx", ".json" ],
        alias: {
            "tests": path.resolve(__dirname, "./tests"),
            "react-rating": path.resolve(__dirname, "./node_modules/react-rating/src/react-rating.js")
        }
    },
    module: {
        rules: [
            { test: /\.ts$/, use: "ts-loader" },
            { test: /\.json$/, loader: "json" },
            { test: /\.css$/, loader: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"}) },
            { test: /\.jsx?$/, loader: "babel-loader" }
        ]
    },
    devtool: "source-map",
    externals: [ "react", "react-dom" ],
    plugins: [
        new CopyWebpackPlugin([
            { from: "src/**/*.js" },
            { from: "src/**/*.xml" },
        ], {
            copyUnmodified: true
        }),
        new ExtractTextPlugin( {filename: "./src/com/mendix/widget/custom/StarRating/ui/StarRating.css" }),
        new webpack.LoaderOptionsPlugin({
            debug: true
        })
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'react-rating',
        //     minChunks: function (module) {
        //         // this assumes your vendor imports exist in the node_modules directory
        //         return module.context && module.context.indexOf('node_modules') !== -1;
        //     }
        // }),
        // //CommonChunksPlugin will now extract all the common modules from vendor and main bundles
        // new webpack.optimize.CommonsChunkPlugin({ 
        //     name: 'manifest' //But since there are no more common modules between them we end up with just the runtime code included in the manifest file
        // })
    ]
};
