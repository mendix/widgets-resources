const { join } = require("node:path");
const replace = require("rollup-plugin-re");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const { getBabelInputPlugin, getBabelOutputPlugin } = require("@rollup/plugin-babel");
const commonjs = require("@rollup/plugin-commonjs");
const { terser } = require("rollup-plugin-terser");
const command = require("rollup-plugin-command");
const sh = require("shelljs");

const externals = [/^mendix($|\/)/, /^react$/, /^react\/jsx-runtime$/, /^react-dom$/, /^big.js$/];

module.exports = args => {
    const production = Boolean(args.configProduction);
    const outDir = join("dist", "shared", production ? "prod" : "dev");

    const plugins = [
        nodeResolve({ preferBuiltins: false, mainFields: ["module", "browser", "main"] }),
        getBabelInputPlugin({
            sourceMaps: false,
            babelrc: false,
            babelHelpers: "bundled",
            plugins: ["@babel/plugin-proposal-class-properties"],
            overrides: [
                {
                    plugins: ["@babel/plugin-transform-flow-strip-types", "@babel/plugin-transform-react-jsx"]
                }
            ]
        }),
        commonjs({
            extensions: [".js", ".jsx", ".tsx", ".ts"],
            transformMixedEsModules: true,
            requireReturnsDefault: "auto",
            ignore: id => externals.some(value => new RegExp(value).test(id))
        }),
        getBabelOutputPlugin({
            sourceMaps: false,
            babelrc: false,
            compact: false,
            presets: [["@babel/preset-env", { targets: { safari: "12" } }]],
            allowAllFormats: true
        }),
        replace({
            patterns: [
                {
                    test: "process.env.NODE_ENV",
                    replace: production ? "'production'" : "'development'"
                }
            ]
        }),
        production ? terser() : null
    ];

    const plotly = {
        input: "react-plotly.js",
        output: {
            format: "amd",
            file: join(outDir, "plotly.js")
        },
        plugins
    };

    const ace = {
        input: "react-ace",
        output: {
            format: "amd",
            file: join(outDir, "ace.js")
        },
        plugins: [
            ...plugins,
            command([
                () => {
                    const file = require.resolve("ace-builds/src-min-noconflict/worker-json.js");
                    sh.cp(file, outDir);
                }
            ])
        ]
    };

    return [plotly, ace];
};
