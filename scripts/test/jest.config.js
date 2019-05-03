const cwd = process.cwd();
const packageName = process.env.npm_package_name;

module.exports = {
    preset: "react-native",
    rootDir: "../../",
    transform: {
        "^.+\\.js$": "<rootDir>/node_modules/react-native/jest/preprocessor.js",
        "^.+\\.tsx?$": "ts-jest"
    },
    transformIgnorePatterns: ["node_modules/(?!react-native|@ptomasroos/react-native-multi-slider)"],
    testMatch: [`${cwd}/src/**/*.spec.{ts,tsx}`],
    globals: {
        "ts-jest": {
            tsConfig: `${cwd}/tsconfig.spec.json`
        }
    },
    collectCoverage: true,
    collectCoverageFrom: [`**/${packageName}/src/**/*`, "!**/*.snap", "!**/dist/**", "!**/mxproject/**"],
    coverageDirectory: `packages/${packageName}/coverage`
};
