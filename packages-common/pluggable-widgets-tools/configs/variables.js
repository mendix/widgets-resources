const { readdirSync } = require("fs");
const { join } = require("path");

const projectPath = process.env.PROJECT_PATH;
if (!projectPath) {
    throw new Error("You must start this script as pluggable-widgets-tools SCRIPT");
}

const package = require(join(projectPath, "package.json"));
if (!package.widgetName) {
    throw new Error("Widget does not define widgetName in its package.json");
}

const widgetSrcFiles = readdirSync(join(projectPath, "src")).map(file => join(projectPath, "src", file));
const widgetEntry = widgetSrcFiles.filter(file => file.match(`/${package.widgetName}\\.[jt]sx?$`))[0];
if (!widgetEntry) {
    throw new Error("Cannot find a widget entry file");
}

const editorConfigEntry = widgetSrcFiles.filter(file =>
    file.match(`/${package.widgetName}\\.editorConfig\\.[jt]s$`)
)[0];
const previewEntry = widgetSrcFiles.filter(file =>
    file.match(`/${package.widgetName}\\.(webmodeler|editorPreview)\\.[jt]sx?$`)
)[0];

module.exports = { projectPath, package, widgetEntry, previewEntry, editorConfigEntry };
