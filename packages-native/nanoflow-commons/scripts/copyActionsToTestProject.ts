import { promises as fs } from "fs";
import { basename, join } from "path";

const cwd = process.cwd();
const actionsDir = join(cwd, "dist/tsc/");
const testProjectDir = join(cwd, "dist/mxproject/javascriptsource/nanoflowcommons/actions/");

try {
    main();
} catch (exception) {
    // tslint:disable-next-line:no-console
    console.error(exception);
}

async function main(): Promise<void> {
    await fs.mkdir(testProjectDir, { recursive: true });

    const files = await walk(actionsDir);

    for (const file of files) {
        const to = testProjectDir + basename(file);
        await fs.copyFile(file, to);
    }
}

async function walk(dirPath: string, filelist: string[] = []): Promise<string[]> {
    const files = await fs.readdir(dirPath);

    for (const file of files) {
        const filePath = dirPath + file;
        const stat = await fs.stat(filePath);

        if (stat.isDirectory()) {
            filelist = await walk(filePath + "/", filelist);
        } else {
            filelist.push(filePath);
        }
    }

    return filelist;
}
