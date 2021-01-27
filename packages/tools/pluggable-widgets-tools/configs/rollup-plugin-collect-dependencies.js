import fg from "fast-glob";
import { readJson, writeJson } from "fs-extra";
import { existsSync } from "fs";
import { dirname, join } from "path";
import copy from "recursive-copy";
import { rm } from "shelljs";
import { promisify } from "util";

export function collectDependencies({
    externals,
    isJSAction = false,
    outputDir,
    copyNodeModules,
    removeNodeModules = true,
    widgetName
}) {
    const nativeDependencies = [];
    const jsActionsDependencies = [];
    const nodeModulesPath = join(outputDir, "node_modules");
    return {
        name: "collect-native-deps",
        async buildStart() {
            if (!copyNodeModules) {
                return;
            }
            if (removeNodeModules) {
                rm("-rf", nodeModulesPath);
            }
            nativeDependencies.length = 0;
        },
        async resolveId(source) {
            if (source.startsWith(".")) {
                return null;
            }
            return tryResolveDependency(
                externals,
                source,
                copyNodeModules,
                nativeDependencies,
                isJSAction,
                jsActionsDependencies
            );
        },
        async writeBundle() {
            if (!copyNodeModules) {
                return;
            }
            await Promise.all(
                [...nativeDependencies, ...jsActionsDependencies].map(async dependency => {
                    await copyJsModule(dependency.dir, join(nodeModulesPath, dependency.name));
                    for (const transitiveDependency of await getTransitiveDependencies(dependency.name, externals)) {
                        await copyJsModule(
                            dirname(require.resolve(`${transitiveDependency}/package.json`)),
                            join(nodeModulesPath, dependency.name, "node_modules", transitiveDependency)
                        );
                    }
                })
            );
            await writeNativeDependenciesJson(nativeDependencies, outputDir, widgetName);
        }
    };
}

async function tryResolveDependency(
    externals,
    source,
    copyNodeModules,
    nativeDependencies,
    isJSAction,
    jsActionsDependencies
) {
    try {
        const packageFilePath = require.resolve(`${source}/package.json`);
        const packageDir = dirname(packageFilePath);

        if (await hasNativeCode(packageDir)) {
            if (copyNodeModules && !nativeDependencies.some(x => x.name === source)) {
                await addDependencyWithTransitives(nativeDependencies, packageDir);
            }
            return { id: source, external: true };
        }
        if (isJSAction && !jsActionsDependencies.some(x => x.name === source)) {
            await addDependencyWithTransitives(jsActionsDependencies, packageDir);
            return { id: source, external: true };
        }
        return null;
    } catch (e) {
        return null;
    }

    async function addDependencyWithTransitives(dependencyList, packageDir) {
        dependencyList.push({ name: source, dir: packageDir });

        for (const transitiveDependency of await getTransitiveDependencies(source, externals)) {
            await tryResolveDependency(externals, transitiveDependency, copyNodeModules, dependencyList);
        }
    }
}

async function writeNativeDependenciesJson(nativeDependencies, outputDir, widgetName) {
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
    return (await fg(["**/{android,ios}/*", "**/*.podspec"], { cwd: dir })).length > 0;
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
        queue.push(...Object.keys(packageJson.peerDependencies || {}));
    }
    return Array.from(result);
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
