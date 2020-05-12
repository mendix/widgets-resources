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
    moduleDirectories: ["<rootDir>/node_modules", "<rootDir>/src"],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
    setupFilesAfterEnv: [__dirname + "/test-index.js"],
    snapshotSerializers: ["enzyme-to-json/serializer"],
    testPathIgnorePatterns: ["<rootDir>/dist", "<rootDir>/node_modules"],
    reporters: ["default"],
    transform: {
        "^.+\\.tsx?$": "ts-jest",
        "^.+\\.jsx?$": __dirname + "/transform.js"
    },
    coverageDirectory: "<rootDir>/dist/coverage"
};

module.exports = webConfig;
