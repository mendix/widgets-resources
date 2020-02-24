import { promises as fs } from "fs";
import { basename, join } from "path";

const cwd = process.cwd();
const actionsDir = join(cwd, "dist/tsc/");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageContent: any = require(join(cwd, "package.json"));

const testProjectDir = join(
    cwd,
    packageContent.config.testProjects[0].path,
    "/javascriptsource",
    packageContent.config.moduleName.toLowerCase(),
    "actions/"
);

// eslint-disable-next-line no-console
main().catch(console.error);

async function main(): Promise<void> {
    await fs.mkdir(testProjectDir, { recursive: true });

    const files = await walk(actionsDir);

    for (const file of files) {
        const to = testProjectDir + basename(file);
        await fs.copyFile(file, to);
    }
}

async function walk(dirPath: string, fileList: string[] = []): Promise<string[]> {
    const files = await fs.readdir(dirPath);

    for (const file of files) {
        const filePath = dirPath + file;
        const stat = await fs.stat(filePath);

        if (stat.isDirectory()) {
            fileList = await walk(filePath + "/", fileList);
        } else {
            fileList.push(filePath);
        }
    }

    return fileList;
}
