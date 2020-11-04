const deepmerge = require("deepmerge");

const base = require("./packages/tools/pluggable-widgets-tools/configs/eslint.ts.base.json");

delete base.parserOptions.project;

module.exports = deepmerge(base, {
    rules: {
        "@typescript-eslint/ban-ts-ignore": "off",
        "no-unused-expressions": "off",
        "@typescript-eslint/no-unused-expressions": "error",
        "no-undef": "off"
    }
});
