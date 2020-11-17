import { promises as fs } from "fs";
import { extname, join } from "path";
import { listDir } from "./shared";

const { transformPackage } = require("../dist/typings-generator");

export function widgetTyping({ sourceDir }) {
    return {
        name: "widget-typing",
        async buildStart() {
            (await listDir(sourceDir))
                .filter(path => extname(path) === ".xml")
                .forEach(path => this.addWatchFile(path));
            await transformPackage(await fs.readFile(join(sourceDir, "package.xml"), { encoding: "utf8" }), sourceDir);
        }
    };
}
