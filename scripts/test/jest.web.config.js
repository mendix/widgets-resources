const cwd = process.cwd();
const configs = require("@mendix/pluggable-widgets-tools/test-config/jest.config");

module.exports = {
    ...configs,
    rootDir: "../../",
    testMatch: [`${cwd}/src/**/?(*.)(spec|test).[jt]s?(x)`],
    testPathIgnorePatterns: [`${cwd}/dist`, "<rootDir>/node_modules"],
    coverageDirectory: `${cwd}/dist/coverage`,
    globals: {
        "ts-jest": {
            tsConfig: `${cwd}/tsconfig.spec.json`
        }
    },
    moduleDirectories: ["<rootDir>/node_modules", `${cwd}/node_modules`, `${cwd}/src`]
};
