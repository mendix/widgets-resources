const { readFile } = require("fs").promises;
const { join } = require("path");
const { extractParts } = require("./copyright-utils");

main().catch(e => {
    console.error(e);
    process.exit(1);
});

async function main() {
    const packageJsonPath = join(process.cwd(), "package.json");
    const packageJson = JSON.parse((await readFile(packageJsonPath)).toString());
    const copyright = packageJson.copyright;

    const [firstTextPart, endYear, secondTextPart] = extractParts(copyright);

    if (
        firstTextPart !== "Copyright © 2005-" ||
        endYear !== new Date().getFullYear() ||
        secondTextPart !== " Mendix Technology B.V. All rights reserved."
    ) {
        throw new Error(`[${packageJson.name}] Widget's copyright is not valid.`);
    }
}
