module.exports = {
    preset: "ts-jest",
    reporters: ["detox/runners/jest/streamlineReporter"],
    rootDir: process.cwd(),
    setupFilesAfterEnv: [`${__dirname}/jest.detox.startup.js`],
    testMatch: ["<rootDir>/**/e2e/*.spec.{js,jsx,ts,tsx}"],
    testPathIgnorePatterns: ["<rootDir>/dist", "<rootDir>/node_modules"],
    testEnvironment: "node",
    verbose: true,
    globals: {
        "ts-jest": {
            tsconfig: {
                target: "ES2019"
            }
        }
    }
};
