export function bigJsImportReplacer() {
    return {
        name: "bigjs-import-replacer",
        async generateBundle(options, bundle) {
            const [filename] = Object.keys(bundle);
            const fileInfo = bundle[filename];

            fileInfo.code = fileInfo.code.replace("import { Big } from 'big.js';", `import { Big } from "big.js";`);
        }
    };
}
