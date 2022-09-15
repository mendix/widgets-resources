module.exports = {
    preset: "ts-jest",
    reporters: ["detox/runners/jest/streamlineReporter"],
    rootDir: process.cwd(),
    setupFilesAfterEnv: [`${__dirname}/setup.js`],
    testMatch: ["<rootDir>/e2e/specs/**/*.spec.{js,jsx,ts,tsx}"],
    testPathIgnorePatterns: ["<rootDir>/dist", "<rootDir>/node_modules"],
    testEnvironment: `${__dirname}/environment`,
    testRunner: "jest-circus/runner",
    testTimeout: 300000,
    maxWorkers: 1,
    verbose: true,
    transform: {
        "\\.tsx?$": "ts-jest"
    }
};
