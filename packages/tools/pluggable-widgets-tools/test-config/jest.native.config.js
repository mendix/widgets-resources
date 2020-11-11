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
    haste: {
        defaultPlatform: "android",
        platforms: ["android", "ios", "native"]
    },
    setupFilesAfterEnv: [__dirname + "/test-index-native.js"],
    snapshotSerializers: ["enzyme-to-json/serializer"],
    testMatch: ["<rootDir>/src/**/*.spec.{js,jsx,ts,tsx}"],
    testPathIgnorePatterns: ["<rootDir>/dist", "<rootDir>/node_modules"],
    transformIgnorePatterns: ["/node_modules/(?!react-native)/.+"],
    transform: {
        "^.+\\.tsx?$": "ts-jest",
        "^.+\\.jsx?$": __dirname + "/transform-native.js"
    },
    collectCoverage: true,
    coverageDirectory: "<rootDir>/dist/coverage"
};
