import { red, yellow } from "colors";
import fg from "fast-glob";
import { existsSync, mkdirSync } from "fs";
import { basename, dirname, join, relative } from "path";
import copy from "recursive-copy";
import clear from "rollup-plugin-clear";
import command from "rollup-plugin-command";
import { promisify } from "util";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { collectDependencies } from "../../packages/tools/pluggable-widgets-tools/configs/rollup-plugin-collect-dependencies";

const cwd = process.cwd();

export default async args => {
    const jsActionTargetFolder = `javascriptsource/${args.configProject ?? "nativemobileresources"}/actions`;
    const result = [];
    const files = await fg([join(cwd, "src", "**/*.ts")]);
    const outDir = join(cwd, "dist");

    const nodeResolvePlugin = nodeResolve({ preferBuiltins: false, mainFields: ["module", "browser", "main"] });
    const typescriptPlugin = typescript({
        noEmitOnError: false,
        sourceMap: false,
        inlineSources: false,
        target: "es2019",
        types: ["mendix-client", "big.js", "react-native"],
        allowSyntheticDefaultImports: true
    });

    files.forEach((file, i) => {
        const fileInput = relative(cwd, file);
        const fileOutput = basename(file, ".ts");
        result.push({
            input: fileInput,
            output: {
                format: "es",
                file: join(outDir, `${fileOutput}.js`),
                sourcemap: false
            },
            external: nativeExternal,
            plugins: [
                i === 0 ? clear({ targets: [outDir] }) : null,
                collectDependencies({
                    onlyNative: false,
                    outputDir: outDir,
                    widgetName: fileOutput
                }),
                nodeResolvePlugin,
                typescriptPlugin,
                i === files.length - 1
                    ? command([
                          async () => {
                              await Promise.all(
                                  clientDependencies.map(async dependency => {
                                      await copyJsModule(
                                          dirname(require.resolve(`${dependency}/package.json`)),
                                          join(join(outDir, "node_modules"), dependency)
                                      );
                                  })
                              );

                              const destinationFolder = join(cwd, "tests/testProject/", jsActionTargetFolder);
                              const destinations = [
                                  destinationFolder,
                                  ...[
                                      process.env.MX_PROJECT_PATH
                                          ? join(process.env.MX_PROJECT_PATH, jsActionTargetFolder)
                                          : undefined
                                  ]
                              ];

                              destinations.filter(Boolean).forEach(destination => {
                                  mkdirSync(destination, { recursive: true });
                                  copy(outDir, destination, { filter: ["**/*"], overwrite: true });
                              });
                          }
                      ])
                    : null
            ],
            onwarn
        });
    });

    return result;

    function onwarn(warning) {
        const description =
            (warning.plugin ? `(${warning.plugin} plugin) ` : "") +
            (warning.loc ? `${relative(cwd, warning.loc.file)} (${warning.loc.line}:${warning.loc.column}) ` : "") +
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

    async function copyJsModule(from, to) {
        if (existsSync(join(to, "package.json"))) {
            return;
        }
        return promisify(copy)(from, to, {
            filter: [
                "**/*.*",
                "{license,LICENSE}",
                "!**/{android,ios,windows,mac,jest,github,gradle,__*__,docs,jest,example*}/**/*",
                "!**/*.{config,setup}.*",
                "!**/*.{podspec,flow}"
            ]
        });
    }
};

const nativeExternal = [
    /^mendix\//,
    /^react-native(\/|$)/,
    "big.js",
    "react",
    /react-native-gesture-handler\/*/,
    /^react-native-reanimated(\/|$)/,
    /^react-native-svg(\/|$)/,
    /^react-native-vector-icons(\/|$)/,
    /^react-navigation(\/|$)/
];

// These libraries are being used silently by @react-native-community/cameraroll and @react-native-community/geolocation and both dont have these libs as a peer or dependency
const clientDependencies = ["fbjs", "invariant"];
