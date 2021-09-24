const { basename, join } = require("path");
const { readdir, copyFile, rm } = require("fs/promises");
const { mkdir } = require("shelljs");
const {
    setLocalGitCredentials,
    execShellCommand,
    getFiles,
    getPackageInfo,
    createMxBuildContainer,
    bumpVersionInPackageJson,
    updateChangelogs,
    githubAuthentication
} = require("./module-automation/commons");

main().catch(e => {
    console.error(e);
    process.exit(-1);
});

async function main() {
    const modules = ["mobile-resources-native"];
    const moduleName = process.env.TAG.split("-v")[0];
    if (!modules.includes(moduleName)) {
        return;
    }

    switch (moduleName) {
        case "mobile-resources-native":
            await createNMRModule();
            break;
    }
}

async function createNMRModule() {
    console.log("Creating the Native Mobile Resource module.");
    const NMRFolder = join(process.cwd(), "packages/jsActions/mobile-resources-native");
    const tmpFolder = join(process.cwd(), "tmp/mobile-resources-native");
    const widgetFolders = await readdir(join(process.cwd(), "packages/pluggableWidgets"));
    const nativeWidgetFolders = widgetFolders
        .filter(folder => folder.includes("-native"))
        .map(folder => join(process.cwd(), "packages/pluggableWidgets", folder));

    let moduleInfo = await getPackageInfo(NMRFolder);
    moduleInfo = await bumpVersionInPackageJson(NMRFolder, moduleInfo);

    await githubAuthentication(moduleInfo);

    const changelog = await updateChangelogs(nativeWidgetFolders, moduleInfo);
    await updateTestProject(tmpFolder, nativeWidgetFolders, moduleInfo.testProjectUrl);

    console.log("Creating module MPK..");
    await createMxBuildContainer(tmpFolder, "NativeMobileResources", moduleInfo.minimumMXVersion);
    const mpkOutput = (await getFiles(tmpFolder, [`.mpk`]))[0];

    console.log(`Creating Github release for module ${moduleInfo.nameWithSpace}`);
    await execShellCommand(
        `gh release create --title "${moduleInfo.nameWithSpace} ${moduleInfo.version} - Mendix ${moduleInfo.minimumMXVersion}" --notes "${changelog}" "${process.env.TAG}" "${mpkOutput}"`
    );
    await execShellCommand(`rm -rf ${tmpFolder}`);
    console.log("Done.");
}

// Update test project with latest changes and update version in themesource
async function updateTestProject(tmpFolder, nativeWidgetFolders, githubUrl) {
    const jsActionsPath = join(process.cwd(), "packages/jsActions/mobile-resources-native/dist");
    const jsActions = await getFiles(jsActionsPath);
    const tmpFolderWidgets = join(tmpFolder, "widgets");
    const tmpFolderActions = join(tmpFolder, "javascriptsource/nativemobileresources/actions");

    console.log("Updating NativeComponentsTestProject..");
    const githubUrlDomain = githubUrl.replace("https://", "");
    const githubUrlAuthenticated = `https://${process.env.GH_USERNAME}:${process.env.GH_PAT}@${githubUrlDomain}`;
    await rm(tmpFolder, { recursive: true, force: true });
    mkdir("-p", tmpFolder);
    await execShellCommand(`git clone ${githubUrlAuthenticated} ${tmpFolder}`);

    await setLocalGitCredentials(tmpFolder);

    console.log("Copying widgets and js actions..");
    await Promise.all([
        ...nativeWidgetFolders.map(async folder => {
            const src = (await getFiles(folder, [`.mpk`]))[0];
            const dest = join(tmpFolderWidgets, basename(src));
            await rm(dest);
            await copyFile(src, dest);
        }),
        ...jsActions.map(async file => {
            const dest = join(tmpFolderActions, file.replace(jsActionsPath, ""));
            await rm(dest);
            await copyFile(file, dest);
        })
    ]);
    await execShellCommand(
        `echo ${process.env.TAG.split("-v")[1]} > themesource/nativemobileresources/.version`,
        tmpFolder
    );
    const gitOutput = await execShellCommand(`cd ${tmpFolder} && git status`);
    if (!/nothing to commit/i.test(gitOutput)) {
        await execShellCommand(
            `git add . && git commit -m "Updated native widgets and js actions" && git push`,
            tmpFolder
        );
    } else {
        console.warn(`Nothing to commit from repo ${tmpFolder}s`);
    }
}
