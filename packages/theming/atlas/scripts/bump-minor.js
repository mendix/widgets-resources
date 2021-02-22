const { getVersionFilePaths, readVersionFiles } = require("./lib/readFile.js");
const { writeVersionFiles } = require("./lib/writeFile.js");

(() => {
    const paths = getVersionFilePaths();
    const files = readVersionFiles(paths);
    const versionNumbers = files.pkg.version.split(".");
    const minorNumber = Number(versionNumbers[1]) + 1;
    const minorVersion = versionNumbers[0] + "." + minorNumber + "." + 0;
    files.pkg.version = files.manifest.native.version = files.manifest.web.version = minorVersion;
    writeVersionFiles(files, paths);
})();
