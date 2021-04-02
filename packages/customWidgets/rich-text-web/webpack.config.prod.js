const { merge } = require("webpack-merge");
const baseConfig = require("@mendix/custom-widgets-utils-internal/configs/webpack.config.prod");

const overridingConfig = {
    resolve: {
        alias: {
            path: "path-browserify"
        }
    }
};

module.exports = [merge(baseConfig[0], overridingConfig), merge(baseConfig[1], overridingConfig)];
