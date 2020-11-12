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
const MODULES_SHIPPED_WITH_CLIENT = ["react", "big.js"];

const outDir = join(variables.sourcePath, "/dist/tmp/widgets/");
const outFile = join(
    variables.package.packagePath.replace(/\./g, "/"),
    variables.package.widgetName.toLowerCase(),
    `${variables.package.widgetName}.js`
);

export default args => {
    const platform = args.configPlatform;
    const production = Boolean(args.configProd);
    if (!["web", "native"].includes(platform)) {
        throw new Error("Must pass --configPlatform=web|native parameter");
    }

    return {
        input: variables.widgetEntry,
        output: {
            format: "amd",
            file: join(outDir, outFile),
            sourcemap: !production
        },
        external: [...MODULES_SHIPPED_WITH_CLIENT, /^mendix($|\/)/],
        plugins: [
            nodeResolve({ browser: true, mainFields: ["browser", "module", "main"], preferBuiltins: false }),
            commonjs(),
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
            scss({ failOnError: true, sass: require("sass") }),
            copy({
                targets: [{ src: join(variables.sourcePath, "src/**/*.xml").replace("\\", "/"), dest: outDir }]
            }),
            ...(production ? [terser()] : [])
        ],
        onwarn: function (warning, warn) {
            if (["CIRCULAR_DEPENDENCY", "THIS_IS_UNDEFINED", "UNUSED_EXTERNAL_IMPORT"].includes(warning.code)) {
                warn(warning);
            } else {
                console.error(warning);
                process.exit(1);
            }
        }
    };
};
