const deepmerge = require("deepmerge");

const base = require("../pluggable-widgets-tools/configs/eslint.js.base.json");

const config = deepmerge(base, {
    root: true,
    env: {
        node: true
    },
    ignorePatterns: ["generators/app/templates"]
});

module.exports = config;
