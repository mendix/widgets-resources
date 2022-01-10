import { promises as fs } from "fs";
import { dirname, join, resolve } from "path";
import { FileReadError, XmlValueNotFoundError, UnsupportedPlatformError } from "./errors";
import { promisify } from "util";
import { exec } from "child_process";
import { createProgram, escapeLeadingUnderscores } from "typescript";
import glob from "glob";
import { XMLParser } from "fast-xml-parser";

const execAsync = promisify(exec);

// Types

enum SupportedPlatform {
    WEB = "web",
    NATIVE = "native",
    BOTH = "both"
}

type WidgetData = {
    id: string;
    latestVersion: string;
    pluginWidget: boolean;
    offlineCapable: boolean;
    supportedPlatform: SupportedPlatform;
    hasStructurePreview: boolean;
    hasDesignModePreview: boolean;
    hasTileIcons: boolean;
    hasDarkModeIcons: boolean;
};

type Patterns = { [key: string]: [(doc: any) => any, boolean?] }; // boolean indicates if value is required or not
type Values<P extends Patterns> = {
    [key in keyof P]: P[key][1] extends true | undefined
        ? NonNullable<ReturnType<P[key][0]>>
        : ReturnType<P[key][0]> | undefined;
};

const OUTPUT_PATH = resolve(__dirname, "../../data/content.json");

main().catch(e => {
    console.error(e);
    process.exit(1);
});

async function main(): Promise<void> {
    const widgets = await summarizeWidgets();

    await writeFile(OUTPUT_PATH, JSON.stringify({ widgets }, null, "\t"));
}

async function summarizeWidgets(): Promise<WidgetData[]> {
    const locations = await getLernaPackages(/(pluggable|custom)Widgets/);

    const packages = await Promise.all(
        locations.map(async packagePath => {
            try {
                return summarizeWidget(packagePath);
            } catch (e) {
                if (e instanceof Error && (e.name === FileReadError.name || e.name === XmlValueNotFoundError.name)) {
                    console.warn(e.message);
                    return undefined;
                } else {
                    throw e;
                }
            }
        })
    );

    return packages.filter(isDefined);
}

async function summarizeWidget(packagePath: string): Promise<WidgetData> {
    const packageXmlValues = await extractFromXml(packagePath, "src/package.xml", {
        latestVersion: [xml => xml.package.clientModule["@_version"]],
        widgetFileName: [xml => xml.package.clientModule.widgetFiles.widgetFile[0]["@_path"]]
    });

    const { supportedPlatform, ...widgetXmlValues } = await extractFromXml(
        packagePath,
        `src/${packageXmlValues.widgetFileName}`,
        {
            id: [xml => xml.widget["@_id"]],
            pluginWidget: [xml => xml.widget["@_pluginWidget"] === "true"],
            offlineCapable: [xml => xml.widget["@_offlineCapable"] === "true"],
            supportedPlatform: [xml => xml.widget["@_supportedPlatform"]?.toLowerCase() ?? "web"]
        }
    );

    if (!isEnum(SupportedPlatform)(supportedPlatform)) {
        throw new UnsupportedPlatformError(packagePath, supportedPlatform);
    }

    const hasStructurePreview = await withGlob(`${packagePath}/src/*.editorConfig.{js,jsx,ts,tsx}`, matches =>
        matches.some(path => moduleExports(path, "getPreview"))
    );
    const hasDesignModePreview = await withGlob(`${packagePath}/src/*.editorPreview.{js,jsx,ts,tsx}`, matches =>
        matches.some(path => moduleExports(path, "preview"))
    );
    const hasTileIcons = await withGlob(`${packagePath}/src/*.tile.png`, matches => matches.length > 0);
    const hasDarkModeIcons = await withGlob(`${packagePath}/src/*.dark.png`, matches => matches.length > 0);

    return {
        ...packageXmlValues,
        ...widgetXmlValues,
        supportedPlatform,
        hasStructurePreview,
        hasDesignModePreview,
        hasTileIcons,
        hasDarkModeIcons
    };
}

async function getLernaPackages(filter?: RegExp): Promise<string[]> {
    const { stdout: lernaPackages } = await execAsync("npx lerna ls --json --all");
    const locations: string[] = JSON.parse(lernaPackages.trim()).map(lernaPackage => lernaPackage.location);
    return locations.filter(location => (filter ? location.match(filter) : location));
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

async function extractFromXml<P extends Patterns>(
    packagePath: string,
    filePath: string,
    patterns: P
): Promise<Values<P>> {
    const alwaysArray = ["package.clientModule.widgetFiles.widgetFile"];

    const content = await readPackageFile(packagePath, filePath);
    const xmlParser = new XMLParser({
        ignoreAttributes: false,
        isArray: (_, jpath) => alwaysArray.indexOf(jpath) !== -1
    });
    const xml = xmlParser.parse(content);

    return Object.entries(patterns).reduce<Values<P>>((result, [key, [fn, required = true]]) => {
        const value = fn(xml);
        if (value === undefined && required) {
            throw new XmlValueNotFoundError(packagePath, filePath, key);
        } else if (value === undefined && !required) {
            console.warn(`Could not find pattern ${key} in ${join(packagePath, filePath)}`);
        }
        return value ? { ...result, [key]: value } : result;
    }, {} as Values<P>);
}

function moduleExports(fileName: string, exportName: string): boolean {
    const program = createProgram([fileName], {});
    const sourceFile = program.getSourceFile(fileName);
    if (sourceFile) {
        const fileSymbol = program.getTypeChecker().getSymbolAtLocation(sourceFile);
        return fileSymbol?.exports?.get(escapeLeadingUnderscores(exportName)) !== undefined;
    }
    return false;
}

async function withGlob<T>(pattern: string, cb: (matches: string[]) => T | Promise<T>): Promise<T> {
    return new Promise((resolve, reject) =>
        glob(pattern, (error, matches) => {
            error ? reject(error) : resolve(cb(matches));
        })
    );
}

// Type guards

function isDefined<T>(val: T | undefined | null): val is T {
    return val !== undefined && val !== null;
}

function isEnum<T>(e: T): (token: unknown) => token is T[keyof T] {
    const keys = Object.keys(e).filter(k => !/^\d/.test(k));
    const values = keys.map(k => (e as any)[k]);
    return (token: unknown): token is T[keyof T] => values.includes(token);
}
