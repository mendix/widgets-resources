/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { existsSync, mkdirSync } from "fs";
import { join } from "path";
import fg from "fast-glob";
import { cp } from "shelljs";
import { zip } from "zip-a-folder";

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
