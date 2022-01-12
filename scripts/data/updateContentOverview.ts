import { resolve } from "path";
import { promisify } from "util";
import { exec } from "child_process";
import { Analyzer } from "./lib/analyzer";
import { isDefined, writeFile } from "./lib/util";
import { WidgetPackage } from "./lib/widgetPackage";
import { JSActionPackage } from "./lib/jsActionPackage";

const execAsync = promisify(exec);

const OUTPUT_PATH = resolve(__dirname, "../../data/content.json");

main().catch(e => {
    console.error(e);
    process.exit(1);
});

async function main(): Promise<void> {
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

    const output = {
        widgetPackages: widgetPackages.map(widgetPackage => widgetPackage.export(analyzer)),
        jsActionPackages: jsActionPackages.map(jsActionPackage => jsActionPackage.export())
    };

    await writeFile(OUTPUT_PATH, JSON.stringify(output, null, "\t"));
}

async function getLernaPackages(filter?: RegExp): Promise<string[]> {
    const { stdout: lernaPackages } = await execAsync("npx lerna ls --json --all");
    const locations: string[] = JSON.parse(lernaPackages.trim()).map(lernaPackage => lernaPackage.location);
    return locations.filter(location => (filter ? location.match(filter) : location));
}
