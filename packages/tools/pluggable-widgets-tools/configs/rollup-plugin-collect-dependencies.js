import fg from "fast-glob";
import { readJson, writeJson } from "fs-extra";
import { existsSync } from "fs";
import { dirname, join } from "path";
import copy from "recursive-copy";
import { promisify } from "util";
import resolve from "resolve";

export function collectDependencies({ onlyNative, outputDir, widgetName }) {
    const managedDependencies = [];
    let rollupOptions;
    return {
        name: "collect-native-deps",
        async buildStart(options) {
            rollupOptions = options;
            managedDependencies.length = 0;
        },
        async resolveId(source, importer) {
            if (source.startsWith(".") || source.startsWith("/")) {
                return null;
            }
            const resolvedPackagePath = await resolvePackage(
                source,
                dirname(importer ? importer : rollupOptions.input[0])
            );
            if (resolvedPackagePath && (!onlyNative || (await hasNativeCode(resolvedPackagePath)))) {
                if (!managedDependencies.includes(resolvedPackagePath)) {
                    managedDependencies.push(resolvedPackagePath);
                }
                return { external: true, id: source };
            }
            return null;
        },
        async writeBundle() {
            const nativeDependencies = new Set(
                onlyNative ? managedDependencies : await asyncWhere(managedDependencies, hasNativeCode)
            );

            for (let i = 0; i < managedDependencies.length; ++i) {
                const dependency = managedDependencies[i];
                const destinationPath = join(outputDir, "node_modules", getModuleName(dependency));
                await copyJsModule(dependency, destinationPath);

                const transitiveDependencies = await getTransitiveDependencies(dependency, rollupOptions.external);
                for (const transitiveDependency of transitiveDependencies) {
                    if (await hasNativeCode(transitiveDependency)) {
                        nativeDependencies.add(dependency);
                        if (!managedDependencies.includes(transitiveDependency)) {
                            managedDependencies.push(transitiveDependency);
                        }
                    } else if (!transitiveDependency.startsWith(dependency)) {
                        await copyJsModule(
                            transitiveDependency,
                            join(destinationPath, "node_modules", getModuleName(transitiveDependency))
                        );
                    }
                }
            }

            await writeNativeDependenciesJson(nativeDependencies, outputDir, widgetName);
        }
    };
}

async function resolvePackage(target, sourceDir) {
    const targetParts = target.split("/");
    const targetPackage = targetParts[0].startsWith("@") ? `${targetParts[0]}/${targetParts[1]}` : targetParts[0];
    try {
        return dirname(await promisify(resolve)(join(targetPackage, "package.json"), { basedir: sourceDir }));
    } catch (e) {
        if (e.message.includes("Cannot find module") && /\.((j|t)sx?)|json|(pn|jpe?|sv)g|(tif|gi)f$/g.test(targetPackage)) {
            throw e;
        }
        return undefined;
    }
}

async function hasNativeCode(dir) {
    return (await fg(["**/{android,ios}/*", "**/*.podspec"], { cwd: dir })).length > 0;
}

async function getTransitiveDependencies(packagePath, isExternal) {
    const queue = [packagePath];
    const result = new Set();
    while (queue.length) {
        const nextPath = queue.shift();
        if (result.has(nextPath)) {
            continue;
        }
        result.add(nextPath);

        const packageJson = await readJson(join(nextPath, "package.json"));
        const dependencies = (packageJson.dependencies ? Object.keys(packageJson.dependencies) : []).concat(
            packageJson.peerDependencies ? Object.keys(packageJson.peerDependencies) : []
        );
        for (const dependency of dependencies) {
            if (isExternal(dependency)) {
                continue;
            }
            queue.push(await resolvePackage(dependency, nextPath));
        }
    }
    return Array.from(result);
}

async function copyJsModule(moduleSourcePath, to) {
    if (existsSync(to)) {
        return;
    }
    return promisify(copy)(moduleSourcePath, to, {
        filter: [
            "**/*.*",
            "{license,LICENSE}",
            "!**/{android,ios,windows,mac,jest,github,gradle,__*__,docs,jest,example*}/**/*",
            "!**/*.{config,setup}.*",
            "!**/*.{podspec,flow}"
        ]
    });
}

function getModuleName(modulePath) {
    return modulePath.split(/[\\/]node_modules[\\/]/).pop();
}

async function writeNativeDependenciesJson(nativeDependencies, outputDir, widgetName) {
    if (nativeDependencies.size === 0) {
        return;
    }
    const dependencies = {};
    for (const dependency of nativeDependencies) {
        const dependencyJson = await readJson(join(dependency, "package.json"));
        dependencies[dependencyJson.name] = dependencyJson.version;
    }
    await writeJson(join(outputDir, `${widgetName}.json`), { nativeDependencies: dependencies }, { spaces: 2 });
}

async function asyncWhere(array, filter) {
    return (await Promise.all(array.map(async el => ((await filter(el)) ? [el] : [])))).flat();
}
