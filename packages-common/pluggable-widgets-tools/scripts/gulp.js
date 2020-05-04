const { existsSync, readdirSync } = require("fs");
const { join, normalize } = require("path");
const typingGenerator = require("@mendix/pluggable-widgets-typing-generator");
const del = require("del");
const gulp = require("gulp");
const zip = require("gulp-zip");
const webpack = require("webpack");

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

require("dotenv").config({ path: join(variables.projectPath, ".env") });

const projectPath = normalize(
    process.env.MX_PROJECT_PATH ||
        variables.package.config.projectPath ||
        join(variables.projectPath, "dist/MxTestProject")
);

const widgetsFolder = join(projectPath, "widgets");

function clean() {
    return del(
        [
            join(variables.projectPath, "dist"),
            join(widgetsFolder, `${variables.package.packagePath}.${variables.package.widgetName}.mpk`)
        ],
        { force: true }
    );
}

function createMpkFile() {
    return gulp
        .src(join(variables.projectPath, "dist/tmp/widgets/**/*"))
        .pipe(zip(`${variables.package.packagePath}.${variables.package.widgetName}.mpk`))
        .pipe(gulp.dest(widgetsFolder))
        .pipe(gulp.dest(join(variables.projectPath, `dist/${variables.package.version}`)))
        .on("error", handleError);
}

function copyToDeployment() {
    if (existsSync(projectPath) && readdirSync(projectPath).length > 0) {
        console.log(`${COLOR.GREEN}Files generated in dist and ${projectPath} folder${END}`);
        return gulp
            .src([
                join(variables.projectPath, "dist/tmp/widgets/**/*"),
                "!" + join(variables.projectPath, "dist/tmp/widgets/**/package.xml")
            ])
            .pipe(gulp.dest(join(projectPath, "deployment/web/widgets")))
            .on("error", handleError);
    } else {
        console.log(
            `${COLOR.YELLOW}Widget is not copied into project because no Mendix Test Project available in ${projectPath}${END}`
        );
    }
}

function runWebpack(env, cb) {
    let config = require(join(__dirname, `../configs/webpack.config.${env}`));
    try {
        const customWebpackConfigPath = join(variables.projectPath, `webpack.config.${env}.js`);
        if (existsSync(customWebpackConfigPath)) {
            config = require(customWebpackConfigPath);
            console.log(`${COLOR.MAGENTA}Using custom webpack configuration from ${customWebpackConfigPath}${END}`);
        }
    } catch (err) {
        handleError(`Wrong configuration found at webpack.config.${env}.js. Technical error: ${err.toString()}`);
    }

    if (!variables.editorConfigEntry) {
        config.splice(2, 1);
    }
    if (!variables.previewEntry) {
        config.splice(1, 1);
        console.log(`${COLOR.YELLOW}Preview file ${file} was not found. No preview will be available${END}`);
    } else if (variables.previewEntry.indexOf(".webmodeler.") !== -1) {
        console.log(
            `${COLOR.YELLOW}Preview file ${variables.previewEntry} uses old name 'webmodeler', it should be renamed to 'editorPreview' to keep compatibility with future versions of Studio/Studio Pro${END}`
        );
    }

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

function generateTypings() {
    return gulp
        .src(join(variables.projectPath, "/src/package.xml"))
        .pipe(typingGenerator())
        .on("error", handleError);
}

function handleError(err) {
    console.log(`${COLOR.RED}${err.toString()}${END}`);
    process.exit(1);
}

const build = gulp.series(clean, runWebpack.bind(null, "dev"), createMpkFile, copyToDeployment);

const productionBuild = gulp.series(clean, runWebpack.bind(null, "prod"), createMpkFile);

const buildTs = gulp.series(clean, generateTypings, runWebpack.bind(null, "dev"), createMpkFile, copyToDeployment);

const productionBuildTs = gulp.series(clean, generateTypings, runWebpack.bind(null, "prod"), createMpkFile);

function watch(buildFn) {
    const watchPath = join(variables.projectPath, "src/**/*");
    console.log(`${COLOR.GREEN}Watching files in: ${watchPath}${END}`);
    return gulp.watch(watchPath, { ignoreInitial: false }, buildFn);
}

exports.watch = watch.bind(null, build);
exports.watchTs = watch.bind(null, buildTs);
exports.build = build;
exports.release = productionBuild;
exports.buildTs = buildTs;
exports.releaseTs = productionBuildTs;
