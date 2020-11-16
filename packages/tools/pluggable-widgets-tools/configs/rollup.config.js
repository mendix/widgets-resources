import { join } from "path";
import alias from "@rollup/plugin-alias";
import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
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

const webExtensions = [".js", ".jsx", ".tsx", ".ts", ".css", ".scss", ".sass"];
const nativeExtensions = [".native.js", ".js", ".jsx", ".ts", ".tsx"];

export default args => {
    const platform = args.configPlatform;
    const production = Boolean(args.configProduction);
    if (!["web", "native"].includes(platform)) {
        throw new Error("Must pass --configPlatform=web|native parameter");
    }

    const webWidgetConfig = {
        input: variables.widgetEntry,
        output: {
            format: "amd",
            file: join(outDir, outWidgetFile),
            sourcemap: !production ? "inline" : false
        },
        treeshake: { moduleSideEffects: false },
        external: [/^mendix($|\/)/, "react", "react-dom", "big.js"],
        plugins: [
            scss({ failOnError: true, sass: require("sass") }),
            alias({
                entries: {
                    "react-hot-loader/root": join(__dirname, "hot")
                }
            }),
            nodeResolve({
                browser: true,
                extensions: webExtensions,
                preferBuiltins: false
            }),
            replace({
                "process.env.NODE_ENV": production ? "'production'" : "'development'"
            }),
            babel({
                sourceMaps: !production,
                babelrc: false,
                presets: [["@babel/preset-env", { targets: { safari: "12" } }]],
                babelHelpers: "bundled",
                plugins: [
                    ["@babel/plugin-proposal-class-properties"],
                    ["@babel/plugin-transform-react-jsx", { pragma: "createElement" }]
                ]
            }),
            ...(variables.isTypescript
                ? [typescript({ noEmitOnError: true, sourceMap: !production, inlineSources: !production })]
                : []),
            commonjs({ extensions: webExtensions, transformMixedEsModules: true }),
            ...(production ? [terser()] : []),
            copy({
                targets: [{ src: join(variables.sourcePath, "src/**/*.xml").replace("\\", "/"), dest: outDir }]
            })
        ],
        onwarn
    };

    const nativeWidgetConfig = {
        input: variables.widgetEntry,
        output: {
            format: "es",
            file: join(outDir, outWidgetFile)
        },
        treeshake: { moduleSideEffects: false },
        external: [
            /^mendix\//,
            "@react-native-community/art",
            "@react-native-community/async-storage",
            "@react-native-community/cameraroll",
            "@react-native-community/geolocation",
            "@react-native-community/netinfo",
            "@react-native-firebase/analytics",
            "@react-native-firebase/app",
            "@react-native-firebase/crashlytics",
            "@react-native-firebase/messaging",
            "@react-native-firebase/ml-vision",
            "big.js",
            "react",
            "react-native",
            "react-native-camera",
            "react-native-device-info",
            "react-native-firebase",
            "react-native-geocoder",
            /react-native-gesture-handler\/*/,
            "react-native-image-picker",
            "react-native-inappbrowser-reborn",
            "react-native-localize",
            "react-native-maps",
            "react-native-reanimated",
            "react-native-sound",
            "react-native-svg",
            "react-native-touch-id",
            "react-native-vector-icons",
            "react-native-video",
            "react-native-view-shot",
            "react-native-webview",
            "react-navigation"
        ],
        plugins: [
            json(),
            nodeResolve({
                browser: true,
                extensions: nativeExtensions,
                preferBuiltins: false
            }),
            replace({
                "process.env.NODE_ENV": production ? "'production'" : "'development'"
            }),
            babel({
                babelHelpers: "bundled",
                babelrc: false,
                plugins: [
                    "@babel/plugin-proposal-class-properties",
                    "@babel/plugin-transform-flow-strip-types",
                    "@babel/plugin-transform-react-jsx"
                ]
            }),
            ...(variables.isTypescript
                ? [typescript({ noEmitOnError: true, target: "es2019", sourceMap: false })]
                : []),
            commonjs({ extensions: nativeExtensions, transformMixedEsModules: true }),
            ...(production ? [terser()] : []),
            copy({
                targets: [{ src: join(variables.sourcePath, "src/**/*.xml").replace("\\", "/"), dest: outDir }]
            })
        ],
        onwarn
    };

    const previewConfig = {
        ...webWidgetConfig,
        input: variables.previewEntry,
        output: {
            format: "commonjs",
            file: join(outDir, `${variables.package.widgetName}.editorPreview.js`),
            sourcemap: !production ? "inline" : false
        },
        external: webWidgetConfig.external.slice(0, 3),
        plugins: [
            scss({ output: false, failOnError: true, sass: require("sass") }),
            ...webWidgetConfig.plugins.slice(2, -1)
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

    return [
        platform === "web" ? webWidgetConfig : nativeWidgetConfig,
        ...(platform === "web" && variables.previewEntry ? [previewConfig] : []),
        ...(variables.editorConfigEntry ? [editorConfig] : [])
    ];
};

function onwarn(warning, warn) {
    if (["CIRCULAR_DEPENDENCY", "THIS_IS_UNDEFINED", "UNUSED_EXTERNAL_IMPORT"].includes(warning.code)) {
        warn(warning);
    } else {
        console.error(warning);
        process.exit(1);
    }
}
