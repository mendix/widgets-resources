const { join } = require("path");
const command = require("rollup-plugin-command");
const sh = require("shelljs");
const { green } = require("ansi-colors");

function sharedChardConfig(args) {
    const production = Boolean(args.configProduction);
    const result = args.configDefaultConfig;

    // We define the new library externals for the entry points
    const libraryExternals = [
        /^react-plotly\.js($|\/)/,
        /(^|\/)shared\/plotly.js$/,
        /^react-ace($|\/)/,
        /(^|\/)shared\/ace.js$/,
        /^plotly.js$/
    ];

    function copyExternalsToWidget() {
        console.log(green("Copy files for plotly and ace libraries"));
        const outDir = join(process.cwd(), "dist/tmp/widgets/com/mendix/shared");
        const libDir = join(__dirname, "../shared", production ? "prod" : "dev");
        const files = ["plotly.js", "ace.js", "worker-json.js"].map(f => join(libDir, f));
        sh.config.fatal = true;
        sh.mkdir("-p", outDir);
        sh.cp(files, outDir);
    }

    // To avoid double copy use one command instance for each entry
    const commandCopyExternals = command(copyExternalsToWidget, { once: true });

    result.forEach(config => {
        config.external = [...config.external, ...libraryExternals];

        config.output.paths = {
            ...config.output.paths,
            "react-ace": "../../../shared/ace.js",
            "react-plotly.js": "../../../shared/plotly.js"
        };

        config.plugins = [...config.plugins, commandCopyExternals];

        const onwarn = config.onwarn;
        if (onwarn) {
            config.onwarn = warning => {
                // The library itself throws a lot of esm module related errors on compilation.
                // For now they don't seem related to us and everything still works, so I ignored them.
                if (
                    warning.loc &&
                    (warning.loc.file.includes("fast-json-patch") || warning.loc.file.includes("shared/charts")) &&
                    warning.code === "THIS_IS_UNDEFINED"
                ) {
                    return;
                }
                onwarn(warning);
            };
        }
    });

    return result;
}

module.exports = {
    sharedChardConfig
};
