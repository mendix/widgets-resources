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
        "mendix/filters/builders": join(__dirname, "__mocks__/FilterBuilders"),
        "\\.png$": join(__dirname, "assetsTransformer.js")
    },
    collectCoverage: !process.env.CI,
    coverageDirectory: "<rootDir>/../dist/coverage"
};
