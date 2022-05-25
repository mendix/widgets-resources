// function nocache(module) {
//     require("fs").watchFile(require("path").resolve(module), () => {
//         console.log("reolad", module);
//         delete require.cache[require.resolve(module)];
//     });
// }

// nocache("./testmeta");
// nocache("../dist/package-info.js");
// nocache("./repl");

async function main() {
    try {
        const path = require("node:path");
        const input = require("./testmeta");
        const { PackageMeta, getPackageInfo } = require("../dist/package-info.js");
        // const out = await getPackageInfo(path.resolve("../../pluggableWidgets/progress-bar-web"));
        const out = await getPackageInfo(path.resolve("./testpkg"));
        console.log(out);
        return out;
        // return PackageMeta.parse(input);
    } catch (err) {
        if (err.issues) {
            err.issues.forEach(({ path: [prop], message }) => console.log(`${prop}: ${message}`));
        }
        // console.error(err);
        throw err;
    }
}

module.exports = main();
