import { promises as fs } from "fs";
import { extname, join } from "path";
import { listDir, execShellCommand } from "./shared";

const { transformPackage } = require("../dist/typings-generator");

export function widgetTyping({ sourceDir }) {
    let firstRun = true;
    let filePaths = [];

    return {
        name: "widget-typing",
        async options(options) {
            // We have to run transformation before typescript starts its resolution cache =>
            // before the first buildStart starts, because buildStart is a "parallel" hook
            filePaths = await runTransformation(sourceDir);
            return options;
        },
        async buildStart() {
            (await listDir(sourceDir))
                .filter(path => extname(path) === ".xml")
                .forEach(path => this.addWatchFile(path));

            if (!firstRun) {
                filePaths = await runTransformation(sourceDir);
            }
            await execShellCommand(
                `npx pluggable-widgets-tools format:custom-files -- ${filePaths.map(f => `"${f}"`).join(" ")}`,
                sourceDir
            );
            firstRun = false;
        }
    };
}

async function runTransformation(sourceDir) {
    return transformPackage(await fs.readFile(join(sourceDir, "package.xml"), { encoding: "utf8" }), sourceDir);
}
