const fs = require("fs");

module.exports.writeVersionFiles = (files, paths) => {
    fs.writeFileSync(paths.pkg, JSON.stringify(files.pkg, null, 4));
    fs.writeFileSync(paths.manifest.js, JSON.stringify(files.manifest.js, null, 4));
    fs.writeFileSync(paths.manifest.ts, JSON.stringify(files.manifest.ts, null, 4));
    fs.writeFileSync(paths.manifest.sass, JSON.stringify(files.manifest.sass, null, 4));
};
