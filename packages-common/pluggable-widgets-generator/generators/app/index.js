const { join } = require("path");
const pkg = require(join(__dirname, "/../../package.json"));
const { access, constants, mkdir, readdir } = require("fs").promises;
const Generator = require("yeoman-generator");

const promptTexts = require("./lib/prompttexts.js");
const text = require("./lib/text.js");
const utils = require("./lib/utils.js");

const widgetSrcFolder = "src/components/";
const templateSourcePaths = {
    webEmptyJs: "pluggable/web/emptyTemplateJs/",
    webFullJs: "pluggable/web/fullTemplateJs/",
    webEmptyTs: "pluggable/web/emptyTemplateTs/",
    webFullTs: "pluggable/web/fullTemplateTs/",
    nativeEmptyJs: "pluggable/native/emptyTemplateJs/",
    nativeFullJs: "pluggable/native/fullTemplateJs/",
    nativeEmptyTs: "pluggable/native/emptyTemplateTs/",
    nativeFullTs: "pluggable/native/fullTemplateTs/"
};

const banner = text.getBanner(pkg);

class MxGenerator extends Generator {
    constructor(args, opts) {
        super(args, opts);

        /**
         * Test if a widget folder was passed by argument and try to create the new folder
         */
        if (args.length > 0) {
            const dir = args.map(arg => arg.replace(/(^|\s)\S/g, l => l.toLowerCase())).join("-");
            const name = args.map(arg => arg.replace(/(^|\s)\S/g, l => l.toUpperCase())).join("");
            if (dir) {
                this.dir = dir;
                this.widgetParamName = name;
            }
        }
    }

    async initializing() {
        this.FINISHED = false;

        if (!this.dir && !(await this._isDirEmpty(this.destinationRoot()))) {
            this.log(banner);
            this.log(text.DIR_NOT_EMPTY_ERROR);
            this.FINISHED = true;
        } else if (this.dir && this._dirExists(this.dir) && !(await this._isDirEmpty(this.dir))) {
            this.log(banner);
            this.log(text.DIR_NOT_EMPTY_ERROR);
            this.FINISHED = true;
        }
    }

    async prompting() {
        if (this.FINISHED) {
            return;
        }

        this.log(banner);

        const dir = await this._findMprFolder();

        const widgetAnswers = await this.prompt(promptTexts.promptWidgetProperties(dir, this.widgetParamName));
        const testAnswers = await this.prompt(promptTexts.promptTestsInfo(widgetAnswers));
        const combinedAnswers = Object.assign(widgetAnswers, testAnswers);

        this.widget = utils.getWidgetDetails(combinedAnswers);
    }

    async _findMprFolder() {
        let dir = null;
        let currentDir = "../";
        let i = 0;
        const currentPath = (this.dir ? join(process.cwd() + "/" + this.dir) : process.cwd()) + "/";
        while (i < 5 && dir === null) {
            const items = await readdir(join(currentPath, currentDir));
            if (items.find(item => item.endsWith(".mpr"))) {
                dir = currentDir;
                break;
            }
            currentDir += "../";
            i++;
        }
        return dir;
    }

    _setTemplateSourcePath() {
        if (this.widget.isPlatformWeb) {
            if (this.widget.isLanguageJS) {
                this.widget.templateSourcePath = this.widget.usesFullTemplate
                    ? templateSourcePaths.webFullJs
                    : templateSourcePaths.webEmptyJs;
            } else {
                this.widget.templateSourcePath = this.widget.usesFullTemplate
                    ? templateSourcePaths.webFullTs
                    : templateSourcePaths.webEmptyTs;
            }
        } else if (this.widget.isPlatformNative) {
            if (this.widget.isLanguageTS) {
                this.widget.templateSourcePath = this.widget.usesFullTemplate
                    ? templateSourcePaths.nativeFullTs
                    : templateSourcePaths.nativeEmptyTs;
            } else {
                this.widget.templateSourcePath = this.widget.usesFullTemplate
                    ? templateSourcePaths.nativeFullJs
                    : templateSourcePaths.nativeEmptyJs;
            }
        }
    }

    _writeUtilityFiles() {
        this._copyFile(this.templatePath("commons/_gitignore"), this.destinationPath(".gitignore"));
        this._copyFile(
            this.templatePath(`commons/eslintrc.${this.widget.isLanguageTS ? "ts" : "js"}.js`),
            this.destinationPath(".eslintrc.js")
        );
        this._copyFile(this.templatePath("commons/prettier.config.js"), this.destinationPath("prettier.config.js"));
        this._copyFile(this.templatePath("commons/.gitattributes"), this.destinationPath(".gitattributes"));

        if (this.widget.license) {
            switch (this.widget.license.toLowerCase()) {
                case "apache-2.0":
                    this._copyTemplate(
                        this.templatePath("licenses/APACHE2"),
                        this.destinationPath("LICENSE"),
                        this.widget
                    );
                    break;
                case "mit":
                    this._copyTemplate(this.templatePath("licenses/MIT"), this.destinationPath("LICENSE"), this.widget);
                    break;
                default:
                    break;
            }
        }
    }

    _copyWidgetFile(src, dest) {
        this._copyTemplate(this.templatePath(src), this.destinationPath(dest), this.widget);
    }

    _writeWidgetFiles() {
        const widgetName = this.widget.name;
        const jsxFileExtension = this.widget.isLanguageTS ? "tsx" : "jsx";

        this._copyWidgetFile("commons/README.md", "README.md");

        // web & native
        if (this.widget.usesEmptyTemplate) {
            this._copyWidgetFile(
                `${this.widget.templateSourcePath}${widgetSrcFolder}HelloWorldSample.${jsxFileExtension}.ejs`,
                `${widgetSrcFolder}HelloWorldSample.${jsxFileExtension}`
            );
            this._copyWidgetFile(
                `${this.widget.templateSourcePath}src/WidgetName.${jsxFileExtension}.ejs`,
                `src/${widgetName}.${jsxFileExtension}`
            );
        } else {
            this._copyWidgetFile(
                `${this.widget.templateSourcePath}${widgetSrcFolder}BadgeSample.${jsxFileExtension}.ejs`,
                `${widgetSrcFolder}BadgeSample.${jsxFileExtension}`
            );
            this._copyWidgetFile(
                `${this.widget.templateSourcePath}src/WidgetName.${jsxFileExtension}.ejs`,
                `src/${widgetName}.${jsxFileExtension}`
            );
        }

        if (this.widget.isPlatformWeb) {
            this._copyWidgetFile(
                `${this.widget.templateSourcePath}src/WidgetName.editorPreview.${jsxFileExtension}.ejs`,
                `src/${widgetName}.editorPreview.${jsxFileExtension}`
            );
            this._copyWidgetFile(`${this.widget.templateSourcePath}src/ui/WidgetName.css`, `src/ui/${widgetName}.css`);

            if (this.widget.usesFullTemplate) {
                this._copyFile(
                    this.templatePath(
                        `${this.widget.templateSourcePath}${widgetSrcFolder}Alert.${jsxFileExtension}.ejs`
                    ),
                    this.destinationPath(`${widgetSrcFolder}Alert.${jsxFileExtension}`)
                );
            }
        } else {
            const fileExtension = this.widget.isLanguageTS ? "ts" : "js";

            if (this.widget.usesFullTemplate) {
                this._copyFile(
                    this.templatePath(`${this.widget.templateSourcePath}src/ui/styles.${fileExtension}`),
                    this.destinationPath(`src/ui/styles.${fileExtension}`)
                );
            }
            this._copyFile(
                this.templatePath(`${this.widget.templateSourcePath}src/utils/common.${fileExtension}`),
                this.destinationPath(`src/utils/common.${fileExtension}`)
            );
        }
    }

    _writePackage() {
        let templatePath;

        if (this.widget.isPlatformWeb) {
            templatePath = `packages/package.${this.widget.isLanguageTS ? "ts" : "js"}.json`;
        } else {
            templatePath = `packages/package_native_${this.widget.isLanguageTS ? "ts" : "js"}.json`;
        }

        this._copyTemplate(this.templatePath(templatePath), this.destinationPath("package.json"), this.widget);
    }

    _writeCompilerOptions() {
        if (this.widget.isLanguageTS) {
            this._copyFile(this.templatePath("commons/tsconfig.json"), this.destinationPath("tsconfig.json"));
        }
    }

    _writeWidgetXML() {
        this._copyTemplate(
            this.templatePath(`${this.widget.templateSourcePath}src/package.xml`),
            this.destinationPath("src/package.xml"),
            Object.assign(this.widget, { packagePathXml: this.widget.packagePath.replace(/\./g, "/") })
        );

        this._copyTemplate(
            this.templatePath(`${this.widget.templateSourcePath}src/WidgetName.xml`),
            this.destinationPath(`src/${this.widget.name}.xml`),
            Object.assign(this.widget, {
                nameCamelCase: this.widget.name.replace(/([a-z0-9])([A-Z])/g, "$1 $2"),
                packagePathXml: this.widget.packagePath.replace(/\//g, ".")
            })
        );
    }

    _copyUnitTests() {
        const extension = this.widget.isLanguageTS ? "tsx" : "jsx";

        if (this.widget.hasUnitTests) {
            if (this.widget.isPlatformWeb) {
                if (this.widget.usesFullTemplate) {
                    this._copyFile(
                        this.templatePath(
                            `${this.widget.templateSourcePath}${widgetSrcFolder}/__tests__/Alert.spec.${extension}.ejs`
                        ),
                        this.destinationPath(`${widgetSrcFolder}/__tests__/Alert.spec.${extension}`)
                    );
                    this._copyWidgetFile(
                        `${this.widget.templateSourcePath}${widgetSrcFolder}/__tests__/BadgeSample.spec.${extension}.ejs`,
                        `${widgetSrcFolder}/__tests__/BadgeSample.spec.${extension}`
                    );
                } else {
                    this._copyFile(
                        this.templatePath(
                            `${this.widget.templateSourcePath}${widgetSrcFolder}/__tests__/HelloWorldSample.spec.${extension}.ejs`
                        ),
                        this.destinationPath(`${widgetSrcFolder}/__tests__/HelloWorldSample.spec.${extension}`)
                    );
                }
            } else {
                if (this.widget.usesFullTemplate) {
                    this._copyFile(
                        this.templatePath(
                            `${this.widget.templateSourcePath}${widgetSrcFolder}/__tests__/BadgeSample.spec.${extension}.ejs`
                        ),
                        this.destinationPath(`${widgetSrcFolder}/__tests__/BadgeSample.spec.${extension}`)
                    );
                } else {
                    this._copyFile(
                        this.templatePath(
                            `${this.widget.templateSourcePath}${widgetSrcFolder}/__tests__/HelloWorldSample.spec.${extension}.ejs`
                        ),
                        this.destinationPath(`${widgetSrcFolder}/__tests__/HelloWorldSample.spec.${extension}`)
                    );
                }
            }
        }
    }

    _copyEndToEndTests() {
        const widgetName = this.widget.name;
        const extension = this.widget.isLanguageTS ? "ts" : "js";

        if (this.widget.hasE2eTests && this.widget.isPlatformWeb) {
            if (this.widget.isLanguageTS) {
                this._copyFile(
                    this.templatePath("typings/WebdriverIO.d.ts"),
                    this.destinationPath("tests/e2e/typings/WebdriverIO.d.ts")
                );
                this._copyFile(
                    this.templatePath(this.widget.templateSourcePath + "tests/e2e/tsconfig.json"),
                    this.destinationPath("tests/e2e/tsconfig.json")
                );
            }

            this._copyWidgetFile(
                `${this.widget.templateSourcePath}tests/e2e/WidgetName.spec.${extension}.ejs`,
                `tests/e2e/${widgetName}.spec.${extension}`
            );

            this._copyFile(
                this.templatePath(`${this.widget.templateSourcePath}tests/e2e/pages/home.page.${extension}.ejs`),
                this.destinationPath(`tests/e2e/pages/home.page.${extension}`)
            );
        }
    }

    async writing() {
        if (this.widget) {
            if (this.dir) {
                if (!this._dirExists(this.dir)) {
                    await mkdir(this.dir);
                }
                this.destinationRoot(this.dir);
            }
            this._setTemplateSourcePath();
            this._writeWidgetXML();
            this._copyUnitTests();
            this._writePackage();
            this._writeCompilerOptions();
            this._writeWidgetFiles();
            this._writeUtilityFiles();
            this._copyEndToEndTests();
        }
    }

    install() {
        if (this.FINISHED) {
            return;
        }
        this.log(text.INSTALL_FINISH_MSG);
        this.npmInstall();
    }

    end() {
        if (this.FINISHED) {
            return;
        }

        if (this._isDirEmpty(this.destinationPath("node_modules"))) {
            this.log(text.END_NPM_NEED_INSTALL_MSG);
        } else {
            this.log(text.END_RUN_BUILD_MSG);
            this.spawnCommandSync("npm", ["run", "lint"]); // eslint-disable-line no-sync
            this.spawnCommandSync("npm", ["run", "build"]); // eslint-disable-line no-sync
        }

        // Remove .yo-rc.json
        try {
            this.fs.delete(this.destinationPath(".yo-rc.json"));
        } catch (e) {
            console.error(e);
        }

        this.log(text.END_SUCCESS);
    }

    _copyFile(source, destination, options = { globOptions: { noext: true } }) {
        if (!options.globOptions) {
            options.globOptions = { noext: true };
        }
        this.fs.copy(source, destination, options);
    }

    _copyTemplate(source, destination, replaceVariable) {
        const options = {
            globOptions: { noext: true }
        };
        this.fs.copyTpl(source, destination, replaceVariable, {}, options);
    }

    async _isDirEmpty(dirname) {
        if (!(await this._dirExists(dirname))) {
            return true;
        }

        return (await readdir(dirname)).length === 0;
    }

    async _dirExists(dirname) {
        try {
            await access(dirname, constants.F_OK);
            return true;
        } catch {
            return false;
        }
    }
}

module.exports = MxGenerator;
