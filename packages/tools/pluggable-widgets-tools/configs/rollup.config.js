import { existsSync } from "fs";
import { join } from "path";
import alias from "@rollup/plugin-alias";
import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import typescript from "@rollup/plugin-typescript";
import loadConfigFile from "rollup/dist/loadConfigFile";
import clear from "rollup-plugin-clear";
import copy from "rollup-plugin-copy";
import copyAfterBuild from "rollup-plugin-cpy";
import scss from "rollup-plugin-scss";
import { terser } from "rollup-plugin-terser";
import { widgetTyping } from "./rollup-plugin-widget-typing";
import { zip } from "./rollup-plugin-zip";
import {
    editorConfigEntry,
    isTypescript,
    previewEntry,
    projectPath,
    sourcePath,
    widgetEntry,
    widgetName,
    widgetPackage,
    widgetVersion
} from "./shared";

const outDir = join(sourcePath, "/dist/tmp/widgets/");
const outWidgetFile = join(widgetPackage.replace(/\./g, "/"), widgetName.toLowerCase(), `${widgetName}.js`);
const mpkDir = join(sourcePath, "dist", widgetVersion);
const mpkFile = join(mpkDir, `${widgetPackage}.${widgetName}.mpk`);

export default async args => {
    const platform = args.configPlatform;
    const production = Boolean(args.configProduction);
    if (!["web", "native"].includes(platform)) {
        throw new Error("Must pass --configPlatform=web|native parameter");
    }
    const result = [];

    if (platform === "web") {
        result.push({
            input: widgetEntry,
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
                ...getCommonPlugins({
                    production,
                    extensions: webExtensions,
                    typescriptConfig: { sourceMap: !production, inlineSources: !production },
                    babelConfig: {
                        presets: [["@babel/preset-env", { targets: { safari: "12" } }]],
                        plugins: [["@babel/plugin-transform-react-jsx", { pragma: "createElement" }]]
                    }
                }),
                ...(await getMainFilePlugins({ platform, production }))
            ],
            onwarn
        });
    }

    if (platform === "native") {
        result.push({
            input: widgetEntry,
            output: {
                format: "es",
                file: join(outDir, outWidgetFile)
            },
            treeshake: { moduleSideEffects: false },
            external: nativeExternal,
            plugins: [
                json(),
                ...getCommonPlugins({
                    production,
                    extensions: nativeExtensions,
                    typescriptConfig: { target: "es2019" },
                    babelConfig: {
                        plugins: [
                            "@babel/plugin-proposal-class-properties",
                            "@babel/plugin-transform-flow-strip-types",
                            "@babel/plugin-transform-react-jsx"
                        ]
                    }
                }),
                ...(await getMainFilePlugins({ platform, production }))
            ],
            onwarn
        });
    }

    if (platform === "web" && previewEntry) {
        result.push({
            input: previewEntry,
            output: {
                format: "commonjs",
                file: join(outDir, `${widgetName}.editorPreview.js`),
                sourcemap: !production ? "inline" : false
            },
            treeshake: { moduleSideEffects: false },
            external: [/^mendix($|\/)/, "react", "react-dom"],
            plugins: [
                scss({ output: false, failOnError: true, sass: require("sass") }),
                ...getCommonPlugins({
                    production,
                    extensions: webExtensions,
                    typescriptConfig: { sourceMap: !production, inlineSources: !production },
                    babelConfig: {
                        presets: [["@babel/preset-env", { targets: { safari: "12" }, modules: false }]],
                        plugins: [["@babel/plugin-transform-react-jsx", { pragma: "createElement" }]]
                    }
                })
            ]
        });
    }

    if (editorConfigEntry) {
        result.push({
            input: editorConfigEntry,
            output: {
                format: "commonjs",
                file: join(outDir, `${widgetName}.editorConfig.js`),
                sourcemap: false // target engine does not support it
            },
            treeshake: { moduleSideEffects: false },
            plugins: [
                ...getCommonPlugins({
                    production: false,
                    extensions: webExtensions,
                    typescriptConfig: { target: "es5" },
                    babelConfig: {}
                }),
                babel({
                    babelHelpers: "bundled",
                    presets: [["@babel/preset-env", { targets: { ie: "11" } }]] // this rewrite should be done after commonjs, because it breaks it
                })
            ],
            onwarn
        });
    }

    const customConfigPath = join(sourcePath, "rollup.config.js");
    if (existsSync(customConfigPath)) {
        const customConfig = await loadConfigFile(customConfigPath, { ...args, configDefaultConfig: result });
        customConfig.warnings.flush();
        return customConfig.options;
    }

    return result;
};

function getCommonPlugins(config) {
    return [
        replace({
            "process.env.NODE_ENV": config.production ? "'production'" : "'development'"
        }),
        nodeResolve({
            browser: true,
            extensions: config.extensions,
            preferBuiltins: false
        }),
        isTypescript ? typescript({ noEmitOnError: true, sourceMap: false, ...config.typescriptConfig }) : null,
        babel({
            sourceMaps: !config.production,
            babelrc: false,
            babelHelpers: "bundled",
            ...config.babelConfig
        }),
        commonjs({ extensions: config.extensions, transformMixedEsModules: true, requireReturnsDefault: true }),
        config.production ? terser() : null,
        zip({ sourceDir: outDir, file: mpkFile })
    ];
}

async function getMainFilePlugins(config) {
    return [
        isTypescript ? await widgetTyping({ sourceDir: join(sourcePath, "src") }) : null,
        clear({ targets: [outDir, mpkDir] }),
        copy({
            targets: [{ src: join(sourcePath, "src/**/*.xml").replace("\\", "/"), dest: outDir }]
        }),
        !config.production && projectPath
            ? copyAfterBuild([
                  {
                      files: join(outDir, "**/*.{js,css}").replace("\\", "/"),
                      dest: join(projectPath, `deployment/${config.platform}/widgets`),
                      options: { parents: true }
                  }
              ])
            : null
    ];
}

function onwarn(warning, warn) {
    if (["CIRCULAR_DEPENDENCY", "THIS_IS_UNDEFINED", "UNUSED_EXTERNAL_IMPORT"].includes(warning.code)) {
        warn(warning);
    } else {
        console.error(warning);
        process.exit(1);
    }
}

const webExtensions = [".js", ".jsx", ".tsx", ".ts", ".css", ".scss", ".sass"];
const nativeExtensions = [".native.js", ".js", ".jsx", ".ts", ".tsx"];
const nativeExternal = [
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
];
