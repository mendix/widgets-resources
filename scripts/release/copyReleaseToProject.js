const { join, basename } = require("path");
const { readdir, stat } = require("fs/promises");
const { cp } = require("shelljs");

const pluggableWidgetsFolderPath = join(process.cwd(), "packages/pluggableWidgets");

main().catch(e => {
    console.error(e);
    process.exit(-1);
});

async function main() {
    if (!process.env.MX_PROJECT_PATH) {
        throw new Error(`Environment variable "MX_PROJECT_PATH" is not defined.`);
    }
    console.log(`Copying over widgets to ${process.env.MX_PROJECT_PATH}..`);
    // Get pluggable widget folders containing "-native"
    const widgetFolderNames = await asyncFilter(await readdir(pluggableWidgetsFolderPath), isNativeWidgetFolder);
    const mpkPathsToCopy = [];
    for (const widgetFolderName of widgetFolderNames) {
        const widgetDistFolderPath = join(pluggableWidgetsFolderPath, widgetFolderName, "dist");
        const allMpkPaths = [];

        for (const widgetDistFolderName of await readdir(widgetDistFolderPath)) {
            // Check if folder name contains versioning
            if (!/\d+\.\d+\.\d+/.test(widgetDistFolderName)) {
                continue;
            }
            const widgetDistVersionPath = join(widgetDistFolderPath, widgetDistFolderName);
            // Read version folder inside dist/ and create path
            allMpkPaths.push(...(await readdir(widgetDistVersionPath)).map(name => join(widgetDistVersionPath, name)));
        }
        if (allMpkPaths.length) {
            // Sort .mpk files on modified date
            const allMpkPathsSorted = (await Promise.all(allMpkPaths?.map(getFileModifiedTime)))?.sort(
                (a, b) => b.mtime - a.mtime
            );
            mpkPathsToCopy.push(allMpkPathsSorted?.[0]?.path);
        } else {
            console.error(`ERROR: No .mpk file found for widget ${widgetFolderName}`);
        }
    }

    cp(mpkPathsToCopy, join(process.env.MX_PROJECT_PATH, "widgets"));
    console.log(
        `Finished copying ${mpkPathsToCopy.length} widgets to Mendix project ${basename(process.env.MX_PROJECT_PATH)}`
    );
}

async function asyncFilter(array, fn) {
    return Promise.all(array.map(fn)).then(booleans => array.filter((_, i) => booleans[i]));
}

async function isNativeWidgetFolder(widgetFolderName) {
    return (
        widgetFolderName.includes("-native") &&
        (await stat(join(pluggableWidgetsFolderPath, widgetFolderName))).isDirectory()
    );
}

async function getFileModifiedTime(path) {
    return path
        ? {
              path,
              mtime: (await stat(path)).mtime.getTime()
          }
        : null;
}
