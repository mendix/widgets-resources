const projectDir = process.cwd();

module.exports = {
    preset: "react-native",
    clearMocks: true,
    rootDir: projectDir,
    globals: {
        "ts-jest": {
            tsconfig: `${projectDir}/tsconfig.spec.json`
        }
    },
    setupFilesAfterEnv: [__dirname + "/test-index-native.js"],
    snapshotSerializers: ["enzyme-to-json/serializer"],
    testMatch: ["<rootDir>/src/**/*.spec.{js,jsx,ts,tsx}"],
    transformIgnorePatterns: ["/node_modules/(?!react-native)"],
    transform: {
        "\\.tsx?$": "ts-jest",
        "\\.jsx?$": "react-native/jest/preprocessor.js"
    },
    collectCoverage: true,
    coverageDirectory: "<rootDir>/dist/coverage"
};
