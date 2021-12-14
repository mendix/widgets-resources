import { join, extname } from "path";
import json from "@rollup/plugin-json";
import replace from "rollup-plugin-re";
import command from "rollup-plugin-command";
import copy from "recursive-copy";
import through from "through2";

export default args => {
    const outDir = join(__dirname, "dist/tmp/widgets/ckeditor");
    const result = args.configDefaultConfig;
    return result.map((config, index) => {
        // Only copying on first step is enough
        if (index === 0) {
            config.plugins.push(copyCKEditorDirToDist(outDir));
        }

        /* Need to replace icon path from bundled js files, it's step 0 and 1, 
        tried to find much safer comparison but there are no uniqueness, so the best idea is to replace the path by index */
        /* if (index === 0 || index === 1) {
            config.plugins.push(replaceIconPath());
        }*/

        /* this step is required by sanitize-html library */
        config.plugins.push(json());
        return { ...config };
    });
};

function copyCKEditorDirToDist(outDir) {
    return command([
        async () => {
            return copy("../../../node_modules/ckeditor4/", outDir, {
                transform: src => {
                    /* we need to empty every single css inside the folder to avoid duplicate bundling,
                     because if the file even not imported anywhere it will be compiled inside RichText.js and RichText.mjs */
                    if (extname(src) === ".css") {
                        return through((chunk, enc, done) => {
                            done(null, "");
                        });
                    }
                },
                overwrite: true,
                // This list is not final, it's minimal working version, later we can exclude some folders from Plugin directory
                filter: [
                    "**/assets/**/*.*",
                    "**/lang/**/*.*",
                    "**/skins/moono-lisa/**",
                    "**/plugins/**/*.*",
                    "**/ckeditor.js",
                    "**/config.js",
                    "**/styles.js",
                    "**/contents.css",
                    "**/README.md",
                    "**/SECURITY.md",
                    "!**/samples/**/*.*"
                ]
            });
        }
    ]);
}

function replaceIconPath() {
    return replace({
        patterns: [
            {
                test: "icons.png",
                replace: "widgets/ckeditor/skins/moono-lisa/icons.png"
            },
            {
                test: "icons_hidpi.png",
                replace: "widgets/ckeditor/skins/moono-lisa/icons_hidpi.png"
            }
        ]
    });
}
