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
        this._copyTemplate(`packages/package_${this.widget.platform}.json.ejs`, "package.json");
    }

    _writeWidgetXML() {
        this._copyTemplate(
            `${this.widget.templateSourcePath}src/package.xml.ejs`,
            "src/package.xml",
            Object.assign(this.widget, { packagePathXml: this.widget.packagePath.replace(/\./g, "/") })
        );

        this._copyTemplate(
            `${this.widget.templateSourcePath}src/WidgetName.xml.ejs`,
            `src/${this.widget.name}.xml`,
            Object.assign(this.widget, {
                nameCamelCase: this.widget.name.replace(/([a-z0-9])([A-Z])/g, "$1 $2"),
                packagePathXml: this.widget.packagePath.replace(/\//g, ".")
            })
        );
    }

    _writeWidgetFiles() {
        const fileExtension = `${this.widget.fileExtension}x`;

        this._copyTemplate("commons/README.md.ejs", "README.md");

        // web & native
        if (this.widget.usesEmptyTemplate) {
            this._copyTemplate(
                `${this.widget.templateSourcePath}${widgetSrcFolder}HelloWorldSample.${fileExtension}.ejs`,
                `${widgetSrcFolder}HelloWorldSample.${fileExtension}`
            );
            this._copyTemplate(
                `${this.widget.templateSourcePath}src/WidgetName.${fileExtension}.ejs`,
                `src/${this.widget.name}.${fileExtension}`
            );
        } else {
            this._copyTemplate(
                `${this.widget.templateSourcePath}${widgetSrcFolder}BadgeSample.${fileExtension}.ejs`,
                `${widgetSrcFolder}BadgeSample.${fileExtension}`
            );
            this._copyTemplate(
                `${this.widget.templateSourcePath}src/WidgetName.${fileExtension}.ejs`,
                `src/${this.widget.name}.${fileExtension}`
            );
        }

        if (this.widget.isPlatformWeb) {
            this._copyTemplate(
                `${this.widget.templateSourcePath}src/WidgetName.editorPreview.${fileExtension}.ejs`,
                `src/${this.widget.name}.editorPreview.${fileExtension}`
            );
            this._copyTemplate(
                `${this.widget.templateSourcePath}src/ui/WidgetName.css${this.widget.usesFullTemplate ? ".ejs" : ""}`,
                `src/ui/${this.widget.name}.css`
            );

            if (this.widget.usesFullTemplate) {
                this._copyFile(
                    `${this.widget.templateSourcePath}${widgetSrcFolder}Alert.${fileExtension}.ejs`,
                    `${widgetSrcFolder}Alert.${fileExtension}`
                );
            }
        } else if (this.widget.usesFullTemplate) {
            this._copyFile(
                `${this.widget.templateSourcePath}src/ui/styles.${this.widget.fileExtension}`,
                `src/ui/styles.${this.widget.fileExtension}`
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
                    this._copyTemplate("licenses/APACHE2.ejs", "LICENSE");
                    break;
                case "mit":
                    this._copyTemplate("licenses/MIT.ejs", "LICENSE");
                    break;
                default:
                    break;
            }
        }
    }

    _writeUnitTests() {
        const fileExtension = `${this.widget.fileExtension}x`;

        if (this.widget.hasUnitTests) {
            if (this.widget.isPlatformWeb) {
                if (this.widget.usesFullTemplate) {
                    this._copyFile(
                        `${this.widget.templateSourcePath}${widgetSrcFolder}/__tests__/Alert.spec.${fileExtension}.ejs`,
                        `${widgetSrcFolder}/__tests__/Alert.spec.${fileExtension}`
                    );
                    this._copyTemplate(
                        `${this.widget.templateSourcePath}${widgetSrcFolder}/__tests__/BadgeSample.spec.${fileExtension}.ejs`,
                        `${widgetSrcFolder}/__tests__/BadgeSample.spec.${fileExtension}`
                    );
                } else {
                    this._copyFile(
                        `${this.widget.templateSourcePath}${widgetSrcFolder}/__tests__/HelloWorldSample.spec.${fileExtension}.ejs`,
                        `${widgetSrcFolder}/__tests__/HelloWorldSample.spec.${fileExtension}`
                    );
                }
            } else {
                if (this.widget.usesFullTemplate) {
                    this._copyFile(
                        `${this.widget.templateSourcePath}${widgetSrcFolder}/__tests__/BadgeSample.spec.${fileExtension}.ejs`,
                        `${widgetSrcFolder}/__tests__/BadgeSample.spec.${fileExtension}`
                    );
                } else {
                    this._copyFile(
                        `${this.widget.templateSourcePath}${widgetSrcFolder}/__tests__/HelloWorldSample.spec.${fileExtension}.ejs`,
                        `${widgetSrcFolder}/__tests__/HelloWorldSample.spec.${fileExtension}`
                    );
                }
            }
        }
    }

    _writeEndToEndTests() {
        if (this.widget.hasE2eTests && this.widget.isPlatformWeb) {
            if (this.widget.isLanguageTS) {
                this._copyFile("typings/WebdriverIO.d.ts", "tests/e2e/typings/WebdriverIO.d.ts");
                this._copyFile(`${this.widget.templateSourcePath}tests/e2e/tsconfig.json`, "tests/e2e/tsconfig.json");
            }

            this._copyTemplate(
                `${this.widget.templateSourcePath}tests/e2e/WidgetName.spec.${this.widget.fileExtension}.ejs`,
                `tests/e2e/${this.widget.name}.spec.${this.widget.fileExtension}`
            );

            this._copyFile(
                `${this.widget.templateSourcePath}tests/e2e/pages/home.page.${this.widget.fileExtension}.ejs`,
                `tests/e2e/pages/home.page.${this.widget.fileExtension}`
            );
        }
    }

    _copyFile(source, destination) {
        this.fs.copy(this.templatePath(source), this.destinationPath(destination), { globOptions: { noext: true } });
    }

    _copyTemplate(source, destination, replaceVariable = this.widget) {
        this.fs.copyTpl(
            this.templatePath(source),
            this.destinationPath(destination),
            replaceVariable,
            {},
            { globOptions: { noext: true } }
        );
    }
}

module.exports = MxGenerator;
