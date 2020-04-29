"use strict";

const fs = require('fs');
const path = require("path");
const variables = require("./variables");

module.exports = (env) => {
    env = env ? env : "prod";

    const pathWebpack = path.join(variables.path, `webpack.config.${env}.js`);
    if (fs.existsSync(pathWebpack)) {
        console.log(`Using custom webpack configuration from ${pathWebpack}`);
        return require(pathWebpack);
    }
    return require(`./webpack.config.${env}.js`)
}
