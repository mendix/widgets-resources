const path = require("path");
const zip = require("gulp-zip");
const fs = require("fs-extra");
const gulp = require("gulp-help")(require("gulp"));
const gutil = require("gulp-util");
const webpack = require("webpack");
const webpackConfig = require("./webpack.config");
const watch = require("gulp-watch");
const sequence = require("gulp-sequence");
const del = require("del");
const merge = require("webpack-merge");
const gulpSlash = require("gulp-slash");
const xml2js = require("gulp-xml2js");
const modifyFile = require("gulp-modify-file");
const rename = require("gulp-rename");
const transformXml = require("./XmlGeneration");

const banner = (color, banner) => gutil.colors[color || "blue"](banner ? `[${banner}]` : "[GULP]");

const pkg = require("./package.json");

const projectPath = pkg.config.projectPath ? gulpSlash(pkg.config.projectPath) : path.join(__dirname, "./dist/MxTestProject");
const widgetsFolder = path.join(projectPath, "/widgets/");

let stat = null;
if (!projectPath) {
    gutil.log(`${banner()} No testproject defined, only copying files to dist/build folder. Set project path in ${gutil.colors.blue("widget.path")} in ${gutil.colors.magenta("package.json")}`);
} else {
    gutil.log(`${banner()} Testproject defined: ${gutil.colors.magenta(projectPath)}`);
    try {
        stat = projectPath ? fs.statSync(projectPath) : null;
    } catch (e) {
        gutil.log(`${banner("red")} Error getting project directory:`, e.toString());
        gutil.log(`${banner("red")} Copying to the project directory has been disabled`);
        stat = null;
    }
}

const webpackConfigRelease = webpackConfig.map(config => merge(config, {
    devtool: false,
    mode: "production",
    optimization: {
        minimize: true
    }
}));

const runWebpack = (type, callback) => {
    webpack(type === "production" ? webpackConfigRelease : webpackConfig, function (err, stats) {
        if (err) throw new gutil.PluginError("webpack", err);
        gutil.log(banner("blue", "WEBPACK"), stats.toString({
            colors: true,
            modules: false
        }));
        callback && callback();
    });
};

gulp.task("watch:src", () => {
    return watch("src/**/*", {
        verbose: true
    }, () => {
        gulp.start("build");
    })
});

gulp.task("compress", function() {
  return gulp
    .src("./dist/tmp/widgets/**/*")
    .pipe(zip(pkg.widgetName + ".mpk"))
    .pipe(gulp.dest(widgetsFolder))
    .pipe(gulp.dest("./dist/" + pkg.version));
});

gulp.task("copyDistDeployment", function() {
    return gulp
        .src("./dist/tmp/widgets/**/*")
        .pipe(gulp.dest(`${pkg.config.projectPath}/deployment/web/widgets`));
});

gulp.task("clean", `Cleanup the dist/build`, () => {
    return del([
        "./dist/" + pkg.version + "/*",
        "./dist/tmp/**/*",
        "./dist/tsc/**/*",
        "./dist/testresults/**/*",
        `${pkg.config.projectPath}/deployment/web/widgets/*`,
        widgetsFolder + "/" + pkg.widgetName + ".mpk"
    ], { force: true });
});

gulp.task("build", "Build the widget", done => {
    sequence("clean", "generate:xml", "check:dependencies", "build:dist", "compress", "copyDistDeployment", done);
});

gulp.task("release", "Release the widget", done => {
    sequence("clean", "generate:xml", "check:dependencies", "build:release", "compress", "copyDistDeployment", done);
});

gulp.task("build:dist", callback => { runWebpack("development", callback); });

gulp.task("build:release", callback => { runWebpack("production", callback); });

gulp.task("check:dependencies", "Checking the dependencies", function() {
    require("check-dependencies").sync({
        packageDir: "package.json",
        scopeList: ["devDependencies"],
        install: true
    });
});

gulp.task("default", sequence(["watch:xml", "build"], "watch:src"));

gulp.task("watch:xml", () => {
    return watch("src/VideoPlayer.xml", {
        verbose: true
    }, () => {
        gulp.start("generate:xml");
    });
});

gulp.task("generate:xml", () => {
    gulp.src(`src/${pkg.widgetName}.xml`)
        .pipe(xml2js())
        .pipe(modifyFile((content, path, file) => {
            return transformXml(content);
        }))
        .pipe(rename(`${pkg.widgetName}Props.d.ts`))
        .pipe(gulp.dest(`./typings`));
});
