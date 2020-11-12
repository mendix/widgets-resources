const commonConfig = require("./webpack.config.common");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const variables = require("./variables");

const packagePath = variables.package.packagePath.replace(/\./g, "/");
const widgetName = variables.package.widgetName;
const name = widgetName.toLowerCase();

const prodConfig = {
    mode: "production",
    devtool: false,
    plugins: [
        new MiniCssExtractPlugin({
            filename: `./widgets/${packagePath}/${name}/ui/${widgetName}.css`,
            ignoreOrder: false
        })
    ],
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            },
            { test: /\.png$/, use: [{ loader: "url-loader", options: { limit: 100000 } }] },
            { test: /\.jpg$/, loader: "file-loader" },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{ loader: "url-loader", options: { limit: 100000, mimetype: "application/font-woff" } }]
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                use: [{ loader: "url-loader", options: { limit: 100000, mimetype: "application/octet-stream" } }]
            },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: [{ loader: "url-loader", options: { limit: 100000, mimetype: "image/svg+xml" } }]
            }
        ]
    }
};

const previewProdConfig = {
    mode: "production",
    devtool: false,
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: ["to-string-loader", { loader: "css-loader", options: { esModule: false } }, "sass-loader"]
            }
        ]
    }
};

module.exports = [merge(commonConfig[0], prodConfig), merge(commonConfig[1], previewProdConfig), commonConfig[2]];
