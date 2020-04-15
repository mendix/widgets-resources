const nativeConfig = {
    preset: "react-native",

    name: "native",
    displayName: "Native Client",
    clearMocks: true,
    rootDir: "../../../../",
    globals: {
        "ts-jest": {
            "tsConfig": {
                module: "commonjs"
            }
        }
    },
    haste: {
        defaultPlatform: "android",
        platforms: [
            "android",
            "ios",
            "native"
        ],
        providesModuleNodeModules: [
            "react-native"
        ]
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
    modulePathIgnorePatterns: [
        "<rootDir>/node_modules/react-native/Libraries/react-native/"
    ],
    setupFilesAfterEnv: [
        "<rootDir>/node_modules/@mendix/pluggable-widgets-tools/test-config/test-index-native.js"
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
    reporters: ["default"],
    transformIgnorePatterns: [
        "/node_modules/(?!react-native)/.+"
    ],
    transform: {
        "^.+\\.tsx?$": "ts-jest",
        "^.+\\.jsx?$": "<rootDir>/node_modules/@mendix/pluggable-widgets-tools/test-config/transform-native.js"
    },
    coverageDirectory: "<rootDir>/dist/coverage"
};

module.exports = nativeConfig;