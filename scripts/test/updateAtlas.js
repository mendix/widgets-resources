const { exec } = require("child_process");
const {
    promises: { access }
} = require("fs");
const { join } = require("path");
const { promisify } = require("util");
const { rm } = require("shelljs");
const rCopy = require("recursive-copy");

main().catch(e => {
    console.error(e);
    process.exit(-1);
});

async function main() {
    if (!(await exists("tests/testProject"))) {
        throw new Error("Cannot find a tests/testProject. Did you run the script in the widget folder?");
    }
    try {
        await promisify(exec)("unzip --help", { stdio: "ignore" });
    } catch (e) {
        throw new Error("This script requires unzip command to be available on the PATH!");
    }

    rm("-rf", "tests/testProject/theme", "tests/testProject/themesource");

    await copyLatestAtlas();
}

async function exists(filePath) {
    try {
        await access(filePath);
        return true;
    } catch (e) {
        return false;
    }
}

async function copyLatestAtlas() {
    const atlasSrc = join(process.cwd(), "../../theming/atlas");

    try {
        await promisify(exec)("npm run release", { cwd: atlasSrc });
    } catch (e) {
        throw new Error(`Failed to create a release distribution of Atlas: ${e}`);
    }

    try {
        await promisify(rCopy)(join(atlasSrc, "dist"), "tests/testProject");
    } catch (e) {
        throw new Error("Failed to copy Atlas release distribution to test/testProject");
    }
}

// === Preserved for future use ===

// async function getLatestAtlasArchive() {
//     let latestAtlasVersions;
//     try {
//         const releasesResponse = await fetch("https://api.github.com/repos/mendix/Atlas-UI-Framework/releases");
//         const suitableReleases = (await releasesResponse.json()).map(r => r.tag_name).filter(t => t.startsWith("2."));
//         suitableReleases.sort(semverCompare);
//         latestAtlasVersions = suitableReleases.slice(0, 2);
//     } catch (e) {
//         throw new Error("Couldn't reach api.github.com. Make sure you are connected to internet.");
//     }
//     if (!latestAtlasVersions.length) {
//         throw new Error("Couldn't retrieve latest Atlas package from api.github.com. Try again later.");
//     }
//
//     for (const latestAtlasVersion of latestAtlasVersions) {
//         const downloadedArchivePath = join(tmpdir(), `${latestAtlasVersion}.mpk`);
//
//         const appstoreUrl = `https://files.appstore.mendix.com/5/104730/${latestAtlasVersion}/Atlas_UI_Resources_${latestAtlasVersion}.mpk`;
//         console.log(`Trying to download Atlas from ${appstoreUrl}`);
//         try {
//             await promisify(pipeline)((await fetch(appstoreUrl)).body, createWriteStream(downloadedArchivePath));
//             return downloadedArchivePath;
//         } catch (e) {
//             console.log(`Url is not available :(`);
//             rm("-f", downloadedArchivePath);
//         }
//     }
//
//     throw new Error("Cannot find suitable Atlas in appstore.mendix.com. Try again later.");
// }
