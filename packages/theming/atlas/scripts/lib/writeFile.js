const fs = require("fs");

module.exports.writeVersionFiles = (files, paths) => {
    fs.writeFileSync(paths.pkg, JSON.stringify(files.pkg, null, 4));
    fs.writeFileSync(paths.manifest.native, JSON.stringify(files.manifest.native, null, 4));
    fs.writeFileSync(paths.manifest.web, JSON.stringify(files.manifest.web, null, 4));
};
