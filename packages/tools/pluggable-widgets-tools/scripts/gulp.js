const { existsSync, readdirSync } = require("fs");
const { join, normalize } = require("path");
const typingGenerator = require("../dist/typings-generator");
const colors = require("colors/safe");
const del = require("del");
const gulp = require("gulp");
const zip = require("gulp-zip");
const webpack = require("webpack");

let webpackCompiler;

const variables = require("../configs/variables");

require("dotenv").config({ path: join(variables.sourcePath, ".env") });

const projectPath = normalize(
    process.env.MX_PROJECT_PATH ||
        variables.package.config.projectPath ||
        join(variables.sourcePath, "tests/testProject")
);
const widgetsFolder = join(projectPath, "widgets");
const isNative = process.argv.indexOf("--native") !== -1;

function clean() {
    return del(
        [
            join(variables.sourcePath, "dist", variables.package.version),
            join(variables.sourcePath, "dist/tmp"),
            join(widgetsFolder, `${variables.package.packagePath}.${variables.package.widgetName}.mpk`)
        ],
        { force: true }
    );
}

function createMpkFile() {
    return gulp
        .src(join(variables.sourcePath, "dist/tmp/widgets/**/*"))
        .pipe(zip(`${variables.package.packagePath}.${variables.package.widgetName}.mpk`))
        .pipe(gulp.dest(widgetsFolder))
        .pipe(gulp.dest(join(variables.sourcePath, `dist/${variables.package.version}`)))
        .on("error", handleError);
}

function copyToDeployment() {
    if (existsSync(projectPath) && readdirSync(projectPath).length > 0) {
        return gulp
            .src([
                join(variables.sourcePath, "dist/tmp/widgets/**/*"),
                "!" + join(variables.sourcePath, "dist/tmp/widgets/**/package.xml")
            ])
            .pipe(gulp.dest(join(projectPath, `deployment/${isNative ? "native" : "web"}/widgets`)))
            .on("error", handleError)
            .on("finish", () => console.log(colors.green(`Files generated in dist and ${projectPath} folder`)));
    } else {
        console.log(
            colors.yellow(
                `Widget is not copied into project because no Mendix Test Project is available in ${projectPath}`
            )
        );
    }
}

function runWebpack(env, cb) {
    let config;

    if (isNative) {
        config = require("../configs/webpack.native.config");
        if (env === "prod") {
            config = config.map(c => ({ ...c, mode: "production", devtool: false }));
        }
    } else {
        config = require(`../configs/webpack.config.${env}`);
    }

    try {
        const customWebpackConfigPath = join(variables.sourcePath, `webpack.config.${env}.js`);
        if (existsSync(customWebpackConfigPath)) {
            config = require(customWebpackConfigPath);
            console.log(colors.magenta(`Using custom webpack configuration from ${customWebpackConfigPath}`));
        }
    } catch (err) {
        handleError(`Wrong configuration found at webpack.config.${env}.js. Technical error: ${err.toString()}`);
    }

    if (!variables.editorConfigEntry) {
        config.splice(-1, 1);
    }
    if (!isNative) {
        if (!variables.previewEntry) {
            config.splice(1, 1);
            console.log(colors.yellow("Preview file was not found. No preview will be available"));
        } else if (variables.previewEntry.indexOf(".webmodeler.") !== -1) {
            console.log(
                colors.yellow(
                    `Preview file ${variables.previewEntry} uses old name 'webmodeler', it should be renamed to 'editorPreview' to keep compatibility with future versions of Studio/Studio Pro`
                )
            );
        }
    }

    if (!webpackCompiler) {
        webpackCompiler = webpack(config);
    }

    webpackCompiler.run((err, stats) => {
        if (err) {
            handleError(err);
            cb(new Error(`Webpack: ${err}`));
        }
        const output = stats.toString({ colors: true, modules: false });
        console.log(`Webpack output:\n${output}`);
        cb();
    });
}

function generateTypings() {
    if (!variables.isTypescript || process.env.MX_SKIP_TYPEGENERATOR) {
        return gulp.src(".", { allowEmpty: true });
    }
    return gulp
        .src(join(variables.sourcePath, "/src/package.xml"))
        .pipe(typingGenerator())
        .on("error", handleError);
}

function handleError(err) {
    console.log(colors.red(err.toString()));
    process.exit(1);
}

exports.build = gulp.series(clean, generateTypings, runWebpack.bind(null, "dev"), createMpkFile, copyToDeployment);
exports.release = gulp.series(clean, generateTypings, runWebpack.bind(null, "prod"), createMpkFile);
exports.watch = function() {
    console.log(colors.green(`Watching files in: ${variables.sourcePath}/src`));
    return gulp.watch("src/**/*", { ignoreInitial: false, cwd: variables.sourcePath }, exports.build);
};
