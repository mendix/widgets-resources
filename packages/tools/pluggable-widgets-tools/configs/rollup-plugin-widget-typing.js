import { promises as fs } from "fs";
import { extname, join } from "path";
import { listDir } from "./shared";

const { transformPackage } = require("../dist/typings-generator");

export function widgetTyping({ sourceDir }) {
    let firstRun = true;

    return {
        name: "widget-typing",
        async options(options) {
            // We have to run transformation before typescript starts its resolution cache =>
            // before the first buildStart starts, because buildStart is a "parallel" hook
            await runTransformation(sourceDir);
            return options;
        },
        async buildStart() {
            (await listDir(sourceDir))
                .filter(path => extname(path) === ".xml")
                .forEach(path => this.addWatchFile(path));

            if (!firstRun) {
                await runTransformation(sourceDir);
            }
            firstRun = false;
        }
    };
}

async function runTransformation(sourceDir) {
    await transformPackage(await fs.readFile(join(sourceDir, "package.xml"), { encoding: "utf8" }), sourceDir);
}
