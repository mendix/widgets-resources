const webConfig = {
    name: "web",
    displayName: "Web Client",
    clearMocks: true,
    rootDir: "../../../../",
    globals: {
        "ts-jest": {
            tsConfig: {
                module: "commonjs"
            }
        }
    },
    setupFilesAfterEnv: [__dirname + "/test-index.js"],
    snapshotSerializers: ["enzyme-to-json/serializer"],
    testMatch: ["<rootDir>/src/**/*.spec.{js,jsx,ts,tsx}"],
    testPathIgnorePatterns: ["<rootDir>/dist", "<rootDir>/node_modules"],
    reporters: ["default"],
    transform: {
        "^.+\\.tsx?$": "ts-jest",
        "^.+\\.jsx?$": __dirname + "/transform.js"
    },
    coverageDirectory: "<rootDir>/dist/coverage"
};

module.exports = webConfig;
