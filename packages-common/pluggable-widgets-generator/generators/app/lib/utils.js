function getWidgetDetails(answers) {
    const widget = Object.create(answers);

    Object.defineProperties(widget, {
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
        }
    });

    return widget;
}

module.exports = { getWidgetDetails };
