const { join } = require("path");
const { access, constants, readdir } = require("fs").promises;

function getWidgetDetails(answers) {
    return Object.defineProperties(answers, {
        name: {
            get() {
                return this.name.replace(/(^|\s)\S/g, l => l.toUpperCase()); // Capitalize first letter if it's not
            }
        },
        packageName: {
            get() {
                return this.name.toLowerCase();
            }
        },
        packagePath: {
            get() {
                return this.organization.trim().toLowerCase();
            }
        },
        projectPath: {
            get() {
                return this.projectPath.replace(/\\/g, "\\\\");
            }
        },
        isPlatformWeb: {
            get() {
                return this.platform === "web";
            }
        },
        isPlatformNative: {
            get() {
                return this.platform === "native";
            }
        },
        usesEmptyTemplate: {
            get() {
                return this.boilerplate === "empty";
            }
        },
        usesFullTemplate: {
            get() {
                return this.boilerplate === "full";
            }
        },
        isLanguageJS: {
            get() {
                return this.programmingLanguage === "javascript";
            }
        },
        isLanguageTS: {
            get() {
                return this.programmingLanguage === "typescript";
            }
        },
        fileExtension: {
            get() {
                return this.isLanguageJS ? "js" : "ts";
            }
        },
        templateSourcePath: {
            get() {
                return `pluggable/${this.platform}/${this.boilerplate}Template${this.isLanguageJS ? "Js" : "Ts"}/`;
            }
        }
    });
}

async function dirExists(dirname) {
    try {
        await access(dirname, constants.F_OK);
        return true;
    } catch {
        return false;
    }
}

async function isDirEmpty(dirname) {
    if (!(await dirExists(dirname))) {
        return true;
    }

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
