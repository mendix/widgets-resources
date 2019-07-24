import { promises as fs, readFileSync } from "fs";
import mime from "mime";
import { dirname, extname, join, resolve } from "path";
import { OutputChunk, Plugin, RollupOptions } from "rollup";
import rollupBabel from "rollup-plugin-babel";
import rollupCommonjs from "rollup-plugin-commonjs";
import rollupNodeResolve from "rollup-plugin-node-resolve";
import rollupTypescript2 from "rollup-plugin-typescript2";

const cwd = process.cwd();
const widgetName = process.env.npm_package_config_widgetName!;

const input = [resolve(cwd, `src/${widgetName}.tsx`)];
const outputPath = resolve(cwd, `dist/tmp/widgets/com/mendix/widget/native/${widgetName.toLowerCase()}`);

function fixPreservedModules(): Plugin {
    return {
        name: "fix-preserved-modules",
        renderChunk,
        writeBundle: bundle =>
            Promise.all([
                /**
                 * The output files can still have a .ts(x) extension, even though they were transpiled.
                 * Some helper files even have no extension. Rename these files to the expected .js extension.
                 */
                ...Object.keys(bundle)
                    .map(filePath => join(outputPath, filePath))
                    .filter(fullPath => [".tsx", ".ts", ""].includes(extname(fullPath)))
                    .map(fullPath => fs.rename(fullPath, fullPath.replace(/\.tsx?$/, "") + ".js")),
                /**
                 * When a widget has dependencies, the entry point ends up in a subfolder.
                 * In this case create a new entry point that re-exports the original.
                 */
                ...Object.keys(bundle)
                    .filter(filePath => filePath.includes(widgetName + ".tsx"))
                    .map(entryFilePath => {
                        const reexportCode = `export * from "./${removeExtension(entryFilePath)}";`;
                        const outputFile = join(outputPath, widgetName + ".js");
                        return fs.writeFile(outputFile, reexportCode, { encoding: "utf8" });
                    })
            ]) as Promise<any>
    };

    function removeExtension(str: string) {
        const res = str.split(".");
        if (res.length > 1) {
            res.pop();
        }
        return res.join(".");
    }

    function renderChunk(code: string): string {
        code = code.replace(/\.[tj]sx?(["'])/g, "$1");
        code = code.replace(/(["'])(big)(["'])/g, "'big.js'");
        return code;
    }
}

/**
 * React Native uses `require` statements for importing static files like images, which are not handled by Rollup.
 * This plugin reads the statements and transforms them into nasty inline data uri's.
 */
function inlineNativeAssets(): Plugin {
    return {
        name: "inline-native-assets",
        writeBundle: bundle =>
            Promise.all(
                Object.values(bundle)
                    .filter((source): source is OutputChunk => !!source.code && !!source.facadeModuleId)
                    .map(source => {
                        const regexp = /require\(['"]([^'"]+?\.(?:png|jpg|gif))['"]\)/g;
                        const inlined = source.code.replace(regexp, (_match, requirePath) => {
                            const src = join(dirname(source.facadeModuleId!), requirePath);
                            const data = readFileSync(src, { encoding: "base64" });
                            const mimeType = mime.getType(src);
                            return `{ uri: "data:${mimeType};base64,${data}" }`;
                        });
                        const dest = join(outputPath, source.fileName.replace(/\.tsx?$/, ".js"));
                        return fs.writeFile(dest, inlined);
                    })
            ) as Promise<any>
    };
}

function isExternal(id: string): boolean {
    const externals = [
        "big.js",
        "react",
        "react-dom",
        "react-native",
        "react-native-camera",
        "react-native-firebase",
        "react-native-geocoder",
        "react-native-maps",
        "react-native-svg",
        "react-native-video",
        "react-native-view-shot",
        "react-native-webview"
    ];
    const regexExternals = [/^react-native\//, /react-native-vector-icons/, /^mendix\//];

    return externals.includes(id) || regexExternals.some(regex => regex.test(id));
}

export const rollupConfig: RollupOptions = {
    input,
    external: isExternal,
    preserveModules: true,
    plugins: [
        rollupNodeResolve({
            browser: true
        }),
        rollupTypescript2({
            cacheRoot: "./dist/rpt2_cache"
        }),
        rollupBabel({
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
        fixPreservedModules(),
        inlineNativeAssets()
    ]
};
