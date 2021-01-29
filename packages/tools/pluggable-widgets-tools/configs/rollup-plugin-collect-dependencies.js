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
            for (const dependencyPath of managedDependencies) {
                const destinationPath = join(outputDir, "node_modules", getModuleName(dependencyPath));
                await copyJsModule(dependencyPath, destinationPath);

                for (const transitiveDependencyPath of await getNotNestedDependencies(
                    dependencyPath,
                    rollupOptions.external
                )) {
                    await copyJsModule(
                        dependencyPath,
                        join(destinationPath, "node_modules", getModuleName(transitiveDependencyPath))
                    );
                }
            }

            const nativeDependencies = !onlyNative
                ? await asyncFlatMap(managedDependencies, async dir => ((await hasNativeCode(dir)) ? [dir] : []))
                : managedDependencies;
            await writeNativeDependenciesJson(nativeDependencies, outputDir, widgetName);
        }
    };
}

async function resolvePackage(target, sourceDir) {
    const targetParts = target.split("/");
    const targetPackage = targetParts[0].startsWith("@") ? `${targetParts[0]}/${targetParts[1]}` : targetParts[0];
    try {
        return dirname(await promisify(resolve)(`${targetPackage}/package.json`, { basedir: sourceDir }));
    } catch (e) {
        return undefined;
    }
}

async function hasNativeCode(dir) {
    return (await fg(["**/{android,ios}/*", "**/*.podspec"], { cwd: dir })).length > 0;
}

async function getNotNestedDependencies(packagePath, isExternal) {
    const packageJson = await readJson(join(packagePath, "package.json"));
    const dependencies = (packageJson.dependencies ? Object.keys(packageJson.dependencies) : []).concat(
        packageJson.peerDependencies ? Object.keys(packageJson.peerDependencies) : []
    );
    const result = [];
    for (const dependency of dependencies) {
        if (isExternal(dependency)) {
            continue;
        }
        const dependencyPath = await resolvePackage(dependency, packagePath);
        if (!dependencyPath.startsWith(packagePath)) {
            result.push(dependencyPath);
        }
    }
    return result;
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
    if (nativeDependencies.length === 0) {
        return;
    }
    const dependencies = {};
    for (const dependency of nativeDependencies) {
        const dependencyJson = await readJson(join(dependency, "package.json"));
        dependencies[dependencyJson.name] = dependencyJson.version;
    }
    await writeJson(join(outputDir, `${widgetName}.json`), { nativeDependencies: dependencies }, { spaces: 2 });
}

async function asyncFlatMap(array, mapper) {
    return (await Promise.all(array.map(mapper))).flat();
}
