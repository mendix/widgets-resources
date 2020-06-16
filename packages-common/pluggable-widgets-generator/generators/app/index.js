const { join } = require("path");
const pkg = require(join(__dirname, "/../../package.json"));
const { mkdir } = require("fs").promises;
const Generator = require("yeoman-generator");

const promptTexts = require("./lib/prompttexts.js");
const text = require("./lib/text.js");
const utils = require("./lib/utils.js");

const widgetSrcFolder = "src/components/";

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

        if (!this.dir && !(await utils.isDirEmpty(this.destinationRoot()))) {
            this.log(banner);
            this.log(text.DIR_NOT_EMPTY_ERROR);
            this.FINISHED = true;
        } else if (this.dir && utils.dirExists(this.dir) && !(await utils.isDirEmpty(this.dir))) {
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

        const dir = await utils.findMprDir(this.dir);

        const widgetAnswers = await this.prompt(promptTexts.promptWidgetProperties(dir, this.widgetParamName));
        const testAnswers = await this.prompt(promptTexts.promptTestsInfo(widgetAnswers));
        const combinedAnswers = Object.assign(widgetAnswers, testAnswers);

        this.widget = utils.getWidgetDetails(combinedAnswers);
    }

    async writing() {
        if (this.dir) {
            if (!utils.dirExists(this.dir)) {
                await mkdir(this.dir);
            }
            this.destinationRoot(this.dir);
        }
        this._writePackage();
        this._writeWidgetXML();
        this._writeWidgetFiles();
        this._writeCompilerOptions();
        this._writeUtilityFiles();
        this._writeUnitTests();
        this._writeEndToEndTests();
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

        if (utils.isDirEmpty(this.destinationPath("node_modules"))) {
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

    _writePackage() {
        this._copyTemplate(`packages/package_${this.widget.platform}.json`, "package.json");
    }

    _writeWidgetXML() {
        this._copyTemplate(
            `${this.widget.templateSourcePath}src/package.xml`,
            "src/package.xml",
            Object.assign(this.widget, { packagePathXml: this.widget.packagePath.replace(/\./g, "/") })
        );

        this._copyTemplate(
            `${this.widget.templateSourcePath}src/WidgetName.xml`,
            `src/${this.widget.name}.xml`,
            Object.assign(this.widget, {
                nameCamelCase: this.widget.name.replace(/([a-z0-9])([A-Z])/g, "$1 $2"),
                packagePathXml: this.widget.packagePath.replace(/\//g, ".")
            })
        );
    }

    _writeWidgetFiles() {
        const widgetName = this.widget.name;
        const jsxFileExtension = this.widget.isLanguageTS ? "tsx" : "jsx";

        this._copyTemplate("commons/README.md", "README.md");

        // web & native
        if (this.widget.usesEmptyTemplate) {
            this._copyTemplate(
                `${this.widget.templateSourcePath}${widgetSrcFolder}HelloWorldSample.${jsxFileExtension}.ejs`,
                `${widgetSrcFolder}HelloWorldSample.${jsxFileExtension}`
            );
            this._copyTemplate(
                `${this.widget.templateSourcePath}src/WidgetName.${jsxFileExtension}.ejs`,
                `src/${widgetName}.${jsxFileExtension}`
            );
        } else {
            this._copyTemplate(
                `${this.widget.templateSourcePath}${widgetSrcFolder}BadgeSample.${jsxFileExtension}.ejs`,
                `${widgetSrcFolder}BadgeSample.${jsxFileExtension}`
            );
            this._copyTemplate(
                `${this.widget.templateSourcePath}src/WidgetName.${jsxFileExtension}.ejs`,
                `src/${widgetName}.${jsxFileExtension}`
            );
        }

        if (this.widget.isPlatformWeb) {
            this._copyTemplate(
                `${this.widget.templateSourcePath}src/WidgetName.editorPreview.${jsxFileExtension}.ejs`,
                `src/${widgetName}.editorPreview.${jsxFileExtension}`
            );
            this._copyTemplate(`${this.widget.templateSourcePath}src/ui/WidgetName.css`, `src/ui/${widgetName}.css`);

            if (this.widget.usesFullTemplate) {
                this._copyFile(
                    `${this.widget.templateSourcePath}${widgetSrcFolder}Alert.${jsxFileExtension}.ejs`,
                    `${widgetSrcFolder}Alert.${jsxFileExtension}`
                );
            }
        } else {
            const fileExtension = this.widget.isLanguageTS ? "ts" : "js";

            if (this.widget.usesFullTemplate) {
                this._copyFile(
                    `${this.widget.templateSourcePath}src/ui/styles.${fileExtension}`,
                    `src/ui/styles.${fileExtension}`
                );
            }
            this._copyFile(
                `${this.widget.templateSourcePath}src/utils/common.${fileExtension}`,
                `src/utils/common.${fileExtension}`
            );
        }
    }

    _writeCompilerOptions() {
        if (this.widget.isLanguageTS) {
            this._copyFile("commons/tsconfig.json", "tsconfig.json");
        }
    }

    _writeUtilityFiles() {
        this._copyFile("commons/_gitignore", ".gitignore");
        this._copyFile(`commons/eslintrc.${this.widget.isLanguageTS ? "ts" : "js"}.js`, ".eslintrc.js");
        this._copyFile("commons/prettier.config.js", "prettier.config.js");
        this._copyFile("commons/.gitattributes", ".gitattributes");

        if (this.widget.license) {
            switch (this.widget.license.toLowerCase()) {
                case "apache-2.0":
                    this._copyTemplate("licenses/APACHE2", "LICENSE");
                    break;
                case "mit":
                    this._copyTemplate("licenses/MIT", "LICENSE");
                    break;
                default:
                    break;
            }
        }
    }

    _writeUnitTests() {
        const extension = this.widget.isLanguageTS ? "tsx" : "jsx";

        if (this.widget.hasUnitTests) {
            if (this.widget.isPlatformWeb) {
                if (this.widget.usesFullTemplate) {
                    this._copyFile(
                        `${this.widget.templateSourcePath}${widgetSrcFolder}/__tests__/Alert.spec.${extension}.ejs`,
                        `${widgetSrcFolder}/__tests__/Alert.spec.${extension}`
                    );
                    this._copyTemplate(
                        `${this.widget.templateSourcePath}${widgetSrcFolder}/__tests__/BadgeSample.spec.${extension}.ejs`,
                        `${widgetSrcFolder}/__tests__/BadgeSample.spec.${extension}`
                    );
                } else {
                    this._copyFile(
                        `${this.widget.templateSourcePath}${widgetSrcFolder}/__tests__/HelloWorldSample.spec.${extension}.ejs`,
                        `${widgetSrcFolder}/__tests__/HelloWorldSample.spec.${extension}`
                    );
                }
            } else {
                if (this.widget.usesFullTemplate) {
                    this._copyFile(
                        `${this.widget.templateSourcePath}${widgetSrcFolder}/__tests__/BadgeSample.spec.${extension}.ejs`,
                        `${widgetSrcFolder}/__tests__/BadgeSample.spec.${extension}`
                    );
                } else {
                    this._copyFile(
                        `${this.widget.templateSourcePath}${widgetSrcFolder}/__tests__/HelloWorldSample.spec.${extension}.ejs`,
                        `${widgetSrcFolder}/__tests__/HelloWorldSample.spec.${extension}`
                    );
                }
            }
        }
    }

    _writeEndToEndTests() {
        const widgetName = this.widget.name;
        const extension = this.widget.isLanguageTS ? "ts" : "js";

        if (this.widget.hasE2eTests && this.widget.isPlatformWeb) {
            if (this.widget.isLanguageTS) {
                this._copyFile("typings/WebdriverIO.d.ts", "tests/e2e/typings/WebdriverIO.d.ts");
                this._copyFile(this.widget.templateSourcePath + "tests/e2e/tsconfig.json", "tests/e2e/tsconfig.json");
            }

            this._copyTemplate(
                `${this.widget.templateSourcePath}tests/e2e/WidgetName.spec.${extension}.ejs`,
                `tests/e2e/${widgetName}.spec.${extension}`
            );

            this._copyFile(
                `${this.widget.templateSourcePath}tests/e2e/pages/home.page.${extension}.ejs`,
                `tests/e2e/pages/home.page.${extension}`
            );
        }
    }

    _copyFile(source, destination, options = { globOptions: { noext: true } }) {
        if (!options.globOptions) {
            options.globOptions = { noext: true };
        }
        this.fs.copy(this.templatePath(source), this.destinationPath(destination), options);
    }

    _copyTemplate(source, destination, replaceVariable = this.widget) {
        const options = {
            globOptions: { noext: true }
        };
        this.fs.copyTpl(this.templatePath(source), this.destinationPath(destination), replaceVariable, {}, options);
    }
}

module.exports = MxGenerator;
