const base = require("./packages/tools/pluggable-widgets-tools/configs/prettier.base.json");

module.exports = {
    ...base,
    plugins: [require.resolve("@prettier/plugin-xml")],
    overrides: [
        {
            files: ["CHANGELOG.md", ".travis.yml"],
            options: {
                proseWrap: "preserve"
            }
        },
        {
            files: ["package.json", "package.json"],
            options: {
                tabWidth: 2
            }
        },
        {
            files: "*.md",
            options: {
                proseWrap: "preserve"
            }
        }
    ],
};
