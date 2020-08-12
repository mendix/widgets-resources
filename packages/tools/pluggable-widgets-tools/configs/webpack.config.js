const { existsSync } = require("fs");
const { join } = require("path");
const variables = require("./variables");

module.exports = env => {
    env = env ? env : "prod";

    const pathWebpack = join(variables.sourcePath, `webpack.config.${env}.js`);
    if (existsSync(pathWebpack)) {
        console.log(`Using custom webpack configuration from ${pathWebpack}`);
        return require(pathWebpack);
    }
    return require(`./webpack.config.${env}.js`)[0];
};
