const cwd = process.cwd();
const packageName = process.env.npm_package_name;

module.exports = {
    preset: "react-native",
    rootDir: "../",
    transform: {
        "^.+\\.js$": "<rootDir>/node_modules/react-native/jest/preprocessor.js",
        "\\.(ts|tsx)$": "ts-jest"
    },
    testMatch: [`${cwd}/src/**/*.spec.{ts,tsx}`],
    globals: {
        "ts-jest": {
            tsConfig: `${cwd}/tsconfig.spec.json`
        }
    },
    collectCoverage: true,
    collectCoverageFrom: [`**/${packageName}/src/**/*`, "!**/*.snap", "!**/dist/**", "!**/mxproject/**"]
};
