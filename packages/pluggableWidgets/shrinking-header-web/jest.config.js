const webBaseConfig = require("@mendix/pluggable-widgets-tools/test-config/jest.config.js");

module.exports = {
    ...webBaseConfig,
    transformIgnorePatterns: ["<rootDir>/node_modules/(?!lodash-es)"]
};
