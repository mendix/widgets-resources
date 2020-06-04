const commonConfig = require("./webpack.config.common");
const merge = require("webpack-merge");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const variables = require("./variables");

const packagePath = variables.package.packagePath.replace(/\./g, "/");
const widgetName = variables.package.widgetName;
const name = widgetName.toLowerCase();

const prodConfig = {
    mode: "production",
    devtool: false,
    plugins: [
        new ExtractTextPlugin({
            filename: `./widgets/${packagePath}/${name}/ui/${widgetName}.css`
        })
    ],
    module: {
        rules: [
            {
                test: /\.s?css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "sass-loader"]
                })
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

const previewProdConfig = {
    mode: "production",
    devtool: false,
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: ["to-string-loader", "css-loader", "sass-loader"]
            }
        ]
    }
};

module.exports = [merge(commonConfig[0], prodConfig), merge(commonConfig[1], previewProdConfig), commonConfig[2]];
