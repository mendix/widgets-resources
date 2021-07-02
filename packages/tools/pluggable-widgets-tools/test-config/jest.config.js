const { join } = require("path");

const projectDir = process.cwd();

module.exports = {
    clearMocks: true,
    rootDir: join(projectDir, "src"),
    globals: {
        "ts-jest": {
            tsconfig: { module: "commonjs" }
        }
    },
    setupFilesAfterEnv: [join(__dirname, "test-index.js")],
    snapshotSerializers: ["enzyme-to-json/serializer"],
    testMatch: ["<rootDir>/**/*.spec.{js,jsx,ts,tsx}"],
    transform: {
        "\\.tsx?$": "ts-jest",
        "\\.jsx?$": join(__dirname, "transform.js"),
        "^.+\\.svg$": "jest-svg-transformer"
    },
    moduleNameMapper: {
        "\\.(css|less|scss|sass)$": "identity-obj-proxy",
        "mendix/components/web/Icon": join(__dirname, "__mocks__/WebIcon"),
        "\\.png$": join(__dirname, "assetsTransformer.js")
    },
    collectCoverage: true,
    coverageDirectory: "<rootDir>/../dist/coverage"
};
