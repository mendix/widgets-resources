const webBaseConfig = require("./test-config/jest.config.js");
const nativeBaseConfig = require("./test-config/jest.native.config.js");

const cwd = process.cwd();

const webConfig = {
    ...webBaseConfig,
    rootDir: "../../",
    testMatch: [`${cwd}/src/web/**/?(*.)(spec|test).[jt]s?(x)`]
};

const nativeConfig = {
    ...nativeBaseConfig,
    rootDir: "../../",
    testMatch: [`${cwd}/src/native/**/*.spec.{ts,tsx}`]
};

module.exports = {
    projects: [webConfig, nativeConfig]
};
