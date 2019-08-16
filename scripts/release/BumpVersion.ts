import { promises as fs } from "fs";
import { join } from "path";
import { spawnSync } from "child_process";

// const cwd = process.cwd();
// const actionsDir = join(cwd, "dist/babel/");
// const testProjectDir = join(cwd, "dist/mxproject/javascriptsource/nanoflowcommons/actions/");

// eslint-disable-next-line no-console
main().catch(console.error);

async function main(): Promise<void> {
    const args = process.argv.slice(2);
    const target = args[0];
    const version = args[1];
    const packages = ["packages-common", "packages-native", "packages-web"];
    // await fs.mkdir(testProjectDir, { recursive: true });
    // eslint-disable-next-line no-console
    console.log("Target", target, "Version", version);

    const path = await findPath(packages, target);

    spawnSync("npm", ["version", version], { cwd: path });
    await bumpXml(path, version);

    // eslint-disable-next-line no-console
    console.log("Version bumped to ", version);
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
