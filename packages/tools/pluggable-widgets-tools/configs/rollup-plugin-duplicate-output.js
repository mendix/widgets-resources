import { outputFile } from "fs-extra";
import { relative, resolve } from "path";

export function duplicateOutput(config) {
    return {
        name: "duplicate-output",
        async writeBundle(options, bundle) {
            const relativePath = relative(config.from, options.file);
            if (!options.file || !relativePath || relativePath.startsWith("..")) {
                throw new Error("Unexpected location of a resource");
            }
            if (Object.entries(bundle).length !== 1) {
                throw new Error("Do not support copying multi-part bundle");
            }
            await outputFile(resolve(config.to, relativePath), Object.values(bundle)[0].code);
        }
    };
}
