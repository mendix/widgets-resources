const { basename, join } = require("path");
const { readdir, copyFile, rm } = require("fs/promises");
const { mkdir } = require("shelljs");
const {
    setLocalGitCredentials,
    execShellCommand,
    getFiles,
    getPackageInfo,
    createMxBuildContainer,
    updateChangelogs,
    githubAuthentication,
    bumpVersionInPackageJson
} = require("./module-automation/commons");

const repoRootPath = join(__dirname, "../../");

main().catch(e => {
    console.error(e);
    process.exit(-1);
});

async function main() {
    const moduleName = process.env.TAG.split("-v")[0];
    if (moduleName !== "data-widgets") {
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

    let moduleInfo = await getPackageInfo(DWFolder);
    moduleInfo = await bumpVersionInPackageJson(DWFolder, moduleInfo);

    await githubAuthentication(moduleInfo);

    const changelog = await updateChangelogs(dataWidgetsFolders, moduleInfo);
    await updateTestProject(tmpFolder, dataWidgetsFolders, moduleInfo.testProjectUrl);

    console.log("Creating module MPK..");
    await createMxBuildContainer(tmpFolder, "DataWidgets", moduleInfo.minimumMXVersion);
    const mpkOutput = (await getFiles(tmpFolder, [`.mpk`]))[0];

    console.log(`Creating Github release for module ${moduleInfo.nameWithSpace}`);
    await execShellCommand(
        `gh release create --title "${moduleInfo.nameWithSpace} ${moduleInfo.version} - Mendix ${moduleInfo.minimumMXVersion}" --notes "${changelog}" "${process.env.TAG}" "${mpkOutput}"`
    );
    await execShellCommand(`rm -rf ${tmpFolder}`);
    console.log("Done.");
}

// Update test project with latest changes and update version in themesource
async function updateTestProject(tmpFolder, widgetsFolders, githubUrl) {
    const stylesPath = join(repoRootPath, "packages/modules/data-widgets/src/themesource");
    const styles = await getFiles(stylesPath);
    const tmpFolderWidgets = join(tmpFolder, "widgets");
    const tmpFolderActions = join(tmpFolder, "themesource");

    console.log("Updating DataWidgets project..");
    const githubUrlDomain = githubUrl.replace("https://", "");
    const githubUrlAuthenticated = `https://${process.env.GH_USERNAME}:${process.env.GH_PAT}@${githubUrlDomain}`;
    await rm(tmpFolder, { recursive: true, force: true });
    mkdir("-p", tmpFolder);
    await execShellCommand(`git clone ${githubUrlAuthenticated} ${tmpFolder}`);

    await setLocalGitCredentials(tmpFolder);

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
    await execShellCommand(`echo ${process.env.TAG.split("-v")[1]} > themesource/datawidgets/.version`, tmpFolder);
    const gitOutput = await execShellCommand(`cd ${tmpFolder} && git status`);
    if (!/nothing to commit/i.test(gitOutput)) {
        await execShellCommand(`git add . && git commit -m "Updated widgets and styles" && git push`, tmpFolder);
    } else {
        console.warn(`Nothing to commit from repo ${tmpFolder}s`);
    }
}
