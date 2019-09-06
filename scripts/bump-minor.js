const { getVersionFilePaths, readVersionFiles } = require("./lib/readFile.js");
const { writeVersionFiles } = require("./lib/writeFile.js");

(() => {
    const paths = getVersionFilePaths();
    const files = readVersionFiles(paths);
    const versionNumbers = files.pkg.version.split(".");
    const minorNumber = Number(versionNumbers[1]) + 1;
    const minorVersion = versionNumbers[0] + "." + minorNumber + "." + versionNumbers[2];
    files.pkg.version = files.manifest.js.version = files.manifest.sass.version = minorVersion;
    writeVersionFiles(files, paths);
})();
