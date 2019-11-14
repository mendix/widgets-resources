var webpack_merge = require("webpack-merge");

var base_config = require("@mendix/mendix-hybrid-app-base/webpack.config");

module.exports = function(env) {
    let config = webpack_merge(base_config(env), {});

    return config;
};
