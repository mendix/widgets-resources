import { join } from "path";
import replace from "rollup-plugin-re";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { getBabelInputPlugin, getBabelOutputPlugin } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";

export default args => {
    // console.warn(args);

    const production = Boolean(args.configProduction);
    const outDir = join(__dirname, "dist/tmp/widgets/com/mendix/shared");
    const result = args.configDefaultConfig;

    result[0].plugins.map(plugin => console.warn(plugin));

    result[0].plugins.splice(
        -1,
        0,
        replace({
            replaces: {
                "@react-google-maps/api": "../../../../shared/api.js"
            }
        })
    );

    // result[0].plugins.map(plugin => console.warn(plugin));

    const externals = result[0].external;

    result[0].external = [...externals, /^@react-google-maps($|\/)/, /(^|\/)shared\/api.js$/];
    result.unshift({
        input: require.resolve("@react-google-maps/api"),
        output: {
            format: "amd",
            file: join(outDir, "api.js"),
            sourcemap: false
        },
        external: [/^react($|\/)/],
        plugins: [
            nodeResolve({ preferBuiltins: false, mainFields: ["module", "browser", "main"] }),
            getBabelInputPlugin({
                sourceMaps: false,
                babelrc: false,
                babelHelpers: "bundled",
                plugins: ["@babel/plugin-proposal-class-properties"],
                overrides: [
                    {
                        test: /node_modules/,
                        plugins: ["@babel/plugin-transform-flow-strip-types", "@babel/plugin-transform-react-jsx"]
                    },
                    {
                        exclude: /node_modules/,
                        plugins: [["@babel/plugin-transform-react-jsx", { pragma: "createElement" }]]
                    }
                ]
            }),
            commonjs({
                extensions: [".js", ".jsx", ".tsx", ".ts"],
                transformMixedEsModules: true,
                requireReturnsDefault: "auto",
                ignore: id => ([/^react($|\/)/] || []).some(value => new RegExp(value).test(id))
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
            })
        ]
    });

    result[1].output.file = join(__dirname, "dist/tmp/widgets/com/mendix/widget/custom/Maps/Maps.js");
    return result;
};
