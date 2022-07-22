/* eslint-disable @typescript-eslint/explicit-function-return-type */

import fg from "fast-glob";
import { readJson, writeJson } from "fs-extra";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { dirname, join, parse } from "path";
import copy from "recursive-copy";
import { promisify } from "util";
import resolve from "resolve";
import _ from "lodash";
import moment from "moment";
import mkdirp from "mkdirp";
import { LICENSE_GLOB } from "./common/glob";

const dependencies = [];
export function collectDependencies({
    onlyNative,
    outputDir,
    widgetName,
    licenseOptions = null,
    copyJsModules = true
}) {
    const licensePlugin = new LicensePlugin(licenseOptions);
    const managedDependencies = [];
    let rollupOptions;
    return {
        name: "collect-native-deps",
        async buildStart(options) {
            rollupOptions = options;
            managedDependencies.length = 0;
        },
        async resolveId(source, importer) {
            // eslint-disable-next-line no-control-regex
            const sourceCleanedNullChar = source.replace(/\x00/g, "");
            if (sourceCleanedNullChar.startsWith(".") || sourceCleanedNullChar.startsWith("/")) {
                return null;
            }
            const resolvedPackagePath = await resolvePackage(
                source,
                dirname(importer ? importer : rollupOptions.input[0])
            );

            if (resolvedPackagePath) {
                const isNotOnlyNativeOrHasNativeCode = !onlyNative || (await hasNativeCode(resolvedPackagePath));
                if (isNotOnlyNativeOrHasNativeCode && !managedDependencies.includes(resolvedPackagePath)) {
                    managedDependencies.push(resolvedPackagePath);
                }
                if (!dependencies.some(dependency => dependency.packagePath === resolvedPackagePath)) {
                    dependencies.push({ packagePath: resolvedPackagePath, isTransitive: false });
                }
                return isNotOnlyNativeOrHasNativeCode ? { external: true, id: source } : null;
            }
            return null;
        },
        async generateBundle() {
            if (!licenseOptions) {
                return;
            }
            for (const dependency of dependencies) {
                const packageJson = await scanDependency(dependency.packagePath);
                if (packageJson) {
                    licensePlugin.addDependency(packageJson, dependency);
                }
                const transitiveDependencies = await getTransitiveDependencies(
                    dependency.packagePath,
                    rollupOptions.external
                );
                for (const transitiveDependency of transitiveDependencies) {
                    if (!dependencies.some(s => s.packagePath === transitiveDependency)) {
                        dependencies.push({ packagePath: transitiveDependency, isTransitive: true });
                    }
                }
            }
            licensePlugin.config();
        },
        async writeBundle() {
            if (!copyJsModules) {
                return;
            }
            const nativeDependencies = new Set(
                onlyNative ? managedDependencies : await asyncWhere(managedDependencies, hasNativeCode)
            );

            for (const dependency of managedDependencies) {
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

async function resolvePackage(target, sourceDir, optional = false) {
    const targetParts = target.split("/");
    const targetPackage = targetParts[0].startsWith("@") ? `${targetParts[0]}/${targetParts[1]}` : targetParts[0];
    try {
        return dirname(await promisify(resolve)(join(targetPackage, "package.json"), { basedir: sourceDir }));
    } catch (e) {
        if (
            e.message.includes("Cannot find module") &&
            !/\.((j|t)sx?)|json|(pn|jpe?|sv)g|(tif|gi)f$/g.test(targetPackage) &&
            !/configs\/jsActions/i.test(__dirname) && // Ignore errors about missing package.json in 'jsActions/**/src/*' folders
            !optional // Certain (peer)dependencies can be optional, ignore throwing an error if an optional (peer)dependency is considered missing.
        ) {
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
        const dependencies = Object.keys(packageJson.dependencies || {}).concat(
            Object.keys(packageJson.peerDependencies || {})
        );
        const optionalDependencies = Object.keys(packageJson.optionalDependencies || {}); // certain dependencies can be optionally available, described in package.json `optionalDependencies`.
        const optionalPeerDependencies = Object.entries(packageJson.peerDependenciesMeta || {}) // certain peerDependencies can be optionally available, described in package.json `peerDependencyMeta`.
            .filter(dependency => !!dependency[1].optional)
            .map(dependency => dependency[0]);

        for (const dependency of dependencies) {
            if (isExternal(dependency)) {
                continue;
            }
            const resolvedPackagePath = await resolvePackage(
                dependency,
                nextPath,
                optionalDependencies.includes(dependency) || optionalPeerDependencies.includes(dependency)
            );
            if (!resolvedPackagePath) {
                continue;
            }
            queue.push(resolvedPackagePath);
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
            LICENSE_GLOB,
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

async function scanDependency(dir) {
    const packageJsonPath = join(dir, "package.json");
    if (!existsSync(packageJsonPath)) {
        return null;
    }
    const packageJson = JSON.parse(readFileSync(packageJsonPath));
    const license = packageJson.license || packageJson.licenses;
    const hasLicense = license && license.length > 0;
    const name = packageJson.name;
    if (!name && !hasLicense) {
        return null;
    }
    const absolutePath = join(dir, LICENSE_GLOB);
    const licenseFile = (await fg([absolutePath], { cwd: dir, caseSensitiveMatch: false }))[0];
    if (licenseFile) {
        packageJson.licenseText = readFileSync(licenseFile, "utf-8");
    }
    return packageJson;
}

class LicensePlugin {
    constructor(options) {
        this._options = options;
        this._dependencies = {};
    }

    addDependency(packageJson, { isTransitive }) {
        const name = packageJson.name;
        if (!name) {
            console.warn("Trying to add dependency without any name, skipping it!");
        } else if (!_.has(this._dependencies, name)) {
            this._dependencies[name] = new Dependency({ ...packageJson, isTransitive });
        }
    }

    config() {
        if (!this._options) {
            return;
        }
        const thirdParty = this._options.thirdParty;
        if (!thirdParty) {
            return;
        }

        const thirdPartyOutput = thirdParty.output;

        if (thirdPartyOutput) {
            _.forEach(_.castArray(thirdPartyOutput), output => {
                this._exportThirdPartiesToOutput(_.chain(this._dependencies).values().value(), output);
            });
        }
    }

    _exportThirdPartiesToOutput(outputDependencies, output) {
        if (_.isFunction(output)) {
            output(outputDependencies);
            return;
        }

        const template = _.isString(output.template)
            ? dependencies => _.template(output.template)({ dependencies, _, moment })
            : output.template;

        const defaultTemplate = dependencies =>
            _.isEmpty(dependencies) ? "" : _.map(dependencies, d => d.text()).join("\n\n---\n\n");

        const text = _.isFunction(template) ? template(outputDependencies) : defaultTemplate(outputDependencies);
        const isOutputFile = _.isString(output);
        const file = isOutputFile ? output : output.file;
        const encoding = isOutputFile ? "utf-8" : output.encoding || "utf-8";
        mkdirp.sync(parse(file).dir);
        writeFileSync(file, (text || "").trim(), { encoding });
    }
}

class Dependency {
    constructor(packageJson) {
        this.name = packageJson.name || null;
        this.maintainers = packageJson.maintainers || [];
        this.version = packageJson.version || null;
        this.description = packageJson.description || null;
        this.repository = packageJson.repository || null;
        this.homepage = packageJson.homepage || null;
        this.private = packageJson.private || false;
        this.license = packageJson.license || null;
        this.licenseText = packageJson.licenseText || null;
        this.isTransitive = packageJson.isTransitive || false;
    }

    text() {
        const lines = [];

        lines.push(`Name: ${this.name}`);
        lines.push(`Version: ${this.version}`);
        lines.push(`License: ${this.license}`);
        lines.push(`Private: ${this.private}`);

        if (this.description) {
            lines.push(`Description: ${this.description || false}`);
        }

        if (this.repository) {
            const url = typeof this.repository === "string" ? this.repository : this.repository.url;
            lines.push(`Repository: ${url}`);
        }

        if (this.homepage) {
            lines.push(`Homepage: ${this.homepage}`);
        }

        if (this.licenseText) {
            lines.push("License Copyright:");
            lines.push("===");
            lines.push("");
            lines.push(this.licenseText);
        }

        return lines.join("\n");
    }
}
