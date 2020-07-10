const fs = require("fs").promises;
const { basename, join } = require("path");

const cwd = process.cwd();
const actionsDir = join(cwd, "dist/tsc/");

const packageContent = require(join(cwd, "package.json"));

const testProjectDir = join(
    cwd,
    packageContent.config.testProjects[0].path,
    "/javascriptsource",
    packageContent.config.moduleName.toLowerCase(),
    "actions/"
);

main().catch(e => {
    console.error(e);
    process.exit(1);
});

async function main() {
    await fs.mkdir(testProjectDir, { recursive: true });

    const files = await walk(actionsDir);

    for (const file of files) {
        const to = testProjectDir + basename(file);
        await fs.copyFile(file, to);
    }
}

async function walk(dirPath, fileList = []) {
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
