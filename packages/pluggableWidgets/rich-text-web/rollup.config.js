import { join, extname, dirname, basename } from "path";
import json from "@rollup/plugin-json";
import command from "rollup-plugin-command";
import copy from "recursive-copy";
import through from "through2";

export default args => {
    const outDir = join(__dirname, "dist/tmp/widgets/ckeditor");
    const customPluginsPath = join(__dirname, "src/assets/plugins");
    const result = args.configDefaultConfig;
    return result.map((config, index) => {
        // Copying only on first step is enough
        if (index === 0) {
            config.plugins = [
                ...config.plugins,
                copyCKEditorDirToDist(outDir),
                copyCustomPlugins(customPluginsPath, outDir)
            ];
        }

        /* this step is required by sanitize-html library */
        config.plugins.push(json());
        return config;
    });
};

function copyCustomPlugins(pluginsPath, outDir) {
    return command([async () => copy(dirname(pluginsPath), outDir, { overwrite: true })]);
}

function copyCKEditorDirToDist(outDir) {
    return command([
        async () => {
            return copy(dirname(require.resolve("ckeditor4")), outDir, {
                transform: src => {
                    /* we need to empty every single css (excluding editor and dialog) inside the folder to avoid duplicate bundling,
                     because even if the file is not imported anywhere it will be compiled inside RichText.js and RichText.mjs */
                    /* we need editor and dialog because it's required for loading styles on iframe elements (basically every dropdown,popup items from toolbar) */
                    if (extname(src) === ".css" && !/(editor(_gecko)?|dialog).css/gi.test(basename(src))) {
                        return through((chunk, enc, done) => done(null, ""));
                    }
                },
                overwrite: true,
                // This list is not final, it's minimal working version, later we can exclude some folders from Plugin directory
                filter: [
                    // we need lang because it's responsible for names and descriptions in toolbar and content in general
                    "**/lang/**/*.*",
                    // The look and feel of the CKEditor 4 user interface can be adjusted through skins (moono-lisa) is one of the defaults
                    "**/skins/moono-lisa/**",
                    // basically most of the items in toolbar are coming from plugins, specially if you choose full or standard version.
                    "**/plugins/**/*.*",
                    "**/ckeditor.js",
                    "**/config.js",
                    "**/styles.js",
                    "**/contents.css"
                ]
            });
        }
    ]);
}
