const path = require("path");

module.exports.getVersionFilePaths = () => ({
    pkg: path.join(process.cwd(), "package.json"),
    manifest: {
        ts: path.join(process.cwd(), "styles", "native", "ts", "core", "manifest.json"),
        js: path.join(process.cwd(), "styles", "native", "js", "core", "manifest.json"),
        sass: path.join(process.cwd(), "styles", "web", "sass", "core", "manifest.json"),
    },
});

module.exports.readVersionFiles = paths => ({
    pkg: require(paths.pkg),
    manifest: {
        ts: require(paths.manifest.ts),
        js: require(paths.manifest.js),
        sass: require(paths.manifest.sass),
    },
});
