const gulp = require("gulp");
const zip = require("gulp-zip");
const path = require("path");
const log = require("fancy-log");
const webpack = require("webpack");
const del = require("del");
const xml2js = require("gulp-xml2js");
const modifyFile = require("gulp-modify-file");
const rename = require("gulp-rename");
const transformXml = require("./GenerateTypings");

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
    return gulp
        .src(["./dist/tmp/widgets/**/*", "!./dist/tmp/widgets/package.xml"])
        .pipe(gulp.dest(`../test-project/mxproject/deployment/web/widgets`));
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

function checkDependencies(cb) {
    require("check-dependencies").sync({
        packageDir: path.join(process.cwd(), "../../package.json"),
        scopeList: ["devDependencies"],
        install: true
    });
    cb();
}

function generateTypings() {
    return gulp
        .src(`./src/${pkg.config.widgetName}.xml`)
        .pipe(xml2js())
        .pipe(
            modifyFile((content, path, file) => {
                return transformXml(content, pkg.config.widgetName);
            })
        )
        .pipe(rename(`${pkg.config.widgetName}Props.d.ts`))
        .pipe(gulp.dest("./typings"));
}

// Final tasks

const build = gulp.series(clean, generateTypings, checkDependencies, bundle, createMpkFile, copyToDeployment);

const productionBuild = gulp.series(
    clean,
    generateTypings,
    checkDependencies,
    productionBundle,
    createMpkFile,
    copyToDeployment
);

function watch() {
    return gulp.watch("./src/**/*", { ignoreInitial: false }, build);
}

exports.default = watch;
exports.watch = watch;
exports.build = build;
exports.productionBuild = productionBuild;
