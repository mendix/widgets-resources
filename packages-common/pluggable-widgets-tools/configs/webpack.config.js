const { existsSync } = require("fs");
const { join } = require("path");
const variables = require("./variables");

module.exports = env => {
    env = env ? env : "prod";

    const pathWebpack = join(variables.projectPath, `webpack.config.${env}.js`);
    if (existsSync(pathWebpack)) {
        console.log(`Using custom webpack configuration from ${pathWebpack}`);
        return require(pathWebpack);
    }
    const config = require(`./webpack.config.${env}.js`);
    console.log(config[0]);
    return config[0];
};
