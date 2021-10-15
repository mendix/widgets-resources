const cwd = process.cwd();
// eslint-disable-next-line @typescript-eslint/no-var-requires
const configs = require("../../packages/tools/pluggable-widgets-tools/test-config/jest.config");

module.exports = {
    ...configs,
    rootDir: "../../",
    testMatch: [`${cwd}/src/**/?(*.)(spec|test).[jt]s?(x)`],
    testPathIgnorePatterns: [`${cwd}/dist`, "<rootDir>/node_modules"],
    globals: {
        "ts-jest": {
            tsconfig: `${cwd}/tsconfig.spec.json`
        }
    },
    moduleDirectories: undefined,
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
            "<rootDir>/__mocks__/fileMock.js",
        "\\.(css|less|scss|sass)$": "identity-obj-proxy"
    },
    collectCoverage: !process.env.CI,
    coverageDirectory: `${cwd}/dist/coverage`,
    setupFiles: ["jest-canvas-mock"]
};
