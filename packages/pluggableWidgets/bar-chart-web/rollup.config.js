import { join } from "path";
import replace from "rollup-plugin-re";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { getBabelInputPlugin, getBabelOutputPlugin } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";

export default args => {
    const production = Boolean(args.configProduction);
    const outDir = join(__dirname, "dist/tmp/widgets/com/mendix/shared");
    const result = args.configDefaultConfig;
    const [jsConfig, mJsConfig] = result;

    // We define the new library externals for the entry points
    const libraryExternals = [
        /^react-plotly\.js($|\/)/,
        /(^|\/)shared\/plotly.js$/,
        /^react-ace($|\/)/,
        /(^|\/)shared\/ace.js$/
    ];

    // We force the original configuration to replace the library with the local implementation
    // Configuration for the main entry point for the client
    replaceReactPlotlyBeforeZipping(jsConfig);
    // Configuration for Modern Client (mJS)
    replaceReactPlotlyBeforeZipping(mJsConfig);

    const externals = jsConfig.external;

    // We force the externals to contain the library + the just built api file
    jsConfig.external = [...externals, ...libraryExternals];
    mJsConfig.external = [...externals, ...libraryExternals];
    jsConfig.external = [...externals, ...libraryExternals];

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
    // We add the library bundling (ES output) as the first item for rollup
    result.unshift(
        {
            input: require.resolve("react-plotly.js"),
            output: {
                format: "amd",
                file: join(outDir, "plotly.js"),
                sourcemap: false
            },
            external: externals,
            plugins
        },
        {
            input: require.resolve("react-ace"),
            output: {
                format: "amd",
                file: join(outDir, "ace.js"),
                sourcemap: false
            },
            external: externals,
            plugins
        }
    );

    // We change the output because BarChart widget package was wrongly named with uppercase L in the past.
    jsConfig.output.file = join(__dirname, "dist/tmp/widgets/com/mendix/widget/web/BarChart/BarChart.js");
    mJsConfig.output.file = join(__dirname, "dist/tmp/widgets/com/mendix/widget/web/BarChart/BarChart.mjs");

    result.forEach(config => {
        const onwarn = config.onwarn;
        if (onwarn) {
            config.onwarn = warning => {
                // The library itself throws a lot of esm module related errors on compilation.
                // For now they don't seem related to us and everything still works, so I ignored them.
                if (
                    warning.loc &&
                    (warning.loc.file.includes("fast-json-patch") ||
                        warning.loc.file.includes("shared/charts/dist/components/Chart.js")) &&
                    warning.code === "THIS_IS_UNDEFINED"
                ) {
                    return;
                }
                onwarn(warning);
            };
        }
    });
    return result;
};

function replaceReactPlotlyBeforeZipping(config) {
    config.plugins.splice(
        -1,
        0,
        replace({
            replaces: {
                "react-plotly.js": "../../../../shared/plotly.js",
                "react-ace": "../../../../../shared/ace.js"
            }
        })
    );
}
