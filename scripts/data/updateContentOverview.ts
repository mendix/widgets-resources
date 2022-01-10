import { promises as fs } from "fs";
import { dirname, join, resolve } from "path";
import { FileReadError, PatternNotFoundError, UnsupportedPlatformError } from "./errors";
import { promisify } from "util";
import { exec } from "child_process";
import { createProgram, escapeLeadingUnderscores } from "typescript";

const execAsync = promisify(exec);

// Types

enum SupportedPlatform {
    WEB = "web",
    NATIVE = "native",
    BOTH = "both"
}

type WidgetData = {
    id: string;
    pluginWidget: boolean;
    offlineCapable: boolean;
    supportedPlatform: SupportedPlatform;
    hasStructurePreview: boolean;
    hasDesignModePreview: boolean;
    hasTileIcons: boolean;
    hasDarkModeIcons: boolean;
};

type Patterns = { [key: string]: [RegExp, boolean?, ((value: string) => string)?] }; // boolean indicates if value is required or not
// eslint-disable-next-line no-unused-vars
type Values<P extends Patterns> = {
    [key in keyof P]: P[key][1] extends true | undefined ? string : string | undefined;
};

const patterns = {
    widgetFileName: new RegExp('<widgetFile path="(.*\\.xml)"\\s*/>'),
    id: new RegExp(`id="(.+?)"`),
    pluginWidget: new RegExp(`pluginWidget="(.+?)"`),
    offlineCapable: new RegExp(`offlineCapable="(.+?)"`),
    supportedPlatform: new RegExp(`supportedPlatform="(.+?)"`)
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
    const { stdout: lernaPackages } = await execAsync("npx lerna ls --json --all");
    const locations: string[] = JSON.parse(lernaPackages.trim()).map(lernaPackage => lernaPackage.location);

    const packages = await Promise.all(
        locations
            .filter(location => location.match(/(pluggable|custom)Widgets/))
            .map(async packagePath => {
                try {
                    return summarizeWidget(packagePath);
                } catch (e) {
                    if (e instanceof Error && (e.name === "FileReadError" || e.name === "ValueNotFoundError")) {
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
    const { widgetFileName } = await extractTextFromFile(packagePath, "src/package.xml", {
        widgetFileName: [patterns.widgetFileName]
    });

    const {
        id,
        pluginWidget,
        offlineCapable,
        supportedPlatform = "web"
    } = await extractTextFromFile(packagePath, `src/${widgetFileName}`, {
        id: [patterns.id],
        pluginWidget: [patterns.pluginWidget, false],
        offlineCapable: [patterns.offlineCapable, false],
        supportedPlatform: [patterns.supportedPlatform, false, value => value.toLowerCase()]
    });

    if (!isEnum(SupportedPlatform)(supportedPlatform)) {
        throw new UnsupportedPlatformError(packagePath, supportedPlatform);
    }

    const hasStructurePreview = await fs
        .readdir(join(packagePath, "src"))
        .then(files =>
            files
                .filter(path => path.match(/.*\.editorConfig\.[jt]sx?/))
                .some(path => moduleExports(join(packagePath, "src", path), "getPreview"))
        );
    const hasDesignModePreview = await fs
        .readdir(join(packagePath, "src"))
        .then(files =>
            files
                .filter(path => path.match(/.*\.editorPreview\.[jt]sx?$/))
                .some(path => moduleExports(join(packagePath, "src", path), "preview"))
        );
    const hasTileIcons = await fs
        .readdir(join(packagePath, "src"))
        .then(files => files.some(path => path.endsWith(".tile.png")));
    const hasDarkModeIcons = await fs
        .readdir(join(packagePath, "src"))
        .then(files => files.some(path => path.endsWith(".dark.png")));

    return {
        id,
        pluginWidget: pluginWidget === "true",
        offlineCapable: offlineCapable === "true",
        supportedPlatform,
        hasStructurePreview,
        hasDesignModePreview,
        hasTileIcons,
        hasDarkModeIcons
    };
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

async function extractTextFromFile<P extends Patterns>(
    packagePath: string,
    filePath: string,
    patterns: P
): Promise<Values<P>> {
    const content = await readPackageFile(packagePath, filePath);
    return Object.entries(patterns).reduce<Values<P>>((result, [key, [pattern, required = true, processFn]]) => {
        const [, value] = content.match(pattern) ?? [];
        if (!value) {
            if (required) {
                throw new PatternNotFoundError(packagePath, filePath, key);
            }
            console.warn(`Could not find pattern ${pattern} in ${join(packagePath, filePath)}`);
        }
        return value ? { ...result, [key]: processFn ? processFn(value) : value } : result;
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

// Type guards

function isDefined<T>(val: T | undefined | null): val is T {
    return val !== undefined && val !== null;
}

function isEnum<T>(e: T): (token: unknown) => token is T[keyof T] {
    const keys = Object.keys(e).filter(k => {
        return !/^\d/.test(k);
    });
    const values = keys.map(k => {
        return (e as any)[k];
    });
    return (token: unknown): token is T[keyof T] => {
        return values.includes(token);
    };
}
