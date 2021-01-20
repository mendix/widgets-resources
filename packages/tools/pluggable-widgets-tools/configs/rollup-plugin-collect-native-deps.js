import { basename, dirname, extname, join } from "path";
import { copy, readJson, writeJson } from "fs-extra";
import { promises } from "fs";
import { rm } from "shelljs";

export function collectNativeDependencies({ outputDir, externals, widgetName, shouldCopyNodeModules = true }) {
    let firstRun = true;
    const nativeDependencies = [];
    const nodeModulesPath = join(outputDir, "node_modules");
    return {
        name: "collect-native-deps",
        async resolveId(source) {
            if (source.startsWith(".")) {
                return null;
            }

            try {
                const packageFilePath = require.resolve(`${source}/package.json`);
                const packageDir = dirname(packageFilePath);

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
        async buildStart() {
            if (shouldCopyNodeModules) {
                rm("-rf", nodeModulesPath);
                if (!firstRun) {
                    nativeDependencies.length = 0;
                }
                firstRun = false;
            }
        },
        async writeBundle() {
            if (shouldCopyNodeModules) {
                await Promise.all(
                    nativeDependencies.map(async dependency => {
                        await copyJsModule(dependency.dir, join(nodeModulesPath, dependency.name));
                        for (const transitiveDependency of await getTransitiveDependencies(
                            dependency.name,
                            externals
                        )) {
                            await copyJsModule(
                                dirname(require.resolve(`${transitiveDependency}/package.json`)),
                                join(nodeModulesPath, dependency.name, "node_modules", transitiveDependency)
                            );
                        }
                    })
                );
                await writeNativeDependenciesJson({ nativeDependencies, outputDir, widgetName });
            }
        }
    };
}

async function writeNativeDependenciesJson({ nativeDependencies, outputDir, widgetName }) {
    if (nativeDependencies.length === 0) {
        return;
    }
    const dependencies = {};
    for (const dependency of nativeDependencies) {
        dependencies[dependency.name] = (await readJson(join(dependency.dir, "package.json"))).version;
    }
    await writeJson(join(outputDir, `${widgetName}.json`), { nativeDependencies: dependencies }, { spaces: 2 });
}

async function hasNativeCode(dir) {
    const packageContent = await promises.readdir(dir, { withFileTypes: true });

    if (packageContent.some(file => /^(ios|android|.*\.podspec)$/i.test(file.name))) {
        return true;
    }

    for (const file of packageContent) {
        if (file.isDirectory() && (await hasNativeCode(join(dir, file.name)))) {
            return true;
        }
    }
    return false;
}

async function getTransitiveDependencies(packageName, externals) {
    const queue = [packageName];
    const result = new Set();
    while (queue.length) {
        const next = queue.shift();
        if (result.has(next)) {
            continue;
        }
        const isExternal = externals.some(external =>
            external instanceof RegExp ? external.test(next) : external === next
        );
        if (isExternal) {
            continue;
        }

        if (next !== packageName) {
            result.add(next);
        }
        const packageJson = await readJson(require.resolve(`${next}/package.json`));
        queue.push(...Object.keys(packageJson.dependencies || {}));
    }
    return Array.from(result);
}

async function copyJsModule(from, to) {
    await copy(from, to, {
        filter: async path =>
            (await promises.lstat(path)).isDirectory()
                ? !["android", "ios", "windows", "macos", ".github", "__tests__", "jest", "__mocks__"].includes(
                      basename(path)
                  )
                : [".js", ".jsx", ".json", ".ts", ".tsx"].includes(extname(path)) ||
                  basename(path).toLowerCase().includes("license")
    });
}
