import { promises as fs } from "fs";
import { extname, join } from "path";
import { listDir } from "./shared";

const { transformPackage } = require("../dist/typings-generator");

export async function widgetTyping({ sourceDir }) {
    // We have to run transformation before typescript starts its resolution cache =>
    // before first buildStart starts (this hook is "parallel")
    let firstRun = true;
    await runTransformation(sourceDir);

    return {
        name: "widget-typing",
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
