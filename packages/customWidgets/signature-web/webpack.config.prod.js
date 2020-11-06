const { merge } = require("webpack-merge");
const baseConfig = require("@widgets-resources/utils-react-widgets/configs/webpack.config.prod");

const customConfig = {
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: [/node_modules\/signature_pad/],
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

module.exports = [merge(baseConfig[0], customConfig), merge(baseConfig[1], customConfig)];
