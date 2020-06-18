const { join } = require("path");
const { access, constants, readdir } = require("fs").promises;

function getWidgetDetails(answers) {
    return Object.defineProperties(answers, {
        name: {
            get() {
                return answers.name.replace(/(^|\s)\S/g, l => l.toUpperCase()); // Capitalize first letter if it's not
            }
        },
        packageName: {
            get() {
                return answers.name.toLowerCase();
            }
        },
        packagePath: {
            get() {
                return answers.organization.trim().toLowerCase();
            }
        },
        projectPath: {
            get() {
                return answers.projectPath.replace(/\\/g, "\\\\");
            }
        },
        isPlatformWeb: {
            get() {
                return answers.platform === "web";
            }
        },
        isPlatformNative: {
            get() {
                return answers.platform === "native";
            }
        },
        usesEmptyTemplate: {
            get() {
                return answers.boilerplate === "empty";
            }
        },
        usesFullTemplate: {
            get() {
                return answers.boilerplate === "full";
            }
        },
        isLanguageJS: {
            get() {
                return answers.programmingLanguage === "javascript";
            }
        },
        isLanguageTS: {
            get() {
                return answers.programmingLanguage === "typescript";
            }
        },
        fileExtension: {
            get() {
                return this.isLanguageJS ? "js" : "ts";
            }
        },
        templateSourcePath: {
            get() {
                return `pluggable/${answers.platform}/${answers.boilerplate}Template${
                    this.isLanguageJS ? "Js" : "Ts"
                }/`;
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
