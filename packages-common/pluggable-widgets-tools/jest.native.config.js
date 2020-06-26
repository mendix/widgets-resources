const cwd = process.cwd();

const base = require("../../scripts/test/jest.native.config.js");

module.exports = {
    ...base,
    testMatch: [`${cwd}/src/native/**/*.spec.{ts,tsx}`]
};
