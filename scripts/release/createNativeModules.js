const { basename, join } = require("path");
const { readdir, copyFile, rm } = require("fs/promises");
const {
    execShellCommand,
    getFiles,
    getPackageInfo,
    bumpVersionInPackageJson,
    commitAndCreatePullRequest,
    updateChangelogs,
    updateModuleChangelogs,
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
    const modules = ["mobile-resources-native", "nanoflow-actions-native", "atlas_nativemobile_content"];
    if (!modules.includes(moduleFolderNameInRepo) || !version) {
        return;
    }

    switch (moduleFolderNameInRepo) {
        case "mobile-resources-native":
            await createNativeMobileResourcesModule();
            break;
        case "nanoflow-actions-native":
            await createNanoflowCommonsModule();
            break;
        case "atlas_nativemobile_content":
            await createAtlasNativeContentModule();
            break;
    }
}

async function createNativeMobileResourcesModule() {
    console.log("Creating the Native Mobile Resource module.");
    const moduleFolder = join(repoRootPath, "packages/jsActions", moduleFolderNameInRepo);
    const tmpFolder = join(repoRootPath, "tmp", moduleFolderNameInRepo);
    const widgetFolders = await readdir(join(repoRootPath, "packages/pluggableWidgets"));
    const nativeWidgetFolders = widgetFolders
        .filter(folder => folder.includes("-native"))
        .map(folder => join(repoRootPath, "packages/pluggableWidgets", folder));
    let moduleInfo = {
        ...(await getPackageInfo(moduleFolder)),
        moduleNameInModeler: "NativeMobileResources",
        moduleFolderNameInModeler: "nativemobileresources"
    };
    moduleInfo = await bumpVersionInPackageJson(moduleFolder, moduleInfo);

    await githubAuthentication(moduleInfo);
    const moduleChangelogs = await updateChangelogs(nativeWidgetsChangelogs, moduleInfo);
    await commitAndCreatePullRequest(moduleInfo);
    await updateNativeComponentsTestProject(moduleInfo, tmpFolder, nativeWidgetFolders);
    const mpkOutput = await createMPK(tmpFolder, moduleInfo);
    await createGithubRelease(moduleInfo, moduleChangelogs, mpkOutput);
    await execShellCommand(`rm -rf ${tmpFolder}`);
    console.log("Done.");
}

async function createNanoflowCommonsModule() {
    console.log("Creating the Nanoflow Commons module.");
    const moduleFolder = join(repoRootPath, "packages/jsActions", moduleFolderNameInRepo);
    const tmpFolder = join(repoRootPath, "tmp", moduleFolderNameInRepo);
    let moduleInfo = {
        ...(await getPackageInfo(moduleFolder)),
        moduleNameInModeler: "NanoflowCommons",
        moduleFolderNameInModeler: "nanoflowcommons"
    };
    moduleInfo = await bumpVersionInPackageJson(moduleFolder, moduleInfo);

    await githubAuthentication(moduleInfo);
    const moduleChangelogs = await updateModuleChangelogs(moduleInfo);
    await commitAndCreatePullRequest(moduleInfo);
    await updateNativeComponentsTestProject(moduleInfo, tmpFolder);
    const mpkOutput = await createMPK(tmpFolder, moduleInfo);
    await createGithubRelease(moduleInfo, moduleChangelogs, mpkOutput);
    await execShellCommand(`rm -rf ${tmpFolder}`);
    console.log("Done.");
}

async function createAtlasNativeContentModule() {
    console.log("Creating the Atlas Native Content module.");
    const moduleFolder = join(repoRootPath, "packages/theming/atlas");
    const tmpFolder = join(repoRootPath, "tmp", moduleFolderNameInRepo);
    let moduleInfo = {
        ...(await getPackageInfo(moduleFolder, moduleFolderNameInRepo, "CHANGELOG-atlas-nativecontent")),
        moduleNameInModeler: "Atlas_NativeMobile_Content",
        moduleFolderNameInModeler: "atlas_nativemobile_content"
    };
    moduleInfo = await bumpVersionInPackageJson(moduleFolder, moduleInfo);
    await githubAuthentication(moduleInfo);
    const moduleChangelogs = await updateModuleChangelogs(moduleInfo);
    await commitAndCreatePullRequest(moduleInfo);
    await updateNativeComponentsTestProjectWithAtlas(moduleInfo, tmpFolder);
    const mpkOutput = await createMPK(tmpFolder, moduleInfo);
    await createGithubRelease(moduleInfo, moduleChangelogs, mpkOutput);
    await execShellCommand(`rm -rf ${tmpFolder}`);
    console.log("Done.");
}

// Update test project with latest changes and update version in themesource
async function updateNativeComponentsTestProject(moduleInfo, tmpFolder, nativeWidgetFolders) {
    const jsActionsPath = join(repoRootPath, `packages/jsActions/${moduleFolderNameInRepo}/dist`);
    const jsActions = await getFiles(jsActionsPath);
    const tmpFolderActions = join(tmpFolder, `javascriptsource/${moduleInfo.moduleFolderNameInModeler}/actions`);

    console.log("Updating NativeComponentsTestProject..");
    await cloneRepo(moduleInfo.testProjectUrl, tmpFolder);

    console.log("Copying JS actions..");
    await Promise.all([
        ...jsActions.map(async file => {
            const dest = join(tmpFolderActions, file.replace(jsActionsPath, ""));
            await rm(dest);
            await copyFile(file, dest);
        })
    ]);
    if (nativeWidgetFolders) {
        console.log("Copying widgets..");
        await Promise.all([
            ...nativeWidgetFolders.map(async folder => {
                const src = (await getFiles(folder, [`.mpk`]))[0];
                const dest = join(tmpFolder, "widgets", basename(src));
                await rm(dest);
                await copyFile(src, dest);
            })
        ]);
    }

    await execShellCommand(`echo ${version} > themesource/${moduleInfo.moduleFolderNameInModeler}/.version`, tmpFolder);
    const gitOutput = await execShellCommand(`cd ${tmpFolder} && git status`);
    if (!/nothing to commit/i.test(gitOutput)) {
        await execShellCommand(
            `git add . && git commit -m "Updated JS actions ${nativeWidgetFolders ? "and widgets" : ""}" && git push`,
            tmpFolder
        );
    } else {
        console.warn(`Nothing to commit from repo ${tmpFolder}`);
    }
}

// Update test project with latest changes and update version in themesource
async function updateNativeComponentsTestProjectWithAtlas(moduleInfo, tmpFolder) {
    const atlasNativeContentPath = join(
        repoRootPath,
        `packages/theming/atlas/dist/themesource/${moduleFolderNameInRepo}`
    );
    const atlasNativeContent = await getFiles(atlasNativeContentPath);
    const tmpFolderNativeStyles = join(tmpFolder, `themsource/${moduleInfo.moduleFolderNameInModeler}/native`);

    console.log("Updating NativeComponentsTestProject..");
    await cloneRepo(moduleInfo.testProjectUrl, tmpFolder);

    console.log("Copying Native styling files..");
    await Promise.all([
        ...atlasNativeContent.map(async file => {
            const dest = join(tmpFolderNativeStyles, file.replace(atlasNativeContentPath, ""));
            await rm(dest);
            await copyFile(file, dest);
        })
    ]);

    await execShellCommand(`echo ${version} > themesource/${moduleInfo.moduleFolderNameInModeler}/.version`, tmpFolder);
    const gitOutput = await execShellCommand(`cd ${tmpFolder} && git status`);
    if (!/nothing to commit/i.test(gitOutput)) {
        await execShellCommand(`git add . && git commit -m "Updated Atlas native styling" && git push`, tmpFolder);
    } else {
        console.warn(`Nothing to commit from repo ${tmpFolder}`);
    }
}
