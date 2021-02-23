const { readFile, writeFile } = require("fs").promises;
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
    packageJson.copyright = `${firstTextPart}${endYear + 1}${secondTextPart}`;
    await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
}
