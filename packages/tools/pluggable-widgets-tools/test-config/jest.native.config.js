const nativeConfig = {
    preset: "react-native",

    name: "native",
    displayName: "Native Client",
    clearMocks: true,
    rootDir: "../../../../",
    globals: {
        "ts-jest": {
            tsConfig: {
                module: "commonjs"
            }
        }
    },
    haste: {
        defaultPlatform: "android",
        platforms: ["android", "ios", "native"]
    },
    modulePathIgnorePatterns: ["<rootDir>/node_modules/react-native/Libraries/react-native/"],
    reporters: ["default"],
    setupFilesAfterEnv: [__dirname + "/test-index-native.js"],
    snapshotSerializers: ["enzyme-to-json/serializer"],
    testMatch: ["<rootDir>/src/**/*.spec.{js,jsx,ts,tsx}"],
    testPathIgnorePatterns: ["<rootDir>/dist", "<rootDir>/node_modules"],
    transformIgnorePatterns: ["/node_modules/(?!react-native)/.+"],
    transform: {
        "^.+\\.tsx?$": "ts-jest",
        "^.+\\.jsx?$": __dirname + "/transform-native.js"
    },
    coverageDirectory: "<rootDir>/dist/coverage"
};

module.exports = nativeConfig;
