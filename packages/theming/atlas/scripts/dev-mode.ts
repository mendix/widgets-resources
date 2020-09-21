// clean dist
// create directories
// copy css fonts

// get mx project path from env var
// watch scss source, re-run compile and output

// watch ts source, re-run compile and output
import fs from "fs";
import { promisify } from "util";
import { render } from "sass";
import Fiber from "fibers";
import chokidar from "chokidar";

// const MX_PROJECT_PATH = process.env.ATLAS_MX_PROJECT_PATH;

const writeFile = promisify(fs.writeFile);
const renderSass = promisify(render);

// render sass
function compileSass(): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            console.info("Starting sass compilation...");
            const result = await renderSass({
                file: "./src/web/sass/main.scss",
                outFile: "./dist/web/css/main.css",
                sourceMap: true,
                // @types/sass outdated, it doesn't include the property below.
                // @ts-ignore
                fiber: Fiber
            });
            console.info("Sass compilation complete");

            if (!result.map) {
                reject(new Error("Did not receive sourcemap"));
            }

            console.info("Writing main.css...");
            await writeFile("./dist/web/css/main.css", result.css);
            console.info("main.css created");

            console.info("Writing main.css.map...");
            await writeFile("./dist/web/css/main.css.map", result.map!);
            console.info("main.css.map created");

            resolve();
        } catch (error) {
            reject(error);
        }
    });
}

(async function main() {
    console.info("Starting dev mode...");
    try {
        await compileSass();

        const sassWatcher = chokidar.watch("./src/web");

        sassWatcher.on("change", () => compileSass());
        sassWatcher.on("unlink", () => compileSass());
        sassWatcher.on("add", () => compileSass());
    } catch (error) {
        console.error(error.message);
        process.exit(error.status || 1);
    }
})();
