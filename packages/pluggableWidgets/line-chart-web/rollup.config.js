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
    const [jsConfig, mJsConfig, editorPreviewConfig] = result;

    // We define the new library externals for the entry points
    const libraryExternals = [/^react-plotly\.js($|\/)/, /(^|\/)shared\/api.js$/];

    // We force the original configuration to replace the library with the local implementation
    // Configuration for the main entry point for the client
    replaceReactPlotlyBeforeZipping(jsConfig);
    // Configuration for Modern Client (mJS)
    replaceReactPlotlyBeforeZipping(mJsConfig);
    // Configuration
    replaceReactPlotlyBeforeZipping(editorPreviewConfig);

    const externals = jsConfig.external;

    // We force the externals to contain the library + the just built api file
    jsConfig.external = [...externals, ...libraryExternals];
    mJsConfig.external = [...externals, ...libraryExternals];
    jsConfig.external = [...externals, ...libraryExternals];

    // We add the library bundling (ES output) as the first item for rollup
    result.unshift({
        input: require.resolve("react-plotly.js"),
        output: {
            format: "amd",
            file: join(outDir, "api.js"),
            sourcemap: false
        },
        external: externals,
        plugins: [
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
        ]
    });
    return result;
};

function replaceReactPlotlyBeforeZipping(config) {
    config.plugins.splice(
        -1,
        0,
        replace({
            replaces: {
                "react-plotly.js": "../../../../shared/api.js"
            }
        })
    );
}
