const webBaseConfig = require("./test-config/jest.config.js");
const nativeBaseConfig = require("./test-config/jest.native.config.js");

const webConfig = {
    ...webBaseConfig,
    rootDir: ".",
    testMatch: ["<rootDir>/src/@(web|typings-generator)/**/*.spec.ts"]
};

const nativeConfig = {
    ...nativeBaseConfig,
    rootDir: ".",
    testMatch: ["<rootDir>/src/native/**/*.spec.ts"]
};

module.exports = {
    projects: [webConfig, nativeConfig]
};
