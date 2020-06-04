const path = require("path");
const pkg = require(path.join(__dirname, "/../../package.json"));
const fs = require("fs").promises;
const Generator = require("yeoman-generator");

const promptTexts = require("./lib/prompttexts.js");
const text = require("./lib/text.js");

const widgetSrcFolder = "src/components/";
const templates = {
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

        const answers = await this.prompt(promptTexts.promptWidgetProperties(dir, this.widgetParamName));
        const testAnswers = await this.prompt(promptTexts.promptTestsInfo(answers));
        this.props = answers ? Object.assign(answers, testAnswers) : testAnswers;
    }

    async _findMprFolder() {
        let dir = null;
        let currentDir = "../";
        let i = 0;
        const currentPath = (this.dir ? path.join(process.cwd() + "/" + this.dir) : process.cwd()) + "/";
        while (i < 5 && dir === null) {
            const items = await fs.readdir(path.join(currentPath, currentDir));
            if (items.find(item => item.endsWith(".mpr"))) {
                dir = currentDir;
                break;
            }
            currentDir += "../";
            i++;
        }
        return dir;
    }

    _defineProperties() {
        this.widget = {};
        this.widget.widgetName = this.props.widgetName.replace(/(^|\s)\S/g, l => l.toUpperCase()); // Capitalise first letter if its not.
        this.widget.packageName = this.dir ? this.dir.toLowerCase() : this.props.widgetName.toLowerCase();
        this.widget.description = this.props.description;
        this.widget.version = this.props.version;
        this.widget.author = this.props.author;
        this.widget.copyright = this.props.copyright;
        this.widget.license = this.props.license;
        this.widget.e2eTests = this.props.e2eTests;
        this.widget.unitTests = this.props.unitTests;
        this.widget.generatorVersion = pkg.version;
        this.widget.emptyTemplate = this.props.boilerplate === "empty";
        this.widget.fullTemplate = this.props.boilerplate === "full";
        this.widget.projectPath = this.props.projectPath.replace(/\\/g, "\\\\");
        this.widget.packagePath = this.props.organization.trim().toLowerCase();
        this.widget.isJs = this.props.programmingLanguage === "javascript";
        this.widget.isTs = this.props.programmingLanguage === "typescript";
        this.widget.isNative = this.props.platform === "native";
        this.widget.isWeb = this.props.platform === "web";

        if (this.widget.isWeb) {
            if (this.widget.isJs) {
                this.widget.source = this.widget.fullTemplate ? templates.webFullJs : templates.webEmptyJs;
            } else {
                this.widget.source = this.widget.fullTemplate ? templates.webFullTs : templates.webEmptyTs;
            }
        } else if (this.widget.isNative) {
            if (this.widget.isTs) {
                this.widget.source = this.widget.fullTemplate ? templates.nativeFullTs : templates.nativeEmptyTs;
            } else {
                this.widget.source = this.widget.fullTemplate ? templates.nativeFullJs : templates.nativeEmptyJs;
            }
        }
    }

    _writeUtilityFiles() {
        this._copyFile(this.templatePath("commons/_gitignore"), this.destinationPath(".gitignore"));
        this._copyFile(
            this.templatePath(`commons/eslintrc.${this.widget.isTs ? "ts" : "js"}.js`),
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
        this._copyFile(this.templatePath(src), this.destinationPath(dest), {
            process: function(file) {
                let fileText = file.toString();
                fileText = fileText
                    .replace(/WidgetName/g, this.widget.widgetName)
                    .replace(/packageName/g, this.widget.widgetName.toLowerCase())
                    .replace(/WidgetDescription/g, this.widget.description);
                return fileText;
            }.bind(this)
        });
    }

    _writeWidgetFiles() {
        const widgetName = this.widget.widgetName;
        const fileExtension = this.widget.isTs ? "tsx" : "jsx";

        this._copyWidgetFile(`${this.widget.source}README.md`, "README.md");

        // web & native
        if (this.widget.emptyTemplate) {
            this._copyWidgetFile(
                `${this.widget.source}${widgetSrcFolder}HelloWorldSample.${fileExtension}.ejs`,
                `${widgetSrcFolder}HelloWorldSample.${fileExtension}`
            );
            this._copyWidgetFile(
                `${this.widget.source}src/WidgetName.${fileExtension}.ejs`,
                `src/${widgetName}.${fileExtension}`
            );
        } else {
            this._copyWidgetFile(
                `${this.widget.source}${widgetSrcFolder}BadgeSample.${fileExtension}.ejs`,
                `${widgetSrcFolder}BadgeSample.${fileExtension}`
            );
            this._copyWidgetFile(
                `${this.widget.source}src/WidgetName.${fileExtension}.ejs`,
                `src/${widgetName}.${fileExtension}`
            );
        }

        if (this.widget.isWeb) {
            this._copyWidgetFile(
                `${this.widget.source}src/WidgetName.editorPreview.${fileExtension}.ejs`,
                `src/${widgetName}.editorPreview.${fileExtension}`
            );
            this._copyWidgetFile(`${this.widget.source}src/ui/WidgetName.css`, `src/ui/${widgetName}.css`);

            if (this.widget.fullTemplate) {
                this._copyWidgetFile(
                    `${this.widget.source}${widgetSrcFolder}Alert.${fileExtension}.ejs`,
                    `${widgetSrcFolder}Alert.${fileExtension}`
                );
            }
        } else {
            const fileExtension = this.widget.isTs ? "ts" : "js";

            if (this.widget.fullTemplate) {
                this._copyWidgetFile(
                    `${this.widget.source}src/ui/styles.${fileExtension}`,
                    `src/ui/styles.${fileExtension}`
                );
            }
            this._copyWidgetFile(
                `${this.widget.source}src/utils/common.${fileExtension}`,
                `src/utils/common.${fileExtension}`
            );
        }
    }

    _writePackage() {
        const templatePath = undefined;

        if (this.widget.isWeb) {
            templatePath = `packages/package.${this.widget.isTs ? "ts" : "js"}.json`;
        } else {
            templatePath = `packages/package_native_${this.widget.isTs ? "ts" : "js"}.json`;
        }

        this._copyTemplate(this.templatePath(templatePath), this.destinationPath("package.json"), this.widget);
    }

    _writeCompilerOptions() {
        if (this.widget.isTs) {
            this._copyFile(this.templatePath("commons/tsconfig.json"), this.destinationPath("tsconfig.json"));
        }
    }

    _writeWidgetXML() {
        this._copyFile(
            this.templatePath(`${sthis.widget.source}src/package.xml`),
            this.destinationPath("src/package.xml"),
            {
                process: function(file) {
                    let fileText = file.toString();
                    fileText = fileText
                        .replace(/WidgetName/g, this.widget.widgetName)
                        .replace(/packageName/g, this.widget.widgetName.toLowerCase())
                        .replace(/packagePath/g, this.widget.packagePath.replace(/\./g, "/"))
                        .replace(/\{\{version\}\}/g, this.widget.version);
                    return fileText;
                }.bind(this)
            }
        );

        this._copyFile(
            this.templatePath(`${this.widget.source}src/WidgetName.xml`),
            this.destinationPath(`src/${this.widget.widgetName}.xml`),
            {
                process: function(file) {
                    let fileText = file.toString();
                    fileText = fileText
                        .replace(/WidgetNameCamelCase/g, this.widget.widgetName.replace(/([a-z0-9])([A-Z])/g, "$1 $2"))
                        .replace(/WidgetName/g, this.widget.widgetName)
                        .replace(/packageName/g, this.widget.widgetName.toLowerCase())
                        .replace(/packagePath/g, this.widget.packagePath.replace(/\//g, "."))
                        .replace(/WidgetDescription/g, this.widget.description);
                    return fileText;
                }.bind(this)
            }
        );
    }

    _copyUnitTests() {
        const extension = this.widget.isTs ? "tsx" : "jsx";

        if (this.widget.unitTests) {
            if (this.widget.isWeb) {
                if (this.widget.fullTemplate) {
                    this._copyFile(
                        this.templatePath(
                            `${this.widget.source}${widgetSrcFolder}/__tests__/Alert.spec.${extension}.ejs`
                        ),
                        this.destinationPath(`${widgetSrcFolder}/__tests__/Alert.spec.${extension}`)
                    );
                    this._copyWidgetFile(
                        `${this.widget.source}${widgetSrcFolder}/__tests__/BadgeSample.spec.${extension}.ejs`,
                        `${widgetSrcFolder}/__tests__/BadgeSample.spec.${extension}`
                    );
                } else {
                    this._copyFile(
                        this.templatePath(
                            `${this.widget.source}${widgetSrcFolder}/__tests__/HelloWorldSample.spec.${extension}.ejs`
                        ),
                        this.destinationPath(`${widgetSrcFolder}/__tests__/HelloWorldSample.spec.${extension}`)
                    );
                }
            } else {
                if (this.widget.fullTemplate) {
                    this._copyFile(
                        this.templatePath(
                            `${this.widget.source}${widgetSrcFolder}/__tests__/BadgeSample.spec.${extension}.ejs`
                        ),
                        this.destinationPath(`${widgetSrcFolder}/__tests__/BadgeSample.spec.${extension}`)
                    );
                } else {
                    this._copyFile(
                        this.templatePath(
                            `${this.widget.source}${widgetSrcFolder}/__tests__/HelloWorldSample.spec.${extension}.ejs`
                        ),
                        this.destinationPath(`${widgetSrcFolder}/__tests__/HelloWorldSample.spec.${extension}`)
                    );
                }
            }
        }
    }

    _copyEndToEndTests() {
        const widgetName = this.widget.widgetName;
        const extension = this.widget.isTs ? "ts" : "js";

        if (this.widget.e2eTests && this.widget.isWeb) {
            if (this.widget.isTs) {
                this._copyFile(
                    this.templatePath("typings/WebdriverIO.d.ts"),
                    this.destinationPath("tests/e2e/typings/WebdriverIO.d.ts")
                );
                this._copyFile(
                    this.templatePath(this.widget.source + "tests/e2e/tsconfig.json"),
                    this.destinationPath("tests/e2e/tsconfig.json")
                );
            }

            this._copyWidgetFile(
                `${this.widget.source}tests/e2e/WidgetName.spec.${extension}.ejs`,
                `tests/e2e/${widgetName}.spec.${extension}`
            );

            this._copyFile(
                this.templatePath(`${this.widget.source}tests/e2e/pages/home.page.${extension}.ejs`),
                this.destinationPath(`tests/e2e/pages/home.page.${extension}`)
            );
        }
    }

    async writing() {
        if (this.props) {
            if (this.dir) {
                if (!this._dirExists(this.dir)) {
                    await fs.mkdir(this.dir);
                }
                this.destinationRoot(this.dir);
            }
            this._defineProperties();
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

        return (await fs.readdir(dirname)).length === 0;
    }

    async _dirExists(dirname) {
        try {
            await fs.access(dirname, fs.constants.F_OK);
            return true;
        } catch {
            return false;
        }
    }
}

module.exports = MxGenerator;
