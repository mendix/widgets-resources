"use strict";

const fs = require("fs");
const path = require("path");
const zip = require("gulp-zip");
const gulp = require("gulp");
const webpack = require("webpack");
const del = require("del");
const gulpSlash = require("gulp-slash");
const eslint = require("gulp-eslint");
const tslint = require("gulp-tslint");
// const livereload = require("gulp-livereload");
// const typingGenerator = require("@mendix/pluggable-widgets-typing-generator");

const cwd = process.cwd();
const variables = require("../configs/variables");
const COLOR = {
    BLACK: "\x1b[30m",
    RED: "\x1b[31m",
    GREEN: "\x1b[32m",
    YELLOW: "\x1b[33m",
    BLUE: "\x1b[34m",
    MAGENTA: "\x1b[35m",
    CYAN: "\x1b[36m",
    WHITE: "\x1b[37m"
};
const END = "\x1b[0m";
console.log("variables.package.config.projectPath", variables.package.config.projectPath);
const projectPath = variables.package.config.projectPath
    ? fixSlashes(checkPath(variables.package.config.projectPath))
    : fixSlashes(path.join(__dirname, `${variables.path}/dist/MxTestProject`));

const widgetsFolder = fixSlashes(path.join(projectPath, "/widgets/"));

function fixSlashes(tmpPath) {
    tmpPath = gulpSlash(tmpPath);
    tmpPath = tmpPath.replace(/\/+/g, "/");
    tmpPath = tmpPath.replace(/\\\\/g, "\\");
    return gulpSlash(tmpPath);
}

function checkPath(newProjectPath) {
    if (newProjectPath.indexOf("../") !== -1 || newProjectPath.indexOf("./") !== -1) {
        return path.join(variables.path, newProjectPath);
    }
    return newProjectPath;
}

function clean() {
    return del(
        [
            fixSlashes(`${variables.path}/dist/${variables.package.version}/*.*`),
            fixSlashes(`${variables.path}/dist/tmp/**/*.*`),
            fixSlashes(`${variables.path}/dist/tsc/**/*.*`),
            fixSlashes(`${variables.path}/dist/testresults/**/*.*`),
            fixSlashes(`${widgetsFolder}/${variables.package.widgetName}.mpk`)
        ],
        { force: true }
    );
}

function createMpkFile() {
    return gulp
        .src(fixSlashes(`${variables.path}/dist/tmp/widgets/**/*`))
        .pipe(zip(`${variables.package.widgetName}.mpk`))
        .pipe(gulp.dest(widgetsFolder))
        .pipe(gulp.dest(fixSlashes(`${variables.path}/dist/${variables.package.version}`)))
        .on("error", handleError);
}

function copyToDeployment() {
    console.log(`${COLOR.GREEN}Files generated in dist and ${projectPath} folder${END}`);
    return (
        gulp
            .src(fixSlashes(`${variables.path}/dist/tmp/widgets/**/*`))
            .pipe(gulp.dest(fixSlashes(`${projectPath}/deployment/web/widgets`)))
            // .pipe(livereload())
            .on("error", handleError)
    );
}

function runLint() {
    console.log(`${COLOR.GREEN}Linting files ${projectPath} folder${END}`);
    return (
        gulp
            .src(fixSlashes(`${variables.path}/dist/tmp/widgets/**/*.ts`))
            // .pipe(eslint("../configs/eslint.json"))
            .pipe(tslint({ configuration: "../config/tslint.json" }))
            // eslint.format() outputs the lint results to the console.
            // Alternatively use eslint.formatEach() (see Docs).
            .pipe(eslint.format())
            // To have the process exit with an error code (1) on
            // lint error, return the stream and pipe to failAfterError last.
            .pipe(eslint.failAfterError())
            .on("error", handleError)
    );
}

function runWebpack(config, cb) {
    try {
        const file = `src/${variables.package.widgetName}.webmodeler.${variables.extension}`;
        const webmodelerFile = path.join(variables.path, file);
        if (!fs.existsSync(webmodelerFile)) {
            config.splice(1, 1);
            console.log(`${COLOR.YELLOW}Preview file ${file} was not found. No preview will be available${END}`);
        }
    } catch (err) {}
    webpack(config, (err, stats) => {
        if (err) {
            handleError(err);
            cb(new Error(`Webpack: ${err}`));
        }
        const output = stats.toString({ colors: true, modules: false });
        console.log(`Webpack output:\n${output}`);
        cb();
    });
}

function bundle(cb) {
    let config = require(path.join(cwd, "../configs/webpack.config.dev"));
    try {
        const pathWebpack = path.join(variables.path, "webpack.config.dev.js");
        if (fs.existsSync(pathWebpack)) {
            config = require(pathWebpack);
            console.log(`${COLOR.MAGENTA}Using custom webpack configuration from ${pathWebpack}${END}`);
        }
    } catch (err) {
        handleError("Wrong configuration found at webpack.config.dev.js. Technical error: " + err.toString());
    }
    runWebpack(config, cb);
}

function productionBundle(cb) {
    let config = require(path.join(cwd, "../configs/webpack.config.prod"));
    try {
        const pathWebpack = path.join(variables.path, "webpack.config.prod.js");
        if (fs.existsSync(pathWebpack)) {
            config = require(pathWebpack);
            console.log(`${COLOR.MAGENTA}Using custom webpack configuration from ${pathWebpack}${END}`);
        }
    } catch (err) {
        handleError("Wrong configuration found at webpack.config.prod.js. Technical error: " + err.toString());
    }
    runWebpack(config, cb);
}

function checkDependencies(cb) {
    require("check-dependencies").sync({
        packageDir: path.join(variables.path, "package.json"),
        scopeList: ["devDependencies"],
        install: true
    });
    cb();
}

// function generateTypings() {
//     return gulp
//         .src(fixSlashes(path.join(variables.path, `/src/package.xml`)))
//         .pipe(typingGenerator())
//         .on("error", handleError);
// }

function handleError(err) {
    console.log(`${COLOR.RED}${err.toString()}${END}`);
    process.exit(-1);
}

const build = gulp.series(clean, checkDependencies, bundle, createMpkFile, copyToDeployment);

const productionBuild = gulp.series(clean, checkDependencies, productionBundle, createMpkFile);
const lint = gulp.series(runLint);

// const buildTs = gulp.series(clean, generateTypings, checkDependencies, bundle, createMpkFile, copyToDeployment);

// const productionBuildTs = gulp.series(clean, generateTypings, checkDependencies, productionBundle, createMpkFile);

function watch() {
    const watchPath = fixSlashes(`${variables.path}/src/**/*`);
    // livereload.listen();
    console.log(`${COLOR.GREEN}Watching files in: ${watchPath}${END}`);
    return gulp.watch(watchPath, { ignoreInitial: false }, build);
}

// function watchTs() {
//     const watchPath = fixSlashes(`${variables.path}/src/**/*`);
//     console.log(`${COLOR.GREEN}Watching files in: ${watchPath}${END}`);
//     return gulp.watch(watchPath, { ignoreInitial: false }, buildTs);
// }

exports.watch = watch;
// exports.watchTs = watchTs;
exports.build = build;
exports.release = productionBuild;
exports.lint = lint;
// exports.buildTs = buildTs;
// exports.releaseTs = productionBuildTs;
