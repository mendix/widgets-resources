const { readFile } = require("fs").promises;
const { promisify } = require("util");
const { join, dirname } = require("path");
const { exec } = require("child_process");
const { parseStringPromise } = require("xml2js");

const execAsync = promisify(exec);

preCommit().catch(error => {
    console.error(error);
    process.exit(1);
});

async function preCommit() {
    const [{ stdout: lernaPackages }, { stdout: stagedFiles }] = await Promise.all([
        execAsync("npx lerna ls --json --all"),
        execAsync("git diff --staged --name-only")
    ]);
    const packages = JSON.parse(lernaPackages.trim());
    const staged = stagedFiles.trim().split("\n");
    const changedWidgetPackages = packages
        .filter(({ location }) => location.match(/(pluggable|custom)Widgets/))
        .filter(({ location }) =>
            staged.some(
                changedFilePath =>
                    dirname(join(process.cwd(), changedFilePath)).includes(location) &&
                    changedFilePath
                        .split("/")
                        .pop()
                        .match(/package\.(json|xml)$/)
            )
        );

    if (changedWidgetPackages.length) {
        const validationPromises = [];

        for (const changedWidgetPackage of changedWidgetPackages) {
            validationPromises.push(
                new Promise(async (resolve, reject) => {
                    const packageXmlAsJson = await parseStringPromise(
                        (await readFile(join(changedWidgetPackage.location, "src", "package.xml"))).toString(),
                        { ignoreAttrs: false }
                    );
                    const packageXmlVersion = packageXmlAsJson.package.clientModule[0].$.version;
                    const packageJson = JSON.parse(
                        (await readFile(join(changedWidgetPackage.location, "package.json"))).toString()
                    );
                    const packageJsonVersion = packageJson.version;
                    const filesMissingVersion = [];

                    if (!packageXmlVersion) filesMissingVersion.push("package.xml");
                    if (!packageJsonVersion) filesMissingVersion.push("package.json");

                    if (filesMissingVersion.length)
                        reject(`[${packageJson.name}] ${filesMissingVersion.join(" and ")} missing version.`);

                    if (packageJsonVersion === packageXmlVersion) resolve();

                    reject(`[${packageJson.name}] package.json and package.xml versions do not match.`);
                })
            );
        }

        const failedResults = await Promise.allSettled(validationPromises).then(results =>
            results.filter(result => result.status === "rejected").map(result => result.reason)
        );

        if (failedResults.length) {
            for (const error of failedResults) {
                console.error(error);
            }

            throw new Error("Widget version validation failed. See above for details.");
        }
    }
}
