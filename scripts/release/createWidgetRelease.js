const { readdir } = require("fs/promises");
const { join } = require("path");
const { ls } = require("shelljs");
const {
    getUnreleasedChangelogs,
    writeToWidgetChangelogs,
    githubAuthentication,
    createGithubReleaseFrom,
    commitAndCreatePullRequest
} = require("./module-automation/commons");

main().catch(e => {
    console.error(e);
    process.exit(-1);
});

async function main() {
    const widgetScope = process.argv[2];

    if (!widgetScope.endsWith("-web")) {
        throw new Error(`${widgetScope} is not a valid widget package.`);
    }

    const {
        releaseMpkPath,
        repositoryUrl,
        unreleasedChangelogs,
        version,
        widgetName
    } = await getWidgetReleaseInformation(widgetScope);

    if (!unreleasedChangelogs) {
        throw new Error(`No unreleased changes found in the CHANGELOG.md for ${widgetName} ${version}.`);
    }

    console.log("Starting widget release...");
    await githubAuthentication({ url: repositoryUrl });
    console.log("Creating Github release...");
    await createGithubReleaseFrom({
        title: `${widgetName} (Web) - Marketplace Release v${version}`,
        body: JSON.stringify(unreleasedChangelogs),
        tag: `${widgetScope}-v${version}`,
        mpkOutput: releaseMpkPath,
        isDraft: true
    });
    console.log("Updating widget CHANGELOG.md...");
    await writeToWidgetChangelogs(unreleasedChangelogs, { changelogPath, version });
    console.log("Creating pull request for CHANGELOG.md...");
    await commitAndCreatePullRequest({ nameWithDash: widgetScope, version, nameWithSpace: widgetName });
    console.log("Done.");
}

async function getWidgetReleaseInformation(widgetScope) {
    const pluggableWidgetsFolder = join(process.cwd(), "packages/pluggableWidgets");
    const pluggableWidgets = await readdir(pluggableWidgetsFolder);

    if (!pluggableWidgets.includes(widgetScope)) {
        throw new Error(`${widgetScope} is not a valid pluggable widget.`);
    }

    const widgetPath = join(pluggableWidgetsFolder, widgetScope);
    const pkgPath = join(widgetPath, "package.json");
    const { name, widgetName, version, repository } = require(pkgPath);

    console.log(`Getting the widget release information for ${widgetName} widget...`);

    if (!name || !widgetName || !version || !version.includes(".") || !repository?.url) {
        throw new Error(`${pkgPath} does not define expected keys.`);
    }

    if (version.split(".").length !== 3) {
        throw new Error(`${pkgPath} version is not defined correctly.`);
    }

    const mpkFile = ls(join(widgetPath, "dist", "**/*.mpk")).toString();

    if (!mpkFile) {
        throw new Error("MPK file not found");
    }

    console.log(`MPK path: ${mpkFile}`);
    const changelogPath = join(widgetPath, "CHANGELOG.md");

    return {
        releaseMpkPath: mpkFile,
        repositoryUrl: repository.url,
        unreleasedChangelogs: await getUnreleasedChangelogs({ version, changelogPath }),
        version,
        widgetName
    };
}
