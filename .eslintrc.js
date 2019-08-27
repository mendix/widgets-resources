const base = require("@mendix/pluggable-widgets-tools/configs/eslint.ts.base.json");

delete base.parserOptions.project;

module.exports = {
    ...base
};
