import { existsSync, mkdirSync, promises } from "fs";
import { basename, dirname, extname, join, relative } from "path";
import alias from "@rollup/plugin-alias";
import { getBabelInputPlugin, getBabelOutputPlugin } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import typescript from "@rollup/plugin-typescript";
import url from "@rollup/plugin-url";
import { red, yellow } from "colors";
import { copy, readJson } from "fs-extra";
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
const outWidgetFile = join(widgetPackage.replace(/\./g, "/"), widgetName.toLowerCase(), `${widgetName}`);
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
                file: join(outDir, `${outWidgetFile}.js`),
                sourcemap: !production ? "inline" : false
            },
            external: [/^mendix($|\/)/, "react", "react-dom", "big.js"],
            plugins: [
                ...getClientComponentPlugins(),
                url({ include: imagesAndFonts, limit: 100000 }),
                sass({ output: production, insert: !production, include: /\.(css|sass|scss)$/, processor }),
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
                    }
                })
            ],
            onwarn
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
                        "Platform.OS": `"${os}"`
                    }),
                    ...(i === 0 ? getClientComponentPlugins() : []),
                    json(),
                    copyNativeDependency({ nodeModulesPath: join(outDir, "node_modules") }),
                    ...getCommonPlugins({
                        sourceMaps: false,
                        extensions: [`.${os}.js`, ".native.js", ".js", ".jsx", ".ts", ".tsx"],
                        transpile: false
                    })
                ],
                onwarn
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
            external: [/^mendix($|\/)/, "react", "react-dom"],
            plugins: [
                sass({ output: false, include: /\.(css|sass|scss)$/, processor }),
                ...getCommonPlugins({
                    sourceMaps: !production,
                    extensions: webExtensions,
                    transpile: production,
                    babelConfig: { presets: [["@babel/preset-env", { targets: { safari: "12" } }]] }
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
            treeshake: { moduleSideEffects: false },
            plugins: [
                url(),
                ...getCommonPlugins({
                    sourceMaps: false,
                    extensions: webExtensions,
                    transpile: true,
                    babelConfig: { presets: [["@babel/preset-env", { targets: { ie: "11" } }]] }
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
            commonjs({ extensions: config.extensions, transformMixedEsModules: true, requireReturnsDefault: true }),
            replace({
                "process.env.NODE_ENV": production ? "'production'" : "'development'"
            }),
            config.transpile
                ? getBabelOutputPlugin({
                      sourceMaps: config.sourceMaps,
                      babelrc: false,
                      compact: false,
                      ...(config.babelConfig || {})
                  })
                : null,
            production ? terser() : null,
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
                        cp("-r", join(outDir, "*"), join(projectPath, `deployment/${platform}/widgets`));
                        cp(mpkFile, join(projectPath, "widgets"));
                    }
                }
            ])
        ];
    }

    function getClientComponentPlugins() {
        return [
            isTypescript ? widgetTyping({ sourceDir: join(sourcePath, "src") }) : null,
            clear({ targets: [outDir, mpkDir] }),
            command([() => cp(join(sourcePath, "src/**/*.xml"), outDir)]),
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

const nativeExternal = [
    /^mendix\//,
    /^react-native(\/|$)/,
    "big.js",
    "react",
    /react-native-gesture-handler\/*/,
    "react-native-reanimated",
    "react-native-vector-icons",
    "react-navigation"
];

function copyNativeDependency({ nodeModulesPath }) {
    // 1. Identify whether a dependency has a native module
    // 2. Copy native modules into node_modules folder at com folder level
    const nativeDependencies = []; // todo: fix watch mode
    return {
        name: "copy-react-native-modules",
        async resolveId(source) {
            if (source.startsWith(".")) {
                return null;
            }

            try {
                const packageDir = dirname(require.resolve(`${source}/package.json`));

                if (await hasNativeCode(packageDir)) {
                    if (!nativeDependencies.some(x => x.name === source)) {
                        nativeDependencies.push({ name: source, dir: packageDir });
                    }
                    return { id: source, external: true };
                }
                return null;
            } catch (e) {
                return null;
            }
        },
        async writeBundle() {
            await Promise.all(
                nativeDependencies.map(async dependency => {
                    await copyJsModule(dependency.dir, join(nodeModulesPath, dependency.name));
                    for (const transitiveDependency of await getTransitiveDependencies(dependency.name)) {
                        await copyJsModule(
                            dirname(require.resolve(`${transitiveDependency}/package.json`)),
                            join(nodeModulesPath, dependency.name, "node_modules", transitiveDependency)
                        );
                    }
                })
            );
            // const nativeDependencies = Object.values(bundle)
            //     .flatMap(c => c.imports.concat(c.dynamicImports))
            //     .filter(d => d.startsWith("react-native-"))
            //     .map(d => d.split("/")[0]);
            //
            // const packagedToCopy = withTransitiveDependencies(nativeDependencies);
            // withTransitiveDependencies(MODULES_SHIPPED_WITH_CLIENT, true).forEach(d => packagedToCopy.delete(d));
            //
            // await copyPackages(packagedToCopy, dest);
        }
    };
}

async function hasNativeCode(dir) {
    const packageContent = await promises.readdir(dir, { withFileTypes: true });
    return (
        packageContent.some(file => /^(ios|android|.*\.podspec)$/i.test(file.name)) ||
        packageContent.some(file => file.isDirectory() && hasNativeCode(join(dir, file.name)))
    );
}

async function getTransitiveDependencies(packageName) {
    const queue = [packageName];
    const result = new Set();
    while (queue.length) {
        const next = queue.shift();
        if (result.has(next)) {
            continue;
        }
        const isExternal = nativeExternal.some(external =>
            external instanceof RegExp ? external.test(next) : external === next
        );
        if (isExternal) {
            continue;
        }

        if (next !== packageName) {
            result.add(next);
        }
        const packageJson = await readJson(require.resolve(`${next}/package.json`));
        queue.push(...Object.keys(packageJson.dependencies ?? {}));
    }
    return Array.from(result);
}

async function copyJsModule(from, to) {
    await copy(from, to, {
        filter: async path =>
            (await promises.lstat(path)).isDirectory()
                ? !["android", "ios", ".github", "__tests__"].includes(basename(path))
                : [".js", ".jsx", ".json"].includes(extname(path)) || basename(path).toLowerCase().includes("license")
    });
}
