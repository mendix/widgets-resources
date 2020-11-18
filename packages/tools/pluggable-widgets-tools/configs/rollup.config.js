import { existsSync } from "fs";
import { join } from "path";
import alias from "@rollup/plugin-alias";
import { getBabelInputPlugin, getBabelOutputPlugin } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import typescript from "@rollup/plugin-typescript";
import loadConfigFile from "rollup/dist/loadConfigFile";
import clear from "rollup-plugin-clear";
import copy from "rollup-plugin-copy";
import copyAfterBuild from "rollup-plugin-cpy";
import sass from "rollup-plugin-sass";
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

// Notes for future me:
// - plugins that transform non-js code to js should go before plugins that work with js
// - for editorConfig we target JS engine in Studio Pro, which supports only es5 and no source maps

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
            external: [/^mendix($|\/)/, "react", "react-dom", "big.js"],
            plugins: [
                sass({ output: true, include: /\.(css|sass|scss)$/ }),
                alias({
                    entries: {
                        "react-hot-loader/root": join(__dirname, "hot")
                    }
                }),
                ...getCommonPlugins({
                    sourceMaps: !production,
                    extensions: webExtensions,
                    typescriptConfig: {},
                    babelConfig: production
                        ? {
                              presets: [["@babel/preset-env", { targets: { safari: "12" } }]],
                              allowAllFormats: true
                          }
                        : undefined
                }),
                ...getMainFilePlugins()
            ],
            onwarn
        });
    }

    if (platform === "native") {
        result.push({
            input: widgetEntry,
            output: {
                format: "es",
                file: join(outDir, outWidgetFile),
                sourcemap: !production ? "inline" : false
            },
            external: nativeExternal,
            plugins: [
                json(),
                ...getCommonPlugins({
                    sourceMaps: !production,
                    extensions: nativeExtensions,
                    typescriptConfig: { target: "es2019" }
                }),
                ...getMainFilePlugins()
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
            external: [/^mendix($|\/)/, "react", "react-dom"],
            plugins: [
                sass({ output: false, include: /\.(css|sass|scss)$/ }),
                ...getCommonPlugins({
                    sourceMaps: !production,
                    extensions: webExtensions,
                    typescriptConfig: { sourceMap: !production, inlineSources: !production },
                    babelConfig: production
                        ? { presets: [["@babel/preset-env", { targets: { safari: "12" } }]] }
                        : undefined
                })
            ],
            onwarn
        });
    }

    if (editorConfigEntry) {
        result.push({
            input: editorConfigEntry,
            output: {
                format: "commonjs",
                file: join(outDir, `${widgetName}.editorConfig.js`),
                sourcemap: false
            },
            treeshake: { moduleSideEffects: false },
            plugins: [
                ...getCommonPlugins({
                    sourceMaps: false,
                    extensions: webExtensions,
                    typescriptConfig: { target: "es5" },
                    babelConfig: {
                        presets: [["@babel/preset-env", { targets: { ie: "11" } }]]
                    }
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

    function getCommonPlugins(config) {
        return [
            nodeResolve({ browser: true, extensions: config.extensions, preferBuiltins: false }),
            isTypescript
                ? typescript({
                      noEmitOnError: true,
                      sourceMap: config.sourceMaps,
                      inlineSources: config.sourceMaps,
                      ...config.typescriptConfig
                  })
                : null,
            getBabelInputPlugin({
                sourceMaps: config.sourceMaps,
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
            commonjs({ extensions: config.extensions, transformMixedEsModules: true, requireReturnsDefault: true }),
            replace({
                "process.env.NODE_ENV": production ? "'production'" : "'development'"
            }),
            config.babelConfig
                ? getBabelOutputPlugin({
                      sourceMaps: config.sourceMaps,
                      babelrc: false,
                      compact: false,
                      ...config.babelConfig
                  })
                : null,
            production ? terser() : null,
            zip({ sourceDir: outDir, file: mpkFile })
        ];
    }

    function getMainFilePlugins() {
        return [
            isTypescript ? widgetTyping({ sourceDir: join(sourcePath, "src") }) : null,
            clear({ targets: [outDir, mpkDir] }),
            copy({
                targets: [{ src: join(sourcePath, "src/**/*.xml").replace("\\", "/"), dest: outDir }]
            }),
            !production && projectPath
                ? copyAfterBuild([
                      {
                          files: join(outDir, "**/*.{js,css}").replace("\\", "/"),
                          dest: join(projectPath, `deployment/${platform}/widgets`),
                          options: { parents: true }
                      }
                  ])
                : null
        ];
    }
};

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
