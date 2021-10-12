const { basename, join } = require("path");
const { readdir, copyFile, rm } = require("fs/promises");
const {
    execShellCommand,
    getFiles,
    getPackageInfo,
    bumpVersionInPackageJson,
    commitAndCreatePullRequest,
    updateChangelogs,
    githubAuthentication,
    cloneRepo,
    createMPK,
    createGithubRelease
} = require("./module-automation/commons");

const repoRootPath = join(__dirname, "../../");
const [moduleFolderNameInRepo, version] = process.env.TAG.split("-v");

main().catch(e => {
    console.error(e);
    process.exit(-1);
});

async function main() {
    if (!moduleFolderNameInRepo || !version) {
        return;
    }

    await createDataWidgetsModule();
}

async function createDataWidgetsModule() {
    console.log("Creating the Data Widgets module.");
    const widgets = [
        "datagrid-date-filter-web",
        "datagrid-dropdown-filter-web",
        "datagrid-number-filter-web",
        "datagrid-text-filter-web",
        "datagrid-web",
        "dropdown-sort-web",
        "gallery-web",
        "tree-node-web"
    ];
    const DWFolder = join(repoRootPath, "packages/modules/data-widgets");
    const tmpFolder = join(repoRootPath, "tmp/data-widgets");
    const widgetFolders = await readdir(join(repoRootPath, "packages/pluggableWidgets"));
    const dataWidgetsFolders = widgetFolders
        .filter(folder => widgets.includes(folder))
        .map(folder => join(repoRootPath, "packages/pluggableWidgets", folder));
    let moduleInfo = {
        ...(await getPackageInfo(moduleFolder)),
        moduleNameInModeler: "DataWidgets",
        moduleFolderNameInModeler: "datawidgets"
    };
    moduleInfo = await bumpVersionInPackageJson(DWFolder, moduleInfo);

    await githubAuthentication(moduleInfo);
    const moduleChangelogs = await updateChangelogs(dataWidgetsFolders, moduleInfo);
    await commitAndCreatePullRequest(moduleInfo);
    await updateTestProject(tmpFolder, dataWidgetsFolders, moduleInfo);
    const mpkOutput = await createMPK(tmpFolder, moduleInfo);
    await createGithubRelease(moduleInfo, moduleChangelogs, mpkOutput);
    await execShellCommand(`rm -rf ${tmpFolder}`);
    console.log("Done.");
}

// Update test project with latest changes and update version in themesource
async function updateTestProject(tmpFolder, widgetsFolders, moduleInfo) {
    const stylesPath = join(repoRootPath, `packages/modules/${moduleFolderNameInRepo}/src/themesource`);
    const styles = await getFiles(stylesPath);
    const tmpFolderWidgets = join(tmpFolder, "widgets");
    const tmpFolderActions = join(tmpFolder, "themesource");

    console.log("Updating DataWidgets project..");
    await cloneRepo(moduleInfo.testProjectUrl, tmpFolder);

    console.log("Copying widgets and styles..");
    await Promise.all([
        ...widgetsFolders.map(async folder => {
            const src = (await getFiles(folder, [`.mpk`]))[0];
            const dest = join(tmpFolderWidgets, basename(src));
            await rm(dest);
            await copyFile(src, dest);
        }),
        ...styles.map(async file => {
            const dest = join(tmpFolderActions, file.replace(stylesPath, ""));
            await rm(dest);
            await copyFile(file, dest);
        })
    ]);
    await execShellCommand(`echo ${version} > themesource/${moduleInfo.moduleFolderNameInModeler}/.version`, tmpFolder);
    const gitOutput = await execShellCommand(`cd ${tmpFolder} && git status`);
    if (!/nothing to commit/i.test(gitOutput)) {
        await execShellCommand(`git add . && git commit -m "Updated widgets and styles" && git push`, tmpFolder);
    } else {
        console.warn(`Nothing to commit from repo ${tmpFolder}s`);
    }
}
