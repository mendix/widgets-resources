const gulp = require("gulp");
const zip = require("gulp-zip");
const path = require("path");
const del = require("del");
const xml2js = require("gulp-xml2js");
const change = require("gulp-change");
const rename = require("gulp-rename");
const git = require("gulp-git");
const rollup = require("rollup");
const rollupConfig = require("./rollup.config");
const typingGenerator = require("mx-widget-typing-generator");

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

function updatePackageVersion(cb) {
    if (process.env.NODE_ENV !== "production") {
        cb();
        return;
    }

    return gulp
        .src("./src/package.xml", { base: "./" })
        .pipe(xml2js())
        .pipe(change(updateVersion))
        .pipe(rename("package.xml"))
        .pipe(gulp.dest("./src"))
        .pipe(git.add());

    function updateVersion(content) {
        content = JSON.parse(content);
        content.package.clientModule[0].$.version = pkg.version;
        const xml2jsLib = require("xml2js");
        const xmlBuilder = new xml2jsLib.Builder({
            renderOpts: { pretty: true, indent: "    " },
            xmldec: { version: "1.0", encoding: "utf-8" }
        });
        return xmlBuilder.buildObject(content);
    }
}

function clean() {
    return del(["./dist"]);
}

function generateTypings() {
    return gulp
        .src(`./src/${pkg.config.widgetName}.xml`)
        .pipe(typingGenerator({ widgetName: pkg.config.widgetName, isNative: true }))
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
        .pipe(gulp.dest("../../packages/test-project/mxproject/widgets"))
        .pipe(gulp.dest(`./dist/release`));
}

function copyToDeployment() {
    return gulp
        .src(["./dist/tmp/widgets/**/*", "!./dist/tmp/widgets/package.xml"])
        .pipe(gulp.dest(`../../packages/test-project/mxproject/deployment/web/widgets`));
}

const build = gulp.series(
    checkDependencies,
    updatePackageVersion,
    clean,
    generateTypings,
    bundle,
    copyXML,
    createMpkFile,
    copyToDeployment
);

function watch() {
    return gulp.watch("./src/**/*", { ignoreInitial: false }, build);
}

exports.default = watch;
exports.watch = watch;
exports.build = build;
