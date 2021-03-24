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
const multiDestZip = require("gulp-multidest");
const multiDestFiles = require("gulp-multi-dest");

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

const projectPaths = getProjectPaths();
console.log("TestProjectsPath: ", projectPaths);

const widgetsFolders = projectPaths.map(p => fixSlashes(path.join(p, "/widgets/")));
function getProjectPaths() {
    if (variables.package.config.projectPath) {
        return Array.isArray(variables.package.config.projectPath)
            ? variables.package.config.projectPath.map(p => fixSlashes(checkPath(p)))
            : [fixSlashes(checkPath(variables.package.config.projectPath))];
    } else if (variables.package.config.testProjects) {
        return variables.package.config.testProjects.map(testProject => fixSlashes(checkPath(testProject.path)));
    }
    return [fixSlashes(`${variables.path}/tests/testProject`)];
}
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
    const mpks = widgetsFolders.map(p => fixSlashes(`${p}/${variables.package.widgetName}.mpk`));
    return del(
        [
            fixSlashes(`${variables.path}/dist/${variables.package.version}/*.*`),
            fixSlashes(`${variables.path}/dist/tmp/**/*.*`),
            fixSlashes(`${variables.path}/dist/tsc/**/*.*`),
            fixSlashes(`${variables.path}/dist/testresults/**/*.*`),
            ...mpks
        ],
        { force: true }
    );
}

function createMpkFile() {
    // console.log("widgetFolder", widgetsFolders);
    return gulp
        .src(fixSlashes(`${variables.path}/dist/tmp/widgets/**/*`))
        .pipe(zip(`${variables.package.widgetName}.mpk`))
        .pipe(multiDestZip(widgetsFolders))
        .pipe(gulp.dest(fixSlashes(`${variables.path}/dist/${variables.package.version}`)))
        .on("error", handleError);
}

function copyToDeployment() {
    console.log(`${COLOR.GREEN}Files generated in dist and ${projectPaths} folder${END}`);
    const dest = projectPaths.map(d => fixSlashes(`${d}/deployment/web/widgets`));
    return gulp
        .src(fixSlashes(`${variables.path}/dist/tmp/widgets/**/*`))
        .pipe(multiDestFiles(dest))
        .on("error", handleError);
}

function runLint() {
    console.log(`${COLOR.GREEN}Linting files ${projectPaths} folder${END}`);
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
        // eslint-disable-next-line no-empty
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

function handleError(err) {
    console.log(`${COLOR.RED}${err.toString()}${END}`);
    process.exit(-1);
}

const build = gulp.series(clean, bundle, createMpkFile, copyToDeployment);

const productionBuild = gulp.series(clean, productionBundle, createMpkFile);
const lint = gulp.series(runLint);

function watch() {
    const watchPath = fixSlashes(`${variables.path}/src/**/*`);
    console.log(`${COLOR.GREEN}Watching files in: ${watchPath}${END}`);
    return gulp.watch(watchPath, { ignoreInitial: false }, build);
}

exports.watch = watch;
exports.build = build;
exports.release = productionBuild;
exports.lint = lint;
