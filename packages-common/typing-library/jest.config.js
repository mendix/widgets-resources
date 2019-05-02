const webConfig = {
    name: "web",
    displayName: "Web Client",
    clearMocks: true,
    globals: {},
    transform: {
        "^.+\\.ts?$": "ts-jest"
    },
    moduleDirectories: ["node_modules"],
    moduleFileExtensions: ["ts", "js"],
    roots: [""],
    snapshotSerializers: ["enzyme-to-json/serializer"],
    testMatch: ["<rootDir>/tests/*.spec.[t|j]s"],
    testPathIgnorePatterns: ["<rootDir>/node_modules"],
    reporters: ["default"],
    coverageDirectory: "<rootDir>/dist/coverage"
};

module.exports = webConfig;
