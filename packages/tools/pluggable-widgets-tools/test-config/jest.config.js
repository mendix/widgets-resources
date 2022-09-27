const { join } = require("path");

const projectDir = process.cwd();

module.exports = {
    clearMocks: true,
    rootDir: join(projectDir, "src"),
    setupFilesAfterEnv: [join(__dirname, "test-index.js")],
    snapshotSerializers: ["enzyme-to-json/serializer"],
    testMatch: ["<rootDir>/**/*.spec.{js,jsx,ts,tsx}"],
    testRunner: "jest-jasmine2",
    testEnvironment: "jsdom",
    transform: {
        "\\.tsx?$": [
            "ts-jest",
            {
                tsconfig: { module: "commonjs" }
            }
        ],
        "\\.jsx?$": join(__dirname, "transform.js"),
        "^.+\\.svg$": "jest-transformer-svg"
    },
    moduleNameMapper: {
        "\\.(css|less|scss|sass)$": "identity-obj-proxy",
        "mendix/components/web/Icon": join(__dirname, "__mocks__/WebIcon"),
        "mendix/filters/builders": join(__dirname, "__mocks__/FilterBuilders"),
        "\\.png$": join(__dirname, "assetsTransformer.js")
    },
    collectCoverage: !process.env.CI,
    coverageDirectory: "<rootDir>/../dist/coverage",
    setupFiles: ["jest-canvas-mock"]
};
