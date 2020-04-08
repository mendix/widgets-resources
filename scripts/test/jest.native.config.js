const cwd = process.cwd();

module.exports = {
    preset: "react-native",
    rootDir: "../../",
    setupFiles: ["<rootDir>/node_modules/react-native-gesture-handler/jestSetup.js"],
    transform: {
        "^.+\\.js$": "<rootDir>/node_modules/react-native/jest/preprocessor.js",
        "^.+\\.tsx?$": "ts-jest"
    },
    transformIgnorePatterns: [
        "node_modules/(?!react-native|@ptomasroos/react-native-multi-slider|@react-native-community)"
    ],
    testMatch: [`${cwd}/src/**/*.spec.{ts,tsx}`],
    globals: {
        "ts-jest": {
            tsConfig: `${cwd}/tsconfig.spec.json`
        }
    },
    collectCoverage: true,
    collectCoverageFrom: [`${cwd}/src/**/*`, "!**/*.snap", "!**/dist/**", "!**/mxproject/**"],
    coverageDirectory: `${cwd}/dist/coverage`
};
