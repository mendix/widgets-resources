const webConfig = {
    name: "web",
    displayName: "Web Client",
    clearMocks: true,
    globals: {
    },
    moduleDirectories: [
        "node_modules"
    ],
    moduleFileExtensions: [
        "js",
        "jsx"
    ],
    roots: [
        ""
    ],
    snapshotSerializers: [
        "enzyme-to-json/serializer"
    ],
    testMatch: [
        "<rootDir>/tests/*.spec.js"
    ],
    testPathIgnorePatterns: [
        "<rootDir>/node_modules"
    ],
    reporters: [ "default" ],
    coverageDirectory: "<rootDir>/dist/coverage"
};

module.exports = webConfig;
