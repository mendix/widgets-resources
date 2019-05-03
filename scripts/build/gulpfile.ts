import typingGenerator from "@mendix/pluggable-widgets-typing-generator";
import checkDeps from "check-dependencies";
import del from "del";
import gulp from "gulp";
import change from "gulp-change";
import git from "gulp-git";
import rename from "gulp-rename";
import gulpXml2js from "gulp-xml2js";
import zip from "gulp-zip";
import { join, resolve } from "path";
import { rollup, RollupOutput } from "rollup";
import xml2js from "xml2js";

import { rollupConfig } from "./rollup.config";

const cwd = process.cwd();
const widgetName = process.env.npm_package_config_widgetName!;
const packageName = "com.mendix.widget.native";

function checkDependencies(cb: () => void) {
    checkDeps.sync({
        packageDir: join(cwd, "../../package.json"),
        scopeList: ["devDependencies"],
        install: true
    });
    cb();
}

function updatePackageVersion(cb: () => void) {
    if (process.env.NODE_ENV !== "production") {
        cb();
        return;
    }

    return gulp
        .src("./src/package.xml", { base: "./" })
        .pipe(gulpXml2js())
        .pipe(change(updateVersion))
        .pipe(rename("package.xml"))
        .pipe(gulp.dest("./src"))
        .pipe(git.add());

    function updateVersion(content: string) {
        const parsed = JSON.parse(content);
        parsed.package.clientModule[0].$.version = process.env.npm_package_version;
        const xmlBuilder = new xml2js.Builder({
            renderOpts: { pretty: true, indent: "    " },
            xmldec: { version: "1.0", encoding: "utf-8" }
        });
        return xmlBuilder.buildObject(parsed);
    }
}

function clean() {
    return del(["./dist"]);
}

function generateTypings() {
    return gulp
        .src(`./src/${widgetName}.xml`)
        .pipe(typingGenerator({ widgetName, isNative: true }))
        .pipe(gulp.dest("./typings"));
}

async function bundle(): Promise<RollupOutput> {
    const rollupBuild = await rollup(rollupConfig);
    const outputPath = resolve(cwd, `dist/tmp/widgets/com/mendix/widget/native/${widgetName.toLowerCase()}`);

    return rollupBuild.write({
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
        .pipe(zip(`${packageName}.${widgetName}.mpk`))
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

export { watch, build };
