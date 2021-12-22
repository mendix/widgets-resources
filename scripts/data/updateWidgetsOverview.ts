import { promises as fs } from "fs";
import { dirname, join } from "path";
import { FileReadError, PatternNotFoundError } from "./errors";
import { promisify } from "util";
import { exec } from "child_process";

const execAsync = promisify(exec);

const patterns = {
    widgetFileName: new RegExp('<widgetFile path="(.*\\.xml)"\\s*/>'),
    id: new RegExp(`id="(.+?)"`),
    pluginWidget: new RegExp(`pluginWidget="(.+?)"`),
    offlineCapable: new RegExp(`offlineCapable="(.+?)"`),
    supportedPlatform: new RegExp(`supportedPlatform="(.+?)"`)
};

main().catch(e => {
    console.error(e);
    process.exit(1);
});

async function main(): Promise<void> {
    const { stdout: lernaPackages } = await execAsync("npx lerna ls --json --all");
    const locations: string[] = JSON.parse(lernaPackages.trim()).map(lernaPackage => lernaPackage.location);

    const packages = await Promise.all(
        locations
            .filter(location => location.match(/(pluggable|custom)Widgets/))
            .map(async packagePath => {
                try {
                    const { widgetFileName } = await extractTextFromFile(packagePath, "src/package.xml", {
                        widgetFileName: [patterns.widgetFileName]
                    });

                    const { id, pluginWidget, offlineCapable, supportedPlatform } = await extractTextFromFile(
                        packagePath,
                        `src/${widgetFileName}`,
                        {
                            id: [patterns.id],
                            pluginWidget: [patterns.pluginWidget, false],
                            offlineCapable: [patterns.offlineCapable, false],
                            supportedPlatform: [patterns.supportedPlatform, false]
                        }
                    );

                    return {
                        id,
                        pluginWidget: pluginWidget === "true",
                        offlineCapable: offlineCapable === "true",
                        supportedPlatform: supportedPlatform ?? "Web"
                    };
                } catch (e) {
                    if (e instanceof Error && (e.name === "FileReadError" || e.name === "ValueNotFoundError")) {
                        console.warn(e.message);
                        return undefined;
                    }
                    throw e;
                }
            })
    );

    const result = packages.filter(isDefined);

    await writeFile("data/widgets.json", JSON.stringify(result, null, "\t"));
}

function isDefined<T>(val: T | undefined | null): val is T {
    return val !== undefined && val !== null;
}

async function readPackageFile(packagePath: string, filePath: string): Promise<string> {
    try {
        const fullPath = join(packagePath, filePath);
        const fileBuffer = await fs.readFile(fullPath);
        return fileBuffer.toString();
    } catch (e) {
        throw new FileReadError(packagePath, filePath);
    }
}

async function writeFile(path: string, content: string): Promise<void> {
    const dir = dirname(path);
    try {
        await fs.access(dir);
    } catch (_) {
        await fs.mkdir(dir, { recursive: true });
    }
    await fs.writeFile(path, content, { flag: "w+" });
}

type Patterns = { [key: string]: [RegExp, boolean?] }; // boolean indicates if value is required or not
// eslint-disable-next-line no-unused-vars
type Values<P extends Patterns> = {
    [key in keyof P]: P[key][1] extends true | undefined ? string : string | undefined;
};

async function extractTextFromFile<P extends Patterns>(
    packagePath: string,
    filePath: string,
    patterns: P
): Promise<Values<P>> {
    const content = await readPackageFile(packagePath, filePath);
    return Object.entries(patterns).reduce<Values<P>>((result, [key, [pattern, required = true]]) => {
        const [, value] = content.match(pattern) ?? [];
        if (!value) {
            if (required) {
                throw new PatternNotFoundError(packagePath, filePath, key);
            }
            console.warn(`Could not find pattern ${pattern} in ${join(packagePath, filePath)}`);
        }
        return value ? { ...result, [key]: value } : result;
    }, {} as Values<P>);
}
