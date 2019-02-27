const fs = require("fs");
const path = require("path");
const rollupNodeResolve = require("rollup-plugin-node-resolve");
const rollupTypescript2 = require("rollup-plugin-typescript2");
const rollupBabel = require("rollup-plugin-babel");
const rollupTerser = require("rollup-plugin-terser");
const rollupCommonjs = require("rollup-plugin-commonjs");
const mime = require("mime");

const cwd = process.cwd();
const pkg = require(path.join(cwd, "package.json"));

const isProduction = process.env.NODE_ENV === "production";
const input = [path.resolve(cwd, `src/${pkg.config.widgetName}.tsx`)];
const outputPath = path.resolve(
    cwd,
    `dist/tmp/widgets/com/mendix/widget/native/${pkg.config.widgetName.toLowerCase()}`
);

function fixPreservedModules() {
    return {
        name: "fix-preserved-modules",
        renderChunk: code => code.replace(/\.[tj]sx?(["'])/g, "$1"),
        writeBundle: bundle =>
            Promise.all([
                /**
                 * The output files can still have a .ts(x) extension, even though they were transpiled.
                 * Some helper files even have no extension. Rename these files to the expected .js extension.
                 */
                ...Object.keys(bundle)
                    .map(filePath => path.join(outputPath, filePath))
                    .filter(fullPath => [".tsx", ".ts", ""].includes(path.extname(fullPath)))
                    .map(fullPath => fs.promises.rename(fullPath, fullPath.replace(/\.tsx?$/, "") + ".js")),
                /**
                 * When a widget has dependencies, the entry point ends up in a subfolder.
                 * In this case create a new entry point that re-exports the original.
                 */
                ...input
                    .filter(() => !Object.keys(bundle).includes(pkg.config.widgetName + ".tsx"))
                    .map(filePath => {
                        const relativePathToContent = path.relative(cwd, filePath);
                        const reexportCode = `export * from "./${removeExtension(relativePathToContent)}";`;
                        const outputFile = path.join(outputPath, pkg.config.widgetName + ".js");
                        return fs.promises.writeFile(outputFile, reexportCode, { encoding: "utf8" });
                    })
            ])
    };

    function removeExtension(str) {
        const res = str.split(".");
        if (res.length > 1) {
            res.pop();
        }
        return res.join(".");
    }
}

function copyNativeAssets() {
    return {
        name: "copy-native-assets",
        writeBundle: bundle => {
            /**
             * React Native uses `require` statements for importing static files like images, which are not handled by Rollup.
             * This plugin reads the statements and copies the corresponding files to the output folder.
             */
            return Promise.all(
                Object.values(bundle)
                    .reduce((copyTasks, source) => {
                        const regexp = /require\(['"]([^'"]+?\.(?:png|jpg|gif))['"]\)/g;
                        let match;
                        while ((match = regexp.exec(source.code)) !== null) {
                            const src = path.join(path.dirname(source.facadeModuleId), match[1]);
                            const dest = path.join(outputPath, path.dirname(source.fileName), match[1]);
                            if (!copyTasks.some(task => task.src === src)) {
                                copyTasks.push({ src, dest });
                            }
                        }
                        return copyTasks;
                    }, [])
                    .map(({ src, dest }) => fs.promises.copyFile(src, dest))
            );
        }
    };
}

function inlineNativeAssets() {
    return {
        name: "inline-native-assets",
        writeBundle: bundle => {
            /**
             * React Native uses `require` statements for importing static files like images, which are not handled by Rollup.
             * This plugin reads the statements and transforms them into nasty inline data uri's.
             */
            return Promise.all(
                Object.values(bundle).map(source => {
                    const regexp = /require\(['"]([^'"]+?\.(?:png|jpg|gif))['"]\)/g;
                    const inlined = source.code.replace(regexp, (match, requirePath) => {
                        const src = path.join(path.dirname(source.facadeModuleId), requirePath);
                        const data = fs.readFileSync(src, { encoding: "base64" });
                        const mimeType = mime.getType(src);
                        return `{ uri: "data:${mimeType};base64,${data}" }`;
                    });
                    const dest = path.join(outputPath, source.fileName.replace(/\.tsx?$/, ".js"));
                    return fs.promises.writeFile(dest, inlined);
                })
            );
        }
    };
}

const config = {
    input,
    external: [
        "react",
        "react-dom",
        "react-native",
        "react-native/Libraries/StyleSheet/StyleSheet",
        /\/react-native\//,
        "react-native-camera",
        "react-native-firebase",
        "react-native-maps",
        "react-native-svg",
        "react-native-video",
        "react-native-view-shot",
        "react-native-webview"
    ],
    preserveModules: true,
    plugins: [
        rollupNodeResolve({
            browser: true
        }),
        rollupTypescript2({ cacheRoot: "./dist/rpt2_cache" }),
        rollupBabel({
            exclude: [/node_modules\/colorsys/],
            plugins: [
                "@babel/plugin-transform-react-jsx",
                "@babel/plugin-proposal-class-properties",
                "@babel/plugin-transform-flow-strip-types"
            ]
        }),
        rollupCommonjs({
            include: /node_modules/,
            namedExports: {
                "d3-interpolate-path": ["interpolatePath"]
            }
        }),
        ...(isProduction ? [rollupTerser.terser()] : []),
        fixPreservedModules(),
        /** Replace inlineNativeAssets by copyNativeAssets when the native app supports this */
        inlineNativeAssets()
    ]
};

module.exports = config;
