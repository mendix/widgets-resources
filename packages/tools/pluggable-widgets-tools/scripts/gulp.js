const { join } = require("path");
const colors = require("colors/safe");
const gulp = require("gulp");
const rollup = require("rollup");
const loadConfigFile = require("rollup/dist/loadConfigFile");

const variables = require("../configs/variables");
const isNative = process.argv.indexOf("--native") !== -1;

function getRollupCodeStep(mode) {
    return function rollupCode(cb) {
        getRollupOptions(mode)
            .then(options =>
                Promise.all(
                    options.map(async optionsObj => {
                        const bundle = await rollup.rollup(optionsObj);
                        await Promise.all(optionsObj.output.map(bundle.write));
                    })
                )
            )
            .then(() => cb(), cb);
    };
}

async function getRollupOptions(mode) {
    const { options } = await loadConfigFile(join(__dirname, "../configs/rollup.config.js"), {
        configPlatform: isNative ? "native" : "web",
        configProduction: mode === "prod"
    });
    return options;
}

function handleError(err) {
    console.log(colors.red(err.toString()));
    process.exit(1);
}

exports.build = getRollupCodeStep("dev");
exports.release = getRollupCodeStep("prod");
exports.watch = function () {
    console.log(colors.green(`Watching files in: ${variables.sourcePath}/src`));
    getRollupOptions("dev")
        .then(options => rollup.watch(options))
        .catch(handleError);
};
