const base = require("./packages/tools/pluggable-widgets-tools/configs/prettier.base.json");

module.exports = {
    ...base,
    plugins: [require.resolve("@prettier/plugin-xml")],
    overrides: [
        {
            files: ["CHANGELOG.md"],
            options: {
                proseWrap: "preserve"
            }
        },
        {
            files: "package.json",
            options: {
                tabWidth: 2
            }
        },
        {
            files: "package-lock.json",
            options: {
                tabWidth: 4,
                useTabs: false
            }
        },
        {
            files: "*.md",
            options: {
                proseWrap: "preserve"
            }
        },
        {
            files: "*.xml",
            options: {
                printWidth: 500
            }
        }
    ]
};
