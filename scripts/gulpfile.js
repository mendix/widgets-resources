const gulp = require("gulp");
const zip = require("gulp-zip");
const path = require("path");
const fs = require("fs");
const del = require("del");
const xml2js = require("gulp-xml2js");
const change = require("gulp-change");
const rename = require("gulp-rename");
const mime = require("mime");
const rollup = require("rollup");
const rollupNodeResolve = require("rollup-plugin-node-resolve");
const rollupTypescript2 = require("rollup-plugin-typescript2");
const rollupBabel = require("rollup-plugin-babel");
const rollupTerser = require("rollup-plugin-terser");
const rollupCommonjs = require("rollup-plugin-commonjs");

const transformXml = require("./GenerateTypings");

const cwd = process.cwd();
const pkg = require(path.join(cwd, "package.json"));

function checkDependencies(cb) {
    require("check-dependencies").sync({
        packageDir: path.join(cwd, "../../package.json"),
        scopeList: ["devDependencies"],
        install: true
    });
    cb();
}

function clean() {
    return del(["./dist/**/*"], { force: true });
}

function generateTypings() {
    return gulp
        .src(`./src/${pkg.config.widgetName}.xml`)
        .pipe(xml2js())
        .pipe(change(content => transformXml(content, pkg.config.widgetName)))
        .pipe(rename(`${pkg.config.widgetName}Props.d.ts`))
        .pipe(gulp.dest("./typings"));
}

async function bundle() {
    const isProduction = process.env.NODE_ENV === "production";
    const input = [path.resolve(cwd, `src/${pkg.config.widgetName}.tsx`)];
    const outputPath = path.resolve(
        cwd,
        `dist/tmp/widgets/com/mendix/widget/native/${pkg.config.widgetName.toLowerCase()}`
    );

    const bundle = await rollup.rollup({
        input,
        external: ["react", "react-dom", "react-native", "react-native-camera", "react-native-maps"],
        preserveModules: true,
        plugins: [
            rollupNodeResolve(),
            rollupTypescript2({ cacheRoot: "./dist/rpt2_cache" }),
            rollupBabel({
                presets: [
                    [
                        "module:metro-react-native-babel-preset",
                        {
                            disableImportExportTransform: true,
                            enableBabelRuntime: false
                        }
                    ]
                ]
            }),
            rollupCommonjs({ include: /node_modules/ }),
            ...(isProduction ? [rollupTerser.terser()] : []),
            fixPreservedModules(),
            /** Replace inlineNativeAssets by copyNativeAssets when the native app supports this */
            inlineNativeAssets()
        ]
    });

    function fixPreservedModules() {
        return {
            name: "fix-preserved-modules",
            renderChunk: code => code.replace(/\.[tj]sx?(["'])/g, "$1"),
            writeBundle: bundle =>
                Promise.all([
                    /**
                     * The output files can still have a .ts(x) extension, even though they were transpiled.
                     * Some helper files even have no extension. Rename these files to the expected .js extension.
                     */
                    ...Object.keys(bundle)
                        .map(filePath => path.join(outputPath, filePath))
                        .filter(fullPath => [".tsx", ".ts", ""].includes(path.extname(fullPath)))
                        .map(fullPath => fs.promises.rename(fullPath, fullPath.replace(/\.tsx?$/, "") + ".js")),
                    /**
                     * When a widget has dependencies, the entry point ends up in a subfolder.
                     * In this case create a new entry point that re-exports the original.
                     */
                    ...input
                        .filter(() => !Object.keys(bundle).includes(pkg.config.widgetName + ".tsx"))
                        .map(filePath => {
                            const relativePathToContent = path.relative(cwd, filePath);
                            const reexportCode = `export * from "./${removeExtension(relativePathToContent)}";`;
                            const outputFile = path.join(outputPath, pkg.config.widgetName + ".js");
                            return fs.promises.writeFile(outputFile, reexportCode, { encoding: "utf8" });
                        })
                ])
        };

        function removeExtension(str) {
            const res = str.split(".");
            if (res.length > 1) {
                res.pop();
            }
            return res.join(".");
        }
    }

    function copyNativeAssets() {
        return {
            name: "copy-native-assets",
            writeBundle: bundle => {
                /**
                 * React Native uses `require` statements for importing static files like images, which are not handled by Rollup.
                 * This plugin reads the statements and copies the corresponding files to the output folder.
                 */
                return Promise.all(
                    Object.values(bundle)
                        .reduce((copyTasks, source) => {
                            const regexp = /require\((?:"|')(.\/.*)(?:"|')\)/g;
                            let match;
                            while ((match = regexp.exec(source.code)) !== null) {
                                const src = path.join(path.dirname(source.facadeModuleId), match[1]);
                                const dest = path.join(outputPath, path.dirname(source.fileName), match[1]);
                                if (!copyTasks.some(task => task.src === src)) {
                                    copyTasks.push({ src, dest });
                                }
                            }
                            return copyTasks;
                        }, [])
                        .map(({ src, dest }) => fs.promises.copyFile(src, dest))
                );
            }
        };
    }

    function inlineNativeAssets() {
        return {
            name: "inline-native-assets",
            writeBundle: bundle => {
                /**
                 * React Native uses `require` statements for importing static files like images, which are not handled by Rollup.
                 * This plugin reads the statements and transforms them into nasty inline data uri's.
                 */
                return Promise.all(
                    Object.values(bundle).map(source => {
                        const regexp = /require\((?:"|')(.\/.*)(?:"|')\)/g;
                        const inlined = source.code.replace(regexp, (match, requirePath) => {
                            const src = path.join(path.dirname(source.facadeModuleId), requirePath);
                            const data = fs.readFileSync(src, { encoding: "base64" });
                            const mimeType = mime.getType(src);
                            return `{ uri: "data:${mimeType};base64,${data}" }`;
                        });
                        const dest = path.join(outputPath, source.fileName.replace(/\.tsx?$/, ".js"));
                        return fs.promises.writeFile(dest, inlined);
                    })
                );
            }
        };
    }

    return bundle.write({
        format: "esm",
        dir: outputPath
    });
}

function copyXML() {
    return gulp.src("./src/**/*.xml").pipe(gulp.dest("./dist/tmp/widgets"));
}

function createMpkFile() {
    return gulp
        .src("./dist/tmp/widgets/**/*")
        .pipe(zip(`${pkg.config.widgetName}.mpk`))
        .pipe(gulp.dest("../test-project/mxproject/widgets"))
        .pipe(gulp.dest(`./dist/${pkg.version}`));
}

function copyToDeployment() {
    return gulp
        .src(["./dist/tmp/widgets/**/*", "!./dist/tmp/widgets/package.xml"])
        .pipe(gulp.dest(`../test-project/mxproject/deployment/web/widgets`));
}

const build = gulp.series(checkDependencies, clean, generateTypings, bundle, copyXML, createMpkFile, copyToDeployment);

function watch() {
    return gulp.watch("./src/**/*", { ignoreInitial: false }, build);
}

exports.default = watch;
exports.watch = watch;
exports.build = build;
