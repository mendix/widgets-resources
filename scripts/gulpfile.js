const gulp = require("gulp");
const zip = require("gulp-zip");
const path = require("path");
const del = require("del");
const xml2js = require("gulp-xml2js");
const change = require("gulp-change");
const rename = require("gulp-rename");
const rollup = require("rollup");
const rollupConfig = require("./rollup.config");
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
    return del(["./dist/**/*.*"], { force: true });
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
    const bundle = await rollup.rollup(rollupConfig);
    const outputPath = path.resolve(
        cwd,
        `dist/tmp/widgets/com/mendix/widget/native/${pkg.config.widgetName.toLowerCase()}`
    );

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
