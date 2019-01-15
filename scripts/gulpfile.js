const gulp = require("gulp");
const zip = require("gulp-zip");
const path = require("path");
const log = require("fancy-log");
const webpack = require("webpack");
const del = require("del");

const pkg = require(path.join(process.cwd(), "package.json"));

function clean() {
    return del(["./dist/" + pkg.version + "/*", "./dist/tmp/**/*"], { force: true });
}

function createMpkFile() {
    return gulp
        .src("./dist/tmp/widgets/**/*")
        .pipe(zip(pkg.config.widgetName + ".mpk"))
        .pipe(gulp.dest("../test-project/mxproject/widgets"))
        .pipe(gulp.dest("./dist/" + pkg.version));
}

function copyToDeployment() {
    return gulp.src("./dist/tmp/widgets/**/*").pipe(gulp.dest(`../test-project/mxproject/deployment/web/widgets`));
}

function runWebpack(config, cb) {
    webpack(config, (err, stats) => {
        if (err) {
            cb(new Error(`Webpack: ${err}`));
        }
        const output = stats.toString({ colors: true, modules: false });
        log(`Webpack output:\n${output}`);
        cb();
    });
}

function bundle(cb) {
    const config = require("./webpack.config");
    runWebpack(config, cb);
}

function productionBundle(cb) {
    const config = require("./webpack.config");
    config.mode = "production";
    runWebpack(config, cb);
}

// Final tasks

const build = gulp.series(clean, bundle, createMpkFile, copyToDeployment);

const productionBuild = gulp.series(clean, productionBundle, createMpkFile, copyToDeployment);

function watch() {
    return gulp.watch("./src/**/*", { ignoreInitial: false }, build);
}

exports.default = watch;
exports.watch = watch;
exports.build = build;
exports.productionBuild = productionBuild;
