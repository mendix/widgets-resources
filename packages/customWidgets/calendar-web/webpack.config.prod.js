const { merge } = require("webpack-merge");
const baseConfig = require("@widgets-resources/utils-react-widgets/configs/webpack.config.dev");

const overridingConfig = {
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        cacheDirectory: true,
                        presets: [
                            [
                                "@babel/preset-env",
                                {
                                    corejs: 3,
                                    debug: true,
                                    targets: {
                                        chrome: "49",
                                        firefox: "52",
                                        edge: "16",
                                        safari: "9",
                                        ie: "11",
                                        ios: "9",
                                        android: "5"
                                    },
                                    useBuiltIns: "usage"
                                }
                            ],
                            "@babel/preset-react"
                        ],
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

module.exports = [merge(baseConfig[0], overridingConfig), merge(baseConfig[1], overridingConfig)];
