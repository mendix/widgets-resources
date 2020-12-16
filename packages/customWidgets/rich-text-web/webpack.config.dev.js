const { merge } = require("webpack-merge");
const baseConfig = require("@widgets-resources/utils-react-widgets/configs/webpack.config.dev");

const overridingConfig = {
    resolve: {
        alias: {
            path: "path-browserify"
        }
    }
};

module.exports = [merge(baseConfig[0], overridingConfig), merge(baseConfig[1], overridingConfig)];
