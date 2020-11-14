import { join } from "path";
import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import typescript from "@rollup/plugin-typescript";
import copy from "rollup-plugin-copy";
import scss from "rollup-plugin-scss";
import { terser } from "rollup-plugin-terser";

const variables = require("./variables");

const outDir = join(variables.sourcePath, "/dist/tmp/widgets/");
const outWidgetFile = join(
    variables.package.packagePath.replace(/\./g, "/"),
    variables.package.widgetName.toLowerCase(),
    `${variables.package.widgetName}.js`
);

export default args => {
    const platform = args.configPlatform;
    const production = Boolean(args.configProduction);
    if (!["web", "native"].includes(platform)) {
        throw new Error("Must pass --configPlatform=web|native parameter");
    }

    const extensions = [".tsx", ".ts", ".jsx", ".js", ".scss", ".sass", ".css"];
    const widgetConfig = {
        input: variables.widgetEntry,
        output: {
            format: "amd",
            file: join(outDir, outWidgetFile),
            sourcemap: !production
        },
        treeshake: { moduleSideEffects: false },
        external: [/^mendix($|\/)/, "react", "react-dom", "big.js"],
        plugins: [
            scss({ failOnError: true, sass: require("sass") }),
            nodeResolve({
                browser: true,
                extensions,
                mainFields: ["browser", "module", "main"],
                preferBuiltins: false
            }),
            commonjs({ extensions, transformMixedEsModules: true }),
            babel({
                presets: [["@babel/preset-env", { targets: { safari: "12" } }]],
                babelHelpers: "bundled",
                plugins: [
                    ["@babel/plugin-proposal-class-properties"],
                    ["@babel/plugin-transform-react-jsx", { pragma: "createElement" }]
                ]
            }),
            typescript({ noEmitOnError: true, sourceMap: !production }),
            replace({
                "process.env.NODE_ENV": production ? "'production'" : "'development'"
            }),
           ...(production ? [terser()] : []),
            copy({
                targets: [{ src: join(variables.sourcePath, "src/**/*.xml").replace("\\", "/"), dest: outDir }]
            })
        ],
        onwarn
    };

    const previewConfig = {
        ...widgetConfig,
        input: variables.previewEntry,
        output: {
            format: "commonjs",
            file: join(outDir, `${variables.package.widgetName}.editorPreview.js`),
            sourcemap: !production
        },
        external: widgetConfig.external.slice(0, 3),
        plugins: [
            scss({ output: false, failOnError: true, sass: require("sass") }),
            ...widgetConfig.plugins.slice(1, -1)
        ]
    };

    const editorConfig = {
        input: variables.editorConfigEntry,
        output: {
            format: "commonjs",
            file: join(outDir, `${variables.package.widgetName}.editorConfig.js`)
        },
        treeshake: { moduleSideEffects: false },
        plugins: [
            nodeResolve({ preferBuiltins: false }),
            commonjs({ transformMixedEsModules: true }),
            babel({
                presets: [["@babel/preset-env", { targets: { ie: "11" } }]],
                babelHelpers: "bundled",
                plugins: ["@babel/plugin-proposal-class-properties"]
            }),
            typescript({ noEmitOnError: true, sourceMap: false })
        ],
        onwarn
    };

    return [widgetConfig, previewConfig, editorConfig].filter(c => c.input);
};

function onwarn(warning, warn) {
    if (["CIRCULAR_DEPENDENCY", "THIS_IS_UNDEFINED", "UNUSED_EXTERNAL_IMPORT"].includes(warning.code)) {
        warn(warning);
    } else {
        console.error(warning);
        process.exit(1);
    }
}
