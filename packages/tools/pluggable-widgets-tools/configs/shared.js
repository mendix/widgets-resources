/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { existsSync, readdirSync, mkdirSync, promises as fs } from "fs";
import { join } from "path";
import { config } from "dotenv";
import fg from "fast-glob";
import { cp } from "shelljs";
import { zip } from "zip-a-folder";

config({ path: join(process.cwd(), ".env") });

export async function listDir(path) {
    const entries = await fs.readdir(path, { withFileTypes: true });
    return entries
        .filter(e => e.isFile())
        .map(e => join(path, e.name))
        .concat(...(await Promise.all(entries.filter(e => e.isDirectory()).map(e => listDir(join(path, e.name))))));
}

export async function copyLicenseFile(sourcePath, outDir) {
    const absolutePath = join(sourcePath, "licen[cs]e");
    const licenseFile = (await fg([absolutePath], { cwd: sourcePath, caseSensitiveMatch: false }))[0];
    if (existsSync(licenseFile)) {
        cp(licenseFile, outDir);
    }
}

export async function createMpkFile(mpkDir, outDir, mpkFile, production, projectPath, deploymentPath) {
    mkdirSync(mpkDir, { recursive: true });
    await zip(outDir, mpkFile);
    if (!production && projectPath) {
        const widgetsPath = join(projectPath, "widgets");
        const absolutePath = join(projectPath, deploymentPath);
        // Create folder if they do not exists or directories were cleaned
        mkdirSync(widgetsPath, { recursive: true });
        mkdirSync(absolutePath, { recursive: true });
        // Copy files to deployment and widgets folder
        cp("-r", join(outDir, "*"), absolutePath);
        cp(mpkFile, widgetsPath);
    }
}

export const licenseCustomTemplate = dependencies =>
    JSON.stringify(
        dependencies.map(dependency => ({
            [dependency.name]: {
                version: dependency.version,
                ...(typeof dependency.isTransitive !== "undefined" ? { transitive: dependency.isTransitive } : null),
                url: dependency.homepage
            }
        }))
    );

export const sourcePath = process.cwd();

const widgetPackageJson = require(join(sourcePath, "package.json"));
export const widgetName = widgetPackageJson.widgetName;
export const widgetPackage = widgetPackageJson.packagePath;
export const widgetVersion = widgetPackageJson.version;
if (!widgetName || !widgetPackageJson) {
    throw new Error("Widget does not define widgetName in its package.json");
}

const widgetSrcFiles = readdirSync(join(sourcePath, "src")).map(file => join(sourcePath, "src", file));
export const widgetEntry = widgetSrcFiles.filter(file =>
    file.match(new RegExp(`[/\\\\]${escape(widgetName)}\\.[jt]sx?$`, "i"))
)[0];
if (!widgetEntry) {
    throw new Error("Cannot find a widget entry file");
}

export const editorConfigEntry = widgetSrcFiles.filter(file =>
    file.match(new RegExp(`[/\\\\]${escape(widgetName)}\\.editorConfig\\.[jt]s$`, "i"))
)[0];
export const previewEntry = widgetSrcFiles.filter(file =>
    file.match(new RegExp(`[/\\\\]${escape(widgetName)}\\.(webmodeler|editorPreview)\\.[jt]sx?$`, "i"))
)[0];

export const isTypescript = [widgetEntry, editorConfigEntry, previewEntry].some(file => file && /\.tsx?$/.test(file));

export const projectPath = [
    process.env.MX_PROJECT_PATH,
    widgetPackageJson.config.projectPath,
    join(sourcePath, "tests/testProject")
].filter(path => path && existsSync(path))[0];

function escape(str) {
    return str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
}
