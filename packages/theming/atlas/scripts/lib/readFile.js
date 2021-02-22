const path = require("path");

module.exports.getVersionFilePaths = () => ({
    pkg: path.join(process.cwd(), "package.json"),
    manifest: {
        native: path.join(process.cwd(), "src", "themesource", "atlas_ui_resources", "native", "core", "manifest.json"),
        web: path.join(process.cwd(), "src", "themesource", "atlas_ui_resources", "web", "core", "manifest.json")
    }
});

module.exports.readVersionFiles = paths => ({
    pkg: require(paths.pkg),
    manifest: {
        native: require(paths.manifest.native),
        web: require(paths.manifest.web)
    }
});
