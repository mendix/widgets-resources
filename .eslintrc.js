const base = require("@mendix/pluggable-widgets-tools/configs/eslint.ts.base.json");

base.parserOptions.project = "./tsconfig.json";

module.exports = {
    ...base
};
