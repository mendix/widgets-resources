const core = require("@actions/core");
const { join } = require("path");

main().catch(e => {
    console.error(e);
    process.exit(-1);
});

async function main() {
    const widgetReleaseInformation = getWidgetReleaseInformation();

    const isGithubRelease = process.argv[2] === "--github-action";

    if (isGithubRelease) {
        for (const [key, value] of Object.entries(widgetReleaseInformation)) {
            core.setOutput(key, value);
        }
    }
    return widgetReleaseInformation;
}

function getWidgetReleaseInformation() {
    const pkgPath = join(process.cwd(), "package.json");
    const { name, widgetName, version, packagePath } = require(pkgPath);

    console.log(`Getting the widget release information for ${widgetName} widget...`);

    if (!name || !widgetName || !version || !version.includes(".")) {
        throw new Error(`${pkgPath} does not define expected keys.`);
    }

    if (version.split(".").length !== 3) {
        throw new Error(`${pkgPath} version is not defined correctly.`);
    }

    const mpkName = packagePath ? `${packagePath}.${widgetName}` : widgetName;
    const releaseMpkPath = join(process.cwd(), "dist", version, `${mpkName}.mpk`);

    return {
        releaseMpkPath,
        version,
        widgetName
    };
}
