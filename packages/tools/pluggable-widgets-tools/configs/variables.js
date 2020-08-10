const { readdirSync } = require("fs");
const { join } = require("path");

const sourcePath = process.cwd();

const package = require(join(sourcePath, "package.json"));
if (!package.widgetName) {
    throw new Error("Widget does not define widgetName in its package.json");
}

const widgetSrcFiles = readdirSync(join(sourcePath, "src")).map(file => join(sourcePath, "src", file));
const widgetEntry = widgetSrcFiles.filter(file =>
    file.match(new RegExp(`[/\\\\]${escape(package.widgetName)}\\.[jt]sx?$`, "i"))
)[0];
if (!widgetEntry) {
    throw new Error("Cannot find a widget entry file");
}

const editorConfigEntry = widgetSrcFiles.filter(file =>
    file.match(new RegExp(`[/\\\\]${escape(package.widgetName)}\\.editorConfig\\.[jt]s$`, "i"))
)[0];
const previewEntry = widgetSrcFiles.filter(file =>
    file.match(new RegExp(`[/\\\\]${escape(package.widgetName)}\\.(webmodeler|editorPreview)\\.[jt]sx?$`, "i"))
)[0];

const isTypescript = [widgetEntry, editorConfigEntry, previewEntry].some(file => file && /\.tsx?$/.test(file));

module.exports = { sourcePath, package, widgetEntry, previewEntry, editorConfigEntry, isTypescript };

function escape(str) {
    return str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
}
