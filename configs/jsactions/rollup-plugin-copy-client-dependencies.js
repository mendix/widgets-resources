import { promises } from "fs";
import { copy } from "fs-extra";
import { basename, dirname, extname, join } from "path";

export function copyClientDependencies(clientDependencies, outputDir) {
    const nodeModulesPath = join(outputDir, "node_modules");
    return {
        name: "copy-client-deps",
        async writeBundle() {
            await Promise.all(
                clientDependencies.map(async dependency => {
                    await copyJsModule(
                        dirname(require.resolve(`${dependency}/package.json`)),
                        join(nodeModulesPath, dependency)
                    );
                })
            );
        }
    };

    async function copyJsModule(from, to) {
        await copy(from, to, {
            filter: async path =>
                (await promises.lstat(path)).isDirectory()
                    ? !/android|ios|windows|macos|.?(github|gradle)|__(tests|mocks)__|docs|jest|examples?/.test(
                          basename(path)
                      )
                    : /.*.(jsx?|json|tsx?)$/.test(extname(path)) || basename(path).toLowerCase().includes("license")
        });
    }
}
