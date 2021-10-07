import { promises as fs } from "fs";
import { join } from "path";
import { spawnSync } from "child_process";

// eslint-disable-next-line no-console
main().catch(console.error);

type BumpVersionType = "patch" | "minor" | "major" | string;

async function main(): Promise<void> {
    const args = process.argv.slice(2);
    const target = args[0];
    const bumpVersionType: BumpVersionType = args[1];
    const packages = ["packages/pluggableWidgets"];
    const path = await findPath(packages, target);
    const currentVersion = await getCurrentVersion(path);
    const newVersion = getNewVersion(bumpVersionType, currentVersion);

    console.log("Target:", target);
    console.log("Current version:", currentVersion);
    console.log("New version:", newVersion, "\n");

    console.log("Bumping package.json version...");
    bumpPackageJson(path, newVersion);

    console.log("Bumping XML version...");
    await bumpXml(path, newVersion);

    console.log("Done.");
}

function getNewVersion(bumpVersionType: BumpVersionType, currentVersion: string): string {
    const [major, minor, patch] = currentVersion.split(".");
    switch (bumpVersionType) {
        case "patch":
            return [major, minor, Number(patch) + 1].join(".");
        case "minor":
            return [major, Number(minor) + 1, patch].join(".");
        case "major":
            return [Number(major) + 1, minor, patch].join(".");
        default:
            return bumpVersionType;
    }
}

async function getCurrentVersion(path: string): Promise<string> {
    const contentBuffer = await fs.readFile(join(path, "package.json"));
    const content = JSON.parse(contentBuffer.toString());
    return content.version;
}

function bumpPackageJson(path: string, version: string): void {
    spawnSync("npm", ["version", version], { cwd: path });
}

async function findPath(packages: string[], target: string): Promise<string> {
    for (const pack of packages) {
        const folders = await fs.readdir(pack);
        for (const folder of folders) {
            const pathToPackage = join(pack, folder);
            try {
                const stat = await fs.stat(join(pathToPackage, "package.json"));
                if (stat) {
                    const contentBuffer = await fs.readFile(join(pathToPackage, "package.json"));
                    const content = JSON.parse(contentBuffer.toString());
                    if (content.name === target) {
                        return pathToPackage;
                    }
                }
                // eslint-disable-next-line no-empty
            } catch (e) {}
        }
    }
    throw Error(`Package for ${target} not found`);
}

async function bumpXml(path: string, version: string): Promise<boolean> {
    const packageXmlFile = join(path, "src", "package.xml");
    try {
        const content = await fs.readFile(packageXmlFile);
        if (content) {
            const newContent = content.toString().replace(/version=.+xmlns/, `version="${version}" xmlns`);
            await fs.writeFile(packageXmlFile, newContent);
            return true;
        }
        return false;
    } catch (e) {
        throw new Error("package.xml not found");
    }
}
