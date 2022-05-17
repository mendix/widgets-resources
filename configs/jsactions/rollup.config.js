/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { red, yellow } from "colors";
import fg from "fast-glob";
import { mkdirSync } from "fs";
import { basename, dirname, join, posix, relative, sep } from "path";
import copy from "recursive-copy";
import clear from "rollup-plugin-clear";
import command from "rollup-plugin-command";
import { promisify } from "util";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { collectDependencies } from "../../packages/tools/pluggable-widgets-tools/configs/rollup-plugin-collect-dependencies";
import {
    licenseCustomTemplate,
    copyLicenseFile
} from "../../packages/tools/pluggable-widgets-tools/configs/helpers/rollup-helper";
import { bigJsImportReplacer } from "./rollup-plugin-bigjs-import-replacer";

const cwd = process.cwd();

export default async args => {
    const jsActionTargetFolder = `javascriptsource/${args.configProject ?? "nativemobileresources"}/actions`;
    const result = [];
    const posixPath = join(cwd, "src", "**/*.ts").split(sep).join(posix.sep); // Always use forward slashes
    const files = await fg([posixPath]); // fast-glob only works with forward slashes
    const outDir = join(cwd, "dist");
    const isWeb = args.configEnv === "web";

    const nodeResolvePlugin = nodeResolve({ preferBuiltins: false, mainFields: ["module", "browser", "main"] });
    const typescriptPlugin = typescript({
        noEmitOnError: false,
        sourceMap: false,
        inlineSources: false,
        target: "es2019",
        types: ["mendix-client", "react-native"],
        allowSyntheticDefaultImports: true
    });

    const copyAsync = promisify(copy);

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
                    copyJsModules: !isWeb,
                    onlyNative: false,
                    outputDir: outDir,
                    widgetName: fileOutput,
                    licenseOptions: {
                        thirdParty: {
                            includePrivate: true,
                            output: [
                                {
                                    file: join(outDir, "dependencies.txt")
                                },
                                {
                                    file: join(outDir, "dependencies.json"),
                                    template: licenseCustomTemplate
                                }
                            ]
                        }
                    }
                }),
                nodeResolvePlugin,
                typescriptPlugin,
                bigJsImportReplacer(),
                i === files.length - 1
                    ? command([
                          async () => copyLicenseFile(cwd, outDir),
                          async () => {
                              if (!isWeb) {
                                  if (args.configProject === "nativemobileresources") {
                                      // `fbjs/lib/invariant` is being used silently by @react-native-community/cameraroll; it is not listed as a dependency nor peerDependency.
                                      // https://github.dev/react-native-cameraroll/react-native-cameraroll/blob/7c269a837d095a2cb5f4ce13b54ab3060455b17f/js/CameraRoll.js#L14
                                      const path = join(outDir, "node_modules", "fbjs", "lib");
                                      mkdirSync(path, { recursive: true });
                                      await copyAsync(
                                          join(dirname(require.resolve("fbjs")), "lib", "invariant.js"),
                                          join(path, "invariant.js")
                                      );
                                  } else if (args.configProject === "nanoflowcommons") {
                                      // `invariant` is being used silently by @react-native-community/geolocation; it is not listed as a dependency nor peerDependency.
                                      // https://github.dev/react-native-geolocation/react-native-geolocation/blob/1786929f2be581da91082ff857c2393da5e597b3/js/implementation.native.js#L13
                                      await copyAsync(
                                          dirname(require.resolve("invariant")),
                                          join(outDir, "node_modules", "invariant")
                                      );
                                  }
                              }

                              // this is helpful to copy the files and folders to a test project path for dev/testing purposes.
                              if (process.env.MX_PROJECT_PATH) {
                                  const destination = join(process.env.MX_PROJECT_PATH, jsActionTargetFolder);
                                  mkdirSync(destination, { recursive: true });
                                  copy(outDir, destination, { filter: ["**/*"], overwrite: true });
                              }
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
};

const nativeExternal = [
    /^mendix\//,
    /^react-native(\/|$)/,
    /^react-native-windows(\/|$)/,
    /^react-native-web(\/|$)/,
    "big.js",
    "react",
    /react-native-gesture-handler\/*/,
    /^react-native-reanimated(\/|$)/,
    /^react-native-svg(\/|$)/,
    /^react-native-vector-icons(\/|$)/,
    /^react-navigation(\/|$)/,
    /^react-native-device-info(\/|$)/
];
