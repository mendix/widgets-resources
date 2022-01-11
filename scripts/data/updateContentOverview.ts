import { promises as fs } from "fs";
import { dirname, join, relative, resolve } from "path";
import { UnsupportedPlatformError } from "./errors";
import { promisify } from "util";
import { exec } from "child_process";
import { createProgram, escapeLeadingUnderscores, Program } from "typescript";
import { XMLParser } from "fast-xml-parser";
import glob from "glob";

const execAsync = promisify(exec);

// Types

enum SupportedPlatform {
    WEB = "web",
    NATIVE = "native",
    BOTH = "both"
}

type WidgetData = {
    id: string;
    name: string;
    description: string;
    clientModuleName: string;
    latestVersion: string;
    isPluginWidget: boolean;
    offlineCapable: boolean;
    supportedPlatform: SupportedPlatform;
    studioCategory?: string;
    studioProCategory?: string;
    editorConfigPath?: string;
    editorPreviewPath?: string;
    hasStructureModePreview?: boolean;
    hasDesignModePreview?: boolean;
    hasTileIcons: boolean;
    hasDarkModeIcons: boolean;
};

type Patterns = { [key: string]: (doc: any) => any }; // boolean indicates if value is required or not
type Values<P extends Patterns> = {
    [key in keyof P]: ReturnType<P[key]>;
};

const ROOT_PATH = resolve(__dirname, "../../");
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
    const widgets = await Promise.all(locations.map(async packagePath => summarizeWidget(packagePath)));

    const program = createProgram(
        [
            ...resolvePaths(widgets, widget => widget.editorConfigPath),
            ...resolvePaths(widgets, widget => widget.editorPreviewPath)
        ],
        {}
    );

    return widgets.map(widget => ({
        ...widget,
        hasStructurePreview: widget.editorConfigPath
            ? moduleExports(program, resolve(ROOT_PATH, widget.editorConfigPath), "getPreview")
            : false,
        hasDesignModePreview: widget.editorPreviewPath
            ? moduleExports(program, resolve(ROOT_PATH, widget.editorPreviewPath), "preview")
            : false
    }));
}

async function summarizeWidget(packagePath: string): Promise<WidgetData> {
    const packageXmlValues = await extractFromXml(createParserForPackageXml(), packagePath, "src/package.xml", {
        latestVersion: xml => xml.package.clientModule["@_version"],
        widgetFileName: xml => xml.package.clientModule.widgetFiles.widgetFile[0]["@_path"], // We assume that there is only one widget per clientModule
        clientModuleName: xml => xml.package.clientModule["@_name"]
    });

    const { supportedPlatform, ...widgetXmlValues } = await extractFromXml(
        createParserForWidgetXml(),
        packagePath,
        `src/${packageXmlValues.widgetFileName}`,
        {
            id: xml => xml.widget["@_id"],
            name: xml => xml.widget.name,
            description: xml => xml.widget.description,
            studioCategory: xml => xml.widget.studioCategory,
            studioProCategory: xml => xml.widget.studioProCategory,
            isPluginWidget: xml => xml.widget["@_pluginWidget"] === "true",
            offlineCapable: xml => xml.widget["@_offlineCapable"] === "true",
            supportedPlatform: xml => xml.widget["@_supportedPlatform"]?.toLowerCase() ?? "web"
        }
    );

    if (!isEnumValue(SupportedPlatform, supportedPlatform)) {
        throw new UnsupportedPlatformError(packagePath, supportedPlatform);
    }

    const editorConfigPath = await withGlob(`${packagePath}/src/*.editorConfig.{js,jsx,ts,tsx}`, matches =>
        matches[0] ? relative(ROOT_PATH, matches[0]) : undefined
    );
    const editorPreviewPath = await withGlob(`${packagePath}/src/*.editorPreview.{js,jsx,ts,tsx}`, matches =>
        matches[0] ? relative(ROOT_PATH, matches[0]) : undefined
    );

    const hasTileIcons = await withGlob(`${packagePath}/src/*.tile.png`, matches => matches.length > 0);
    const hasDarkModeIcons = await withGlob(`${packagePath}/src/*.dark.png`, matches => matches.length > 0);

    return {
        ...packageXmlValues,
        ...widgetXmlValues,
        supportedPlatform,
        editorConfigPath,
        editorPreviewPath,
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
    const fullPath = join(packagePath, filePath);
    const fileBuffer = await fs.readFile(fullPath);
    return fileBuffer.toString();
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

function createParserForPackageXml() {
    const alwaysArray = ["package.clientModule.widgetFiles.widgetFile"];
    return new XMLParser({
        ignoreAttributes: false,
        isArray: (_, jPath) => alwaysArray.indexOf(jPath) !== -1
    });
}

function createParserForWidgetXml() {
    return new XMLParser({
        ignoreAttributes: false
    });
}

async function extractFromXml<P extends Patterns>(
    parser: XMLParser,
    packagePath: string,
    filePath: string,
    patterns: P
): Promise<Values<P>> {
    const content = await readPackageFile(packagePath, filePath);
    const xml = parser.parse(content);

    return Object.entries(patterns).reduce<Values<P>>((result, [key, extractor]) => {
        const value = extractor(xml);
        if (value === undefined) {
            console.warn(`Could not find pattern ${key} in ${join(packagePath, filePath)}`);
        }
        return { ...result, [key]: value };
    }, {} as Values<P>);
}

function moduleExports(program: Program, fileName: string, exportName: string): boolean {
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

function resolvePaths<T>(items: Array<T>, fn: (item: T) => string | undefined) {
    return items
        .map(fn)
        .filter(isDefined)
        .map(path => resolve(ROOT_PATH, path));
}

// Type guards

function isDefined<T>(val: T | undefined | null): val is T {
    return val !== undefined && val !== null;
}

function isEnumValue<T>(e: T, token: unknown): token is T[keyof T] {
    const keys = Object.keys(e).filter(k => !/^\d/.test(k));
    const values = keys.map(k => (e as any)[k]);
    return values.includes(token);
}
