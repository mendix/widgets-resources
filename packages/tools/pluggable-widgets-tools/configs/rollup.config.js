import { existsSync, mkdirSync } from "fs";
import { join, relative } from "path";
import alias from "@rollup/plugin-alias";
import { getBabelInputPlugin, getBabelOutputPlugin } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import replace from "rollup-plugin-re";
import typescript from "@rollup/plugin-typescript";
import url from "@rollup/plugin-url";
import { red, yellow, blue } from "colors";
import postcss from "postcss";
import postcssUrl from "postcss-url";
import loadConfigFile from "rollup/dist/loadConfigFile";
import clear from "rollup-plugin-clear";
import command from "rollup-plugin-command";
import livereload from "rollup-plugin-livereload";
import sass from "rollup-plugin-sass";
import { terser } from "rollup-plugin-terser";
import { cp } from "shelljs";
import { zip } from "zip-a-folder";
import { widgetTyping } from "./rollup-plugin-widget-typing";
import { collectDependencies } from "./rollup-plugin-collect-dependencies";
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
import image from "@rollup/plugin-image";

const outDir = join(sourcePath, "/dist/tmp/widgets/");
const outWidgetFile = join(widgetPackage.replace(/\./g, "/"), widgetName.toLowerCase(), `${widgetName}`);
const mpkDir = join(sourcePath, "dist", widgetVersion);
const mpkFile = join(mpkDir, process.env.MPKOUTPUT ? process.env.MPKOUTPUT : `${widgetPackage}.${widgetName}.mpk`);

export default async args => {
    const platform = args.configPlatform;
    const production = Boolean(args.configProduction);
    if (!["web", "native"].includes(platform)) {
        throw new Error("Must pass --configPlatform=web|native parameter");
    }
    if (!production && projectPath) {
        console.info(blue(`Project Path: ${projectPath}`));
    }

    const result = [];

    if (platform === "web") {
        ["amd", "es"].forEach(outputFormat => {
            result.push({
                input: widgetEntry,
                output: {
                    format: outputFormat,
                    file: join(outDir, `${outWidgetFile}.${outputFormat === "es" ? "mjs" : "js"}`),
                    sourcemap: !production ? "inline" : false
                },
                external: webExternal,
                plugins: [
                    ...getClientComponentPlugins(platform),
                    url({ include: imagesAndFonts, limit: 100000 }),
                    sass({
                        output: production && outputFormat === "amd",
                        insert: !production,
                        include: /\.(css|sass|scss)$/,
                        processor
                    }),
                    alias({
                        entries: {
                            "react-hot-loader/root": join(__dirname, "hot")
                        }
                    }),
                    ...getCommonPlugins({
                        sourceMaps: !production,
                        extensions: webExtensions,
                        transpile: production,
                        babelConfig: {
                            presets: [["@babel/preset-env", { targets: { safari: "12" } }]],
                            allowAllFormats: true
                        },
                        external: webExternal
                    })
                ],
                onwarn
            });
        });
    }

    if (platform === "native") {
        ["ios", "android"].forEach((os, i) => {
            result.push({
                input: widgetEntry,
                output: {
                    format: "es",
                    file: join(outDir, `${outWidgetFile}.${os}.js`),
                    sourcemap: false
                },
                external: nativeExternal,
                plugins: [
                    replace({
                        patterns: [
                            {
                                test: /\b(?<!\.)Platform.OS\b(?!\s*=[^=])/g,
                                replace: `"${os}"`
                            }
                        ]
                    }),
                    ...(i === 0 ? getClientComponentPlugins(platform) : []),
                    json(),
                    collectDependencies({ outputDir: outDir, onlyNative: true, widgetName }),
                    ...getCommonPlugins({
                        sourceMaps: false,
                        extensions: [`.${os}.js`, ".native.js", ".js", ".jsx", ".ts", ".tsx"],
                        transpile: false,
                        external: nativeExternal
                    })
                ],
                onwarn: warning => {
                    if (warning.code === "UNUSED_EXTERNAL_IMPORT" && /('|")Platform('|")/.test(warning.message)) {
                        return;
                    }
                    onwarn(warning);
                }
            });
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
            external: editorPreviewExternal,
            plugins: [
                sass({ output: false, include: /\.(css|sass|scss)$/, processor }),
                ...getCommonPlugins({
                    sourceMaps: !production,
                    extensions: webExtensions,
                    transpile: production,
                    babelConfig: { presets: [["@babel/preset-env", { targets: { safari: "12" } }]] },
                    external: editorPreviewExternal
                })
            ],
            onwarn
        });
    }

    if (editorConfigEntry) {
        // We target Studio Pro's JS engine that supports only es5 and no source maps
        result.push({
            input: editorConfigEntry,
            output: {
                format: "commonjs",
                file: join(outDir, `${widgetName}.editorConfig.js`),
                sourcemap: false
            },
            external: editorConfigExternal,
            treeshake: { moduleSideEffects: false },
            plugins: [
                url({ include: ["**/*.svg"], limit: 102400 }), // SVG file size limit of 100 kB
                ...getCommonPlugins({
                    sourceMaps: false,
                    extensions: webExtensions,
                    transpile: true,
                    babelConfig: { presets: [["@babel/preset-env", { targets: { ie: "11" } }]] },
                    external: editorConfigExternal
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
            nodeResolve({ preferBuiltins: false, mainFields: ["module", "browser", "main"] }),
            isTypescript
                ? typescript({
                      noEmitOnError: !args.watch,
                      sourceMap: config.sourceMaps,
                      inlineSources: config.sourceMaps,
                      target: "es2019" // we transpile the result with babel anyway, see below
                  })
                : null,
            // Babel can transpile source JS and resulting JS, hence are input/output plugins. The good
            // practice is to do the most of conversions on resulting code, since then we ensure that
            // babel doesn't interfere with `import`s and `require`s used by rollup/commonjs plugin;
            // also resulting code includes generated code that deserve transpilation as well.
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
            commonjs({
                extensions: config.extensions,
                transformMixedEsModules: true,
                requireReturnsDefault: "auto",
                ignore: id => (config.external || []).some(value => new RegExp(value).test(id))
            }),
            replace({
                patterns: [
                    {
                        test: "process.env.NODE_ENV",
                        replace: production ? "'production'" : "'development'"
                    }
                ]
            }),
            config.transpile
                ? getBabelOutputPlugin({
                      sourceMaps: config.sourceMaps,
                      babelrc: false,
                      compact: false,
                      ...(config.babelConfig || {})
                  })
                : null,
            image(),
            production ? terser(platform === "native" ? { mangle: false } : undefined) : null,
            // We need to create .mpk and copy results to test project after bundling is finished.
            // In case of a regular build is it is on `writeBundle` of the last config we define
            // (since rollup processes configs sequentially). But in watch mode rollup re-bundles only
            // configs affected by a change => we cannot know in advance which one will be "the last".
            // So we run the same logic for all configs, letting the last one win.
            command([
                async () => {
                    mkdirSync(mpkDir, { recursive: true });
                    await zip(outDir, mpkFile);
                    if (!production && projectPath) {
                        const widgetsPath = join(projectPath, "widgets");
                        const deploymentPath = join(projectPath, `deployment/${platform}/widgets`);
                        // Create folder if they do not exists or directories were cleaned
                        mkdirSync(widgetsPath, { recursive: true });
                        mkdirSync(deploymentPath, { recursive: true });
                        // Copy files to deployment and widgets folder
                        cp("-r", join(outDir, "*"), deploymentPath);
                        cp(mpkFile, widgetsPath);
                    }
                }
            ])
        ];
    }

    function getClientComponentPlugins(platform) {
        return [
            isTypescript ? widgetTyping({ sourceDir: join(sourcePath, "src") }) : null,
            clear({ targets: [outDir, mpkDir] }),
            command([
                () => {
                    cp(join(sourcePath, "src/**/*.xml"), outDir);
                    if (existsSync(`src/${widgetName}.icon.png`) || existsSync(`src/${widgetName}.tile.png`)) {
                        cp(join(sourcePath, `src/${widgetName}.@(tile|icon).png`), outDir);
                    }
                }
            ]),
            args.watch && platform === "web" && !production && projectPath ? livereload() : null
        ];
    }

    function onwarn(warning) {
        const description =
            (warning.plugin ? `(${warning.plugin} plugin) ` : "") +
            (warning.loc
                ? `${relative(sourcePath, warning.loc.file)} (${warning.loc.line}:${warning.loc.column}) `
                : "") +
            `Error: ${warning.message}` +
            (warning.frame ? warning.frame : "");

        // Many rollup warnings are indication of some critical issue, so we should treat them as errors,
        // except a short white-list which we know is safe _and_ not easily fixable.
        if (["CIRCULAR_DEPENDENCY", "THIS_IS_UNDEFINED", "UNUSED_EXTERNAL_IMPORT"].includes(warning.code)) {
            console.warn(yellow(description));
        } else if (args.watch) {
            // Do not break watch mode because of an error. Also don't use console.error, since it is overwritten by rollup
            console.warn(red(description));
        } else {
            console.error(red(description));
            process.exit(1);
        }
    }

    async function processor(css) {
        const result = await postcss()
            .use(postcssUrl({ url: "inline" }))
            .process(css);
        return result.css;
    }
};

const webExtensions = [".js", ".jsx", ".tsx", ".ts", ".css", ".scss", ".sass"];
const imagesAndFonts = [
    "**/*.svg",
    "**/*.png",
    "**/*.jp(e)?g",
    "**/*.gif",
    "**/*.webp",
    "**/*.ttf",
    "**/*.woff(2)?",
    "**/*.eot"
];

const webExternal = [/^mendix($|\/)/, /^react($|\/)/, /^react-dom($|\/)/, /^big.js$/];

const editorPreviewExternal = [/^mendix($|\/)/, /^react($|\/)/, /^react-dom($|\/)/];

const editorConfigExternal = [/^mendix($|\/)/, /^react($|\/)/, /^react-dom($|\/)/];

const nativeExternal = [
    /^mendix($|\/)/,
    /^react-native($|\/)/,
    /^big.js$/,
    /^react($|\/)/,
    /^react-native-gesture-handler($|\/)/,
    /^react-native-reanimated($|\/)/,
    /^react-native-svg($|\/)/,
    /^react-native-vector-icons($|\/)/,
    /^react-navigation($|\/)/
];
