const path = require("path");

module.exports.getVersionFilePaths = () => ({
    pkg: path.join(process.cwd(), "package.json"),
    manifest: {
        js: path.join(process.cwd(), "styles", "native", "core", "manifest.json"),
        sass: path.join(process.cwd(), "styles", "web", "sass", "core", "manifest.json"),
    },
});

module.exports.readVersionFiles = paths => ({
    pkg: require(paths.pkg),
    manifest: {
        js: require(paths.manifest.js),
        sass: require(paths.manifest.sass),
    },
});

