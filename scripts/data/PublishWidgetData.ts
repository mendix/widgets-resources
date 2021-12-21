import * as fs from "fs";
import { join, dirname } from "path";
import { FileReadError, PatternNotFoundError } from "./errors";

const result = ["packages/pluggableWidgets", "packages/customWidgets"]
    .reduce<string[]>(
        (result, packageRoot) => [
            ...result,
            ...fs
                .readdirSync(packageRoot)
                .filter(path => !path.startsWith("."))
                .map(dir => join(packageRoot, dir))
        ],
        []
    )
    .map(packagePath => {
        try {
            const { widgetFileName } = extractTextFromFile(packagePath, "src/package.xml", {
                widgetFileName: [new RegExp('<widgetFile path="(.*\\.xml)"\\s*/>')]
            });

            const { id, pluginWidget, offlineCapable, supportedPlatform } = extractTextFromFile(
                packagePath,
                `src/${widgetFileName}`,
                {
                    id: [new RegExp(`id="(.+?)"`)],
                    pluginWidget: [new RegExp(`pluginWidget="(.+?)"`), false],
                    offlineCapable: [new RegExp(`offlineCapable="(.+?)"`), false],
                    supportedPlatform: [new RegExp(`supportedPlatform="(.+?)"`), false]
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
    .filter(isDefined);

writeFile("data/widgets.json", JSON.stringify(result, null, "\t"));

function isDefined<T>(val: T | undefined | null): val is T {
    return val !== undefined && val !== null;
}

function readPackageFile(packagePath: string, filePath: string): string {
    try {
        const fullPath = join(packagePath, filePath);
        return fs.readFileSync(fullPath).toString();
    } catch (e) {
        throw new FileReadError(packagePath, filePath);
    }
}

function writeFile(path: string, content: string): void {
    const dir = dirname(path);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(path, content, { flag: "w+" });
}

type Patterns = { [key: string]: [RegExp, boolean?] }; // boolean indicates if value is required or not
// eslint-disable-next-line no-unused-vars
type Values<P extends Patterns> = {
    [key in keyof P]: P[key][1] extends true | undefined ? string : string | undefined;
};

function extractTextFromFile<P extends Patterns>(packagePath: string, filePath: string, patterns: P): Values<P> {
    const content = readPackageFile(packagePath, filePath);
    return Object.entries(patterns).reduce((result, [key, [pattern, required = true]]) => {
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
