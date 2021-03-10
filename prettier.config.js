const base = require("./packages/tools/pluggable-widgets-tools/configs/prettier.base.json");

module.exports = {
    ...base,
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
    filepath: "**/{src,test}/**/*.{js,jsx,ts,tsx,scss}"
};
