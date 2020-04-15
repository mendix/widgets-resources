const webConfig = {
    name: "web",
    displayName: "Web Client",
    clearMocks: true,
    rootDir: "../../../../",
    globals: {
        "ts-jest": {
            "tsConfig": {
                module: "commonjs"
            }
        }
    },
    moduleDirectories: [
        "<rootDir>/node_modules",
        "<rootDir>/src"
    ],
    moduleFileExtensions: [
        "ts",
        "tsx",
        "js",
        "jsx"
    ],
    setupFilesAfterEnv: [
        "<rootDir>/node_modules/@mendix/pluggable-widgets-tools/test-config/test-index.js"
    ],
    snapshotSerializers: [
        "enzyme-to-json/serializer"
    ],
    testMatch: [
        "<rootDir>/src/**/?(*.)(spec|test).[jt]s?(x)"
    ],
    testPathIgnorePatterns: [
        "<rootDir>/dist",
        "<rootDir>/node_modules"
    ],
    reporters: [ "default" ],
        transform: {
        "^.+\\.tsx?$": "ts-jest",
        "^.+\\.jsx?$": "<rootDir>/node_modules/@mendix/pluggable-widgets-tools/test-config/transform.js"
    },
    coverageDirectory: "<rootDir>/dist/coverage"
};

module.exports = webConfig;
