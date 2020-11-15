const { existsSync } = require("fs");
const { join } = require("path");
const typingGenerator = require("../dist/typings-generator");
const colors = require("colors/safe");
const del = require("del");
const gulp = require("gulp");
const zip = require("gulp-zip");
const rollup = require("rollup");
const loadConfigFile = require("rollup/dist/loadConfigFile");

const variables = require("../configs/variables");
const isNative = process.argv.indexOf("--native") !== -1;

function clean() {
    return del(
        [join(variables.sourcePath, "dist", variables.package.version), join(variables.sourcePath, "dist/tmp")],
        { force: true }
    );
}

function createMpkFile() {
    return gulp
        .src(join(variables.sourcePath, "dist/tmp/widgets/**/*"))
        .pipe(zip(`${variables.package.packagePath}.${variables.package.widgetName}.mpk`))
        .pipe(variables.projectPath ? gulp.dest(join(variables.projectPath, "widgets")) : noop())
        .pipe(gulp.dest(join(variables.sourcePath, `dist/${variables.package.version}`)))
        .on("error", handleError);
}

function copyToDeployment() {
    if (variables.projectPath) {
        return gulp
            .src([
                join(variables.sourcePath, "dist/tmp/widgets/**/*"),
                "!" + join(variables.sourcePath, "dist/tmp/widgets/**/package.xml")
            ])
            .pipe(gulp.dest(join(variables.projectPath, `deployment/${isNative ? "native" : "web"}/widgets`)))
            .on("error", handleError)
            .on("finish", () =>
                console.log(colors.green(`Files generated in dist and ${variables.projectPath} folder`))
            );
    } else {
        console.log(colors.yellow("Widget is not copied into project because no Mendix Test Project is available"));
        return noop();
    }
}

function generateTypings() {
    if (!variables.isTypescript || process.env.MX_SKIP_TYPEGENERATOR) {
        return noop();
    }
    return gulp.src(join(variables.sourcePath, "/src/package.xml")).pipe(typingGenerator()).on("error", handleError);
}

function getRollupCodeStep(mode) {
    return function rollupCode(cb) {
        getRollupOptions(mode)
            .then(options =>
                Promise.all(
                    options.map(async optionsObj => {
                        const bundle = await rollup.rollup(optionsObj);
                        await Promise.all(optionsObj.output.map(bundle.write));
                    })
                )
            )
            .then(() => cb(), cb);
    };
}

async function getRollupOptions(mode) {
    let { options } = await loadConfigFile(join(__dirname, "../configs/rollup.config.js"), {
        configPlatform: isNative ? "native" : "web",
        configProduction: mode === "prod"
    });

    const customConfigPath = join(variables.sourcePath, "rollup.config.js");
    if (existsSync(customConfigPath)) {
        const customConfig = await loadConfigFile(customConfigPath, {
            configDefaultConfig: options,
            configProduction: mode === "prod"
        });
        customConfig.warnings.flush();
        options = customConfig.options;
    }

    return options;
}

function handleError(err) {
    console.log(colors.red(err.toString()));
    process.exit(1);
}

function noop() {
    return gulp.src(".", { allowEmpty: true });
}

exports.build = gulp.series(clean, generateTypings, getRollupCodeStep("dev"), createMpkFile, copyToDeployment);
exports.release = gulp.series(clean, generateTypings, getRollupCodeStep("prod"), createMpkFile);
exports.watch = function () {
    console.log(colors.green(`Watching files in: ${variables.sourcePath}/src`));
    clean();
    gulp.watch("src/**/*.xml", { ignoreInitial: false, cwd: variables.sourcePath }, generateTypings);
    getRollupOptions("dev")
        .then(options => rollup.watch(options))
        .catch(handleError);
    gulp.watch(
        "dist/tmp/**/*",
        { ignoreInitial: false, cwd: variables.sourcePath },
        gulp.series(createMpkFile, copyToDeployment)
    );
};
