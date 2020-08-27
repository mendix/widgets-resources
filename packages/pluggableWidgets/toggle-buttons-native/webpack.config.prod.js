const merge = require("webpack-merge");
const baseConfig = require("@mendix/pluggable-widgets-tools/configs/webpack.native.config.js");

const customConfig = {
    mode: "production",
    devtool: false,
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                options: {
                    compilerOptions: {
                        target: "esnext"
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
                        presets: ["@babel/preset-react"],
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
                        presets: ["@babel/preset-react"],
                        plugins: [
                            ["@babel/plugin-proposal-class-properties", { loose: true }],
                            "@babel/plugin-transform-react-jsx",
                            "@babel/plugin-transform-flow-strip-types"
                        ]
                    }
                }
            }
        ]
    }
};

const customConfigurations = [merge.smartStrategy({ "module.rules": "replace" })(baseConfig[0], customConfig)];

const hasEditorConfig = baseConfig.length === 2;

if (hasEditorConfig) {
    customConfigurations.push(baseConfig[1]);
}

module.exports = customConfigurations;
