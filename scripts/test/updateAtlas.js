const { execSync } = require("child_process");
const {
    createWriteStream,
    promises: { access }
} = require("fs");
const { tmpdir } = require("os");
const { join } = require("path");
const { pipeline } = require("stream");
const { promisify } = require("util");
const fetch = require("node-fetch");
const semverCompare = require("semver/functions/rcompare");
const { rm } = require("shelljs");

main().catch(e => {
    console.error(e);
    process.exit(-1);
});

async function main() {
    if (!(await exists("tests/testProject"))) {
        throw new Error("Cannot find a tests/testProject. Did you run the script in the widget folder?");
    }
    try {
        execSync("unzip --help", { stdio: "ignore" });
    } catch (e) {
        throw new Error("This script requires unzip command to be available on the PATH!");
    }
    const atlasArchive = await getLatestAtlasArchive();
    rm("-rf", "tests/testProject/theme");
    execSync(`unzip -o ${atlasArchive} -x '*.mpr' '*.xml' -d tests/testProject`);
}

async function exists(filePath) {
    try {
        await access(filePath);
        return true;
    } catch (e) {
        return false;
    }
}

async function getLatestAtlasArchive() {
    let latestAtlasVersions;
    try {
        const releasesResponse = await fetch("https://api.github.com/repos/mendix/Atlas-UI-Framework/releases");
        const suitableReleases = (await releasesResponse.json()).map(r => r.tag_name).filter(t => t.startsWith("2."));
        suitableReleases.sort(semverCompare);
        latestAtlasVersions = suitableReleases.slice(0, 2);
    } catch (e) {
        throw new Error("Couldn't reach api.github.com. Make sure you are connected to internet.");
    }
    if (!latestAtlasVersions.length) {
        throw new Error("Couldn't retrieve latest Atlas package from api.github.com. Try again later.");
    }

    for (const latestAtlasVersion of latestAtlasVersions) {
        const downloadedArchivePath = join(tmpdir(), `${latestAtlasVersion}.mpk`);

        const appstoreUrl = `https://files.appstore.mendix.com/5/104730/${latestAtlasVersion}/Atlas_UI_Resources_${latestAtlasVersion}.mpk`;
        console.log(`Trying to download Atlas from ${appstoreUrl}`);
        try {
            await promisify(pipeline)((await fetch(appstoreUrl)).body, createWriteStream(downloadedArchivePath));
            return downloadedArchivePath;
        } catch (e) {
            console.log(`Url is not available :(`);
            rm("-f", downloadedArchivePath);
        }
    }

    throw new Error("Cannot find suitable Atlas in appstore.mendix.com. Try again later.");
}
