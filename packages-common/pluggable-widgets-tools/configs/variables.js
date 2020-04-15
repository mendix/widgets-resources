const fs = require('fs');
const path = require("path");

const args = process.argv.slice(2);
const indexOf = args.indexOf("--subprojectPath");
let pathToJoin = "";
if(indexOf > -1 && args.length > indexOf+1){
    pathToJoin = args[indexOf+1];
}

const newPath = path.join(__dirname, "../../../../", pathToJoin);
const pkg = require(path.join(newPath, "package.json"));

let extension = "tsx";
let preview = "editorPreview";
let editorConfig = true;

try {
    if(!fs.existsSync(path.join(newPath, `/src/${pkg.widgetName}.${extension}`))){
        extension = "jsx";
    }
} catch(err) {
    extension = "jsx";
}

try {
    if(!fs.existsSync(path.join(newPath, `/src/${pkg.widgetName}.${preview}.${extension}`))){
        preview = "webmodeler";
    }
} catch(err) {
    preview = "webmodeler";
}

try {
    if(!fs.existsSync(path.join(newPath, `/src/${pkg.widgetName}.editorConfig.${extension === "jsx" ? "js" : "ts"}`))){
        editorConfig = false;
    }
} catch(err) {
    editorConfig = false;
}

module.exports = {
    path: newPath,
    package: pkg,
    extension,
    preview,
    editorConfig
};
