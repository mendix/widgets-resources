const { basename, join } = require("path");
const { copyFile, readdir, rm } = require("fs/promises");
const {
    execShellCommand,
    getFiles,
    getPackageInfo,
    commitAndCreatePullRequest,
    updateChangelogs,
    githubAuthentication,
    cloneRepo,
    createMPK,
    createGithubReleaseFrom,
    exportModuleWithWidgets,
    updateModuleChangelogs
} = require("./module-automation/commons");

const repoRootPath = join(__dirname, "../../");
const moduleFolderNameInRepo = process.argv[2];
const moduleFolder = join(repoRootPath, `packages/modules/${moduleFolderNameInRepo}`);

main().catch(e => {
    console.error(e);
    process.exit(-1);
});

async function main() {
    const modules = ["data-widgets", "atlas-web-content", "atlas-core"];
    if (!modules.includes(moduleFolderNameInRepo)) {
        return;
    }

    switch (moduleFolderNameInRepo) {
        case "data-widgets":
            await createDataWidgetsModule();
            break;
        case "atlas-web-content":
            await createAtlasWebContentModule();
            break;
        case "atlas-core":
            await createAtlasCoreModule();
            break;
    }
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
    const tmpFolder = join(repoRootPath, "tmp/data-widgets");
    const widgetFolders = await readdir(join(repoRootPath, "packages/pluggableWidgets"));
    const dataWidgetsFolders = widgetFolders
        .filter(folder => widgets.includes(folder))
        .map(folder => join(repoRootPath, "packages/pluggableWidgets", folder));
    const moduleInfo = {
        ...(await getPackageInfo(moduleFolder)),
        moduleNameInModeler: "DataWidgets",
        moduleFolderNameInModeler: "datawidgets"
    };

    await githubAuthentication(moduleInfo);
    const moduleChangelogs = await updateChangelogs(dataWidgetsFolders, moduleInfo);
    if (!moduleChangelogs) {
        throw new Error(
            `No unreleased changes found in the CHANGELOG.md for ${moduleInfo.nameWithSpace} ${moduleInfo.version}.`
        );
    }
    await commitAndCreatePullRequest(moduleInfo);
    await updateTestProject(tmpFolder, dataWidgetsFolders, moduleInfo);
    const mpkOutput = await createMPK(tmpFolder, moduleInfo, `(resources|userlib)[\\/]`);

    await exportModuleWithWidgets(moduleInfo.moduleNameInModeler, mpkOutput, dataWidgetsFolders);

    await createGithubReleaseFrom({
        title: `${moduleInfo.nameWithSpace} - Marketplace Release v${moduleInfo.version}`,
        body: moduleChangelogs.replace(/"/g, "'"),
        tag: `${moduleFolderNameInRepo}-v${moduleInfo.version}`,
        mpkOutput,
        isDraft: true
    });
    await execShellCommand(`rm -rf ${tmpFolder}`);
    console.log("Done.");
}

async function createAtlasWebContentModule() {
    console.log("Creating the Atlas Web Content module.");
    const widgets = ["badge-web", "maps-web", "progress-bar-web", "progress-circle-web", "timeline-web"].map(folder =>
        join(repoRootPath, "packages/pluggableWidgets", folder)
    );
    const moduleInfo = {
        ...(await getPackageInfo(moduleFolder)),
        moduleNameInModeler: "Atlas_Web_Content",
        moduleFolderNameInModeler: "atlas_web_content"
    };
    await commonActions(moduleInfo, widgets);
    console.log("Done.");
}

async function createAtlasCoreModule() {
    console.log("Creating the Atlas Web Content module.");
    const widgets = ["feedback-native"].map(folder => join(repoRootPath, "packages/pluggableWidgets", folder));
    const moduleInfo = {
        ...(await getPackageInfo(moduleFolder)),
        moduleNameInModeler: "Atlas_Core",
        moduleFolderNameInModeler: "atlas_core"
    };
    await commonActions(moduleInfo, widgets);
    console.log("Done.");
}

async function commonActions(moduleInfo, widgets) {
    const tmpFolder = join(repoRootPath, "tmp", moduleFolderNameInRepo);
    await githubAuthentication(moduleInfo);
    const moduleChangelogs = await updateModuleChangelogs(moduleInfo);
    if (!moduleChangelogs) {
        throw new Error(
            `No unreleased changes found in the CHANGELOG.md for ${moduleInfo.nameWithSpace} ${moduleInfo.version}.`
        );
    }
    await commitAndCreatePullRequest(moduleInfo);
    await updateTestProjectWithWidgetsAndAtlas(moduleInfo, tmpFolder, widgets);
    const mpkOutput = await createMPK(tmpFolder, moduleInfo, `(resources|userlib)[\\/]`);
    await createGithubReleaseFrom({
        title: `${moduleInfo.nameWithSpace} - Marketplace Release v${moduleInfo.version}`,
        body: moduleChangelogs.replace(/"/g, "'"),
        tag: `${moduleFolderNameInRepo}-v${moduleInfo.version}`,
        mpkOutput,
        isDraft: true
    });
    await execShellCommand(`rm -rf ${tmpFolder}`);
}

async function buildAndCopyWidgets(tmpFolder, widgetsFolders) {
    console.log("Building and copying widgets..");
    await Promise.all([
        ...widgetsFolders.map(async folder => {
            await execShellCommand("npm run release", folder);
            const src = (await getFiles(folder, [`.mpk`]))[0];
            const dest = join(tmpFolder, "widgets", basename(src));
            await rm(dest, { force: true });
            await copyFile(src, dest);
        })
    ]);
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
    await execShellCommand(
        `echo ${moduleInfo.version} > themesource/${moduleInfo.moduleFolderNameInModeler}/.version`,
        tmpFolder
    );
    const gitOutput = await execShellCommand(`cd ${tmpFolder} && git status`);
    if (/nothing to commit/i.test(gitOutput)) {
        console.warn(`Nothing to commit from repo ${tmpFolder}s`);
    } else {
        await execShellCommand(`git add . && git commit -m "Updated widgets and styles" && git push`, tmpFolder);
    }
}

async function updateTestProjectWithWidgetsAndAtlas(moduleInfo, tmpFolder, widgets) {
    const projectPath = join(
        repoRootPath,
        `packages/modules/${moduleFolderNameInRepo}/dist/themesource/${moduleInfo.moduleFolderNameInModeler}`
    );
    const projectFiles = await getFiles(projectPath);
    const tmpFolderStyles = join(tmpFolder, `themesource/${moduleInfo.moduleFolderNameInModeler}`);

    console.log(`Updating project from ${moduleInfo.testProjectUrl}..`);
    await cloneRepo(moduleInfo.testProjectUrl, tmpFolder);

    console.log("Copying styling files and assets..");
    await Promise.all([
        ...projectFiles.map(async file => {
            const dest = join(tmpFolderStyles, file.replace(projectPath, ""));
            await rm(dest, { force: true });
            await copyFile(file, dest);
        })
    ]);

    await buildAndCopyWidgets(tmpFolder, widgets);

    await execShellCommand(
        `echo ${moduleInfo.version} > themesource/${moduleInfo.moduleFolderNameInModeler}/.version`,
        tmpFolder
    );
    const gitOutput = await execShellCommand(`cd ${tmpFolder} && git status`);
    if (/nothing to commit/i.test(gitOutput)) {
        console.warn(`Nothing to commit from repo ${tmpFolder}`);
    } else {
        await execShellCommand("git add . && git commit -m 'Updated widgets and styling' && git push", tmpFolder);
    }
}
