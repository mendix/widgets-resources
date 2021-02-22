const { getVersionFilePaths, readVersionFiles } = require("./lib/readFile.js");
const { writeVersionFiles } = require("./lib/writeFile.js");

(() => {
    const paths = getVersionFilePaths();
    const files = readVersionFiles(paths);
    const versionNumbers = files.pkg.version.split(".");
    const patchedNumber = Number(versionNumbers[2]) + 1;
    const patchedVersion = versionNumbers[0] + "." + versionNumbers[1] + "." + patchedNumber;
    files.pkg.version = files.manifest.native.version = files.manifest.web.version = patchedVersion;
    writeVersionFiles(files, paths);
})();
