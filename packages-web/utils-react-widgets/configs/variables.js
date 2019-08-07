const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const indexOf = args.indexOf("--subprojectPath");
let pathToJoin = "";
if (indexOf > -1 && args.length > indexOf + 1) {
    pathToJoin = args[indexOf + 1];
}
const gruntArg = args.find(a => a.startsWith("--subprojectPath="));
if (gruntArg) {
    pathToJoin = gruntArg.replace("--subprojectPath=", "");
}

const newPath = path.join(__dirname, "../../../", pathToJoin);
const pkg = require(path.join(newPath, "package.json"));

let extension = "tsx";

try {
    if (!fs.existsSync(path.join(newPath, `/src/${pkg.widgetName}.${extension}`))) {
        extension = "ts";
    }
} catch (err) {
    extension = "ts";
}
// const dirCont = fs.readdirSync(path.join(newPath, "/src/"));
// let regex = new RegExp(pkg.widgetName, "gi");
// const files = dirCont.filter(f => f.match(regex))[0].;

module.exports = {
    path: newPath,
    package: pkg,
    extension
};
