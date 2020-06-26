const cwd = process.cwd();

const base = require("../../scripts/test/jest.web.config.js");

module.exports = {
    ...base,
    testMatch: [`${cwd}/src/web/**/?(*.)(spec|test).[jt]s?(x)`]
};
