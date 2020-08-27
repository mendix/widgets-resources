const Generator = require("yeoman-generator");
const { join } = require("path");

const { promptWidgetProperties, promptTestsInfo } = require("./lib/prompttexts.js");
const { getWidgetDetails, dirExists, isDirEmpty, findMprDir } = require("./lib/utils.js");
const text = require("./lib/text.js");

const widgetSrcFolder = "src/components/";

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
        const fullDestinationPath = this.dir ? join(this.destinationPath(), this.dir) : this.destinationPath();

        if ((await dirExists(fullDestinationPath)) && !(await isDirEmpty(fullDestinationPath))) {
            this.log(text.BANNER);
            this.env.error(Error(text.DIR_NOT_EMPTY_ERROR));
        }
    }

    async prompting() {
        this.log(text.BANNER);

        const mprDir = await findMprDir(this.dir);

        const widgetAnswers = await this.prompt(promptWidgetProperties(mprDir, this.widgetParamName));
        const testAnswers = await this.prompt(promptTestsInfo(widgetAnswers));
        const combinedAnswers = Object.assign(widgetAnswers, testAnswers);

        this.widget = getWidgetDetails(combinedAnswers);
    }

    writing() {
        if (this.dir) {
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
        this.log(text.INSTALL_FINISH_MSG);
        this.npmInstall();
    }

    async end() {
        if (
            !(await dirExists(this.destinationPath("node_modules"))) ||
            (await isDirEmpty(this.destinationPath("node_modules")))
        ) {
            this.log(text.END_NPM_NEED_INSTALL_MSG);
        } else {
            this.log(text.END_RUN_BUILD_MSG);
            this.spawnCommandSync("npm", ["run", "lint:fix"]); // eslint-disable-line no-sync
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

        const tempSampleSuffix = this.widget.isPlatformWeb ? "Sample" : "";

        // web & native
        if (this.widget.usesEmptyTemplate) {
            this._copyTemplate(
                `${this.widget.templateSourcePath}${widgetSrcFolder}HelloWorld${tempSampleSuffix}.${fileExtension}.ejs`,
                `${widgetSrcFolder}HelloWorld${tempSampleSuffix}.${fileExtension}`
            );
            this._copyTemplate(
                `${this.widget.templateSourcePath}src/WidgetName.${fileExtension}.ejs`,
                `src/${this.widget.name}.${fileExtension}`
            );
        } else {
            this._copyTemplate(
                `${this.widget.templateSourcePath}${widgetSrcFolder}Badge${tempSampleSuffix}.${fileExtension}.ejs`,
                `${widgetSrcFolder}Badge${tempSampleSuffix}.${fileExtension}`
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
        this._copyTemplate("commons/_gitignore", ".gitignore");
        this._copyFile(`commons/eslintrc.${this.widget.isLanguageTS ? "ts" : "js"}.js`, ".eslintrc.js");
        this._copyFile("commons/prettier.config.js", "prettier.config.js");
        this._copyTemplate("commons/.prettierignore", ".prettierignore");
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
                        `${this.widget.templateSourcePath}${widgetSrcFolder}/__tests__/Badge.spec.${fileExtension}.ejs`,
                        `${widgetSrcFolder}/__tests__/Badge.spec.${fileExtension}`
                    );
                } else {
                    this._copyFile(
                        `${this.widget.templateSourcePath}${widgetSrcFolder}/__tests__/HelloWorld.spec.${fileExtension}.ejs`,
                        `${widgetSrcFolder}/__tests__/HelloWorld.spec.${fileExtension}`
                    );
                }
            }
        }
    }

    _writeEndToEndTests() {
        if (this.widget.hasE2eTests && this.widget.isPlatformWeb) {
            if (this.widget.isLanguageTS) {
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
