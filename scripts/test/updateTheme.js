const { execSync } = require("child_process");
const {
    createWriteStream,
    promises: { access }
} = require("fs");
const { tmpdir } = require("os");
const { basename, join } = require("path");
const { pipeline } = require("stream");
const { promisify } = require("util");
const fetch = require("node-fetch");
const semverCompare = require("semver/functions/rcompare");
const { mkdir, rm } = require("shelljs");

main().catch(e => {
    console.error(e);
    process.exit(-1);
});

async function main() {
    if (!(await exists("tests/testProject"))) {
        throw new Error("Cannot find a tests/testProject. Did you run the script in the widget folder?");
    }
    try {
        execSync("tar --help", { stdio: "ignore" });
    } catch (e) {
        throw new Error("This script requires GNU tar to be available on the PATH!");
    }

    const atlasTarball = await getLatestAtlasTarball();
    rm("-rf", "tests/testProject/theme");
    mkdir("tests/testProject/theme");
    execSync(`tar xzf ${atlasTarball} -C tests/testProject/theme --strip 1`);
}

async function exists(filePath) {
    try {
        await access(filePath);
        return true;
    } catch (e) {
        return false;
    }
}

async function getLatestAtlasTarball() {
    let latestTarballUrl;
    try {
        const releasesResponse = await fetch("https://api.github.com/repos/mendix/Atlas-UI-Framework/releases");
        const suitableReleases = (await releasesResponse.json()).filter(r => r.tag_name.startsWith("2."));
        suitableReleases.sort((a, b) => semverCompare(a.tag_name, b.tag_name));
        latestTarballUrl = suitableReleases[0]?.tarball_url;
    } catch (e) {
        throw new Error("Couldn't reach api.github.com. Make sure you are connected to internet.");
    }
    if (!latestTarballUrl) {
        throw new Error("Couldn't retrieve latest Atlas package from api.github.com. Try again later.");
    }

    const downloadedTarballPath = join(tmpdir(), basename(latestTarballUrl) + ".tar.gz");
    if (!(await exists(downloadedTarballPath))) {
        console.log(`Downloading latest Atlas from ${latestTarballUrl}...`);
        await promisify(pipeline)((await fetch(latestTarballUrl)).body, createWriteStream(downloadedTarballPath));
    }
    return downloadedTarballPath;
}
