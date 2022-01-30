import { resolve } from "path";
import { promisify } from "util";
import { exec } from "child_process";
import { Analyzer } from "./analyzer";
import { isDefined, writeFile } from "./util";
import { WidgetPackage } from "./model/widgetPackage";
import { JSActionPackage } from "./model/jsActionPackage";
import { OutputSchema } from "../schema";
import { z } from "zod";

const execAsync = promisify(exec);

const WORKING_DIR = resolve(__dirname, "../../../");
const OUTPUT_PATH = resolve(WORKING_DIR, "data/content.json");

generateData()
    .then(data => writeFile(OUTPUT_PATH, JSON.stringify(data, null, "\t")))
    .catch(e => {
        console.error(e);
        process.exit(1);
    });

export async function generateData(): Promise<z.infer<typeof OutputSchema>> {
    process.chdir(WORKING_DIR);

    const widgetSourceFiles: string[] = [];

    const widgetLocations = await getLernaPackages(/(pluggable|custom)Widgets/);
    const widgetPackages = await Promise.all(
        widgetLocations.map(packagePath =>
            WidgetPackage.load(packagePath, widget =>
                widgetSourceFiles.push(...Object.values(widget.getConfig()).filter(isDefined))
            )
        )
    );

    const analyzer = new Analyzer(widgetSourceFiles);

    const jsActionLocation = await getLernaPackages(/jsActions/);
    const jsActionPackages = await Promise.all(jsActionLocation.map(packagePath => JSActionPackage.load(packagePath)));

    const output: z.infer<typeof OutputSchema> = {
        widgetPackages: widgetPackages.map(widgetPackage => widgetPackage.export(analyzer)),
        jsActionPackages: jsActionPackages.map(jsActionPackage => jsActionPackage.export())
    };

    return OutputSchema.parse(output);
}

async function getLernaPackages(filter?: RegExp): Promise<string[]> {
    const { stdout: lernaPackages } = await execAsync("npx lerna ls --json --all");
    const locations: string[] = JSON.parse(lernaPackages.trim()).map((lernaPackage: any) => lernaPackage.location);
    return locations.filter(location => (filter ? location.match(filter) : location));
}
