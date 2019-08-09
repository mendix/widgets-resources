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
    moduleDirectories: ["<rootDir>/node_modules", `${cwd}/node_modules`, `${cwd}/src`],
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
            "<rootDir>/__mocks__/fileMock.js",
        "\\.(css|less|scss|sass)$": "identity-obj-proxy"
    }
};
