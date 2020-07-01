const { join } = require("path");
const { access, readdir } = require("fs").promises;

function getWidgetDetails(answers) {
    return {
        ...answers,
        name: answers.name.replace(/(^|\s)\S/g, l => l.toUpperCase()), // Capitalize first letter if it's not
        packageName: answers.name.toLowerCase(),
        packagePath: answers.organization.trim().toLowerCase(),
        projectPath: answers.projectPath.replace(/\\/g, "\\\\"),
        get isPlatformWeb() {
            return this.platform === "web";
        },
        get isPlatformNative() {
            return this.platform === "native";
        },
        get usesEmptyTemplate() {
            return this.boilerplate === "empty";
        },
        get usesFullTemplate() {
            return this.boilerplate === "full";
        },
        get isLanguageJS() {
            return this.programmingLanguage === "javascript";
        },
        get isLanguageTS() {
            return this.programmingLanguage === "typescript";
        },
        get fileExtension() {
            return this.isLanguageJS ? "js" : "ts";
        },
        get templateSourcePath() {
            return `pluggable/${this.platform}/${this.boilerplate}Template${this.isLanguageJS ? "Js" : "Ts"}/`;
        }
    };
}

async function dirExists(dirname) {
    try {
        await access(dirname);
        return true;
    } catch {
        return false;
    }
}

async function isDirEmpty(dirname) {
    return (await readdir(dirname)).length === 0;
}

async function findMprDir(widgetProjectDir) {
    let mprDir = null;
    let currentDir = "../";
    let i = 0;
    const currentPath = (widgetProjectDir ? join(process.cwd() + "/" + widgetProjectDir) : process.cwd()) + "/";
    while (i < 5 && mprDir === null) {
        const items = await readdir(join(currentPath, currentDir));
        if (items.find(item => item.endsWith(".mpr"))) {
            mprDir = currentDir;
            break;
        }
        currentDir += "../";
        i++;
    }
    return mprDir;
}

module.exports = { getWidgetDetails, dirExists, isDirEmpty, findMprDir };
