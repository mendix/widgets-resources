/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { existsSync, mkdirSync } from "fs";
import { join } from "path";
import fg from "fast-glob";
import { cp } from "shelljs";
import { zip } from "zip-a-folder";
import { LICENSE_GLOB } from "../common/glob";

export async function copyLicenseFile(sourcePath, outDir) {
    const absolutePath = join(sourcePath, LICENSE_GLOB);
    const licenseFile = (await fg([absolutePath], { cwd: sourcePath, caseSensitiveMatch: false }))[0];
    if (existsSync(licenseFile)) {
        cp(licenseFile, outDir);
    }
}

export async function createMpkFile({ mpkDir, mpkFile, widgetTmpDir, isProduction, mxProjectPath, deploymentPath }) {
    mkdirSync(mpkDir, { recursive: true });
    await zip(widgetTmpDir, mpkFile);
    if (!isProduction && mxProjectPath) {
        const widgetsPath = join(mxProjectPath, "widgets");
        const absolutePath = join(mxProjectPath, deploymentPath);
        // Create folder if they do not exists or directories were cleaned
        mkdirSync(widgetsPath, { recursive: true });
        mkdirSync(absolutePath, { recursive: true });
        // Copy files to deployment and widgets folder
        cp("-r", join(widgetTmpDir, "*"), absolutePath);
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
