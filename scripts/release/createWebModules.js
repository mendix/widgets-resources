const { basename, join } = require("path");
const { mkdir, copyFile, rm } = require("fs/promises");
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
    updateModuleChangelogs,
    regex
} = require("./module-automation/commons");
const { execSync } = require("child_process");

const repoRootPath = join(__dirname, "../../");
const moduleFolderNameInRepo = process.argv[2];
const moduleFolder = join(repoRootPath, `packages/modules/${moduleFolderNameInRepo}`);

main().catch(e => {
    console.error(e);
    process.exit(-1);
});

async function main() {
    const modules = ["data-widgets", "atlas-web-content", "atlas-core", "web-actions", "charts", "chart-widgets"];
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
        case "charts":
            await createChartsModule();
            break;
        case "web-actions":
            await createWebActionsModule();
            break;
        case "chart-widgets": {
            await execShellCommand(`npx lerna run release:module --scope chart-widgets`);
            break;
        }
    }
}

async function createDataWidgetsModule() {
    console.log("Creating the Data Widgets module.");
    execSync("npm run release:module", {
        stdio: "inherit",
        cwd: join(repoRootPath, "packages/modules", "data-widgets")
    });
    const widgets = [
        "datagrid-date-filter-web",
        "datagrid-dropdown-filter-web",
        "datagrid-number-filter-web",
        "datagrid-text-filter-web",
        "datagrid-web",
        "dropdown-sort-web",
        "gallery-web",
        "tree-node-web"
    ].map(folder => join(repoRootPath, "packages/pluggableWidgets", folder));
    const moduleInfo = {
        ...(await getPackageInfo(moduleFolder)),
        moduleNameInModeler: "DataWidgets",
        moduleFolderNameInModeler: "datawidgets"
    };

    await commonActions(moduleInfo, widgets, false, "WIDGETS");
    console.log("Done.");
}

async function createAtlasWebContentModule() {
    console.log("Creating the Atlas Web Content module.");
    execSync("npm run release:module", {
        stdio: "inherit",
        cwd: join(repoRootPath, "packages/modules", "atlas-web-content")
    });
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
    console.log("Creating the Atlas Core module.");
    execSync("npm run release:module", { stdio: "inherit", cwd: join(repoRootPath, "packages/modules", "atlas-core") });
    const widgets = ["feedback-native"].map(folder => join(repoRootPath, "packages/pluggableWidgets", folder));
    const moduleInfo = {
        ...(await getPackageInfo(moduleFolder)),
        moduleNameInModeler: "Atlas_Core",
        moduleFolderNameInModeler: "atlas_core"
    };
    await commonActions(moduleInfo, widgets);
    console.log("Done.");
}

async function createChartsModule() {
    console.log("Creating the Charts module.");
    execSync("npm run release:module", { stdio: "inherit", cwd: join(repoRootPath, "packages/modules", "charts") });
    const widgets = [
        "area-chart-web",
        "bar-chart-web",
        "bubble-chart-web",
        "column-chart-web",
        "heatmap-chart-web",
        "line-chart-web",
        "pie-doughnut-chart-web",
        "time-series-chart-web"
    ].map(folder => join(repoRootPath, "packages/pluggableWidgets", folder));
    const moduleInfo = {
        ...(await getPackageInfo(moduleFolder)),
        moduleNameInModeler: "Charts",
        moduleFolderNameInModeler: "charts"
    };
    await commonActions(moduleInfo, widgets, false, "WIDGETS");
    console.log("Done.");
}

async function createWebActionsModule() {
    console.log("Creating the Web Actions module.");
    const moduleInfo = {
        ...(await getPackageInfo(moduleFolder)),
        moduleNameInModeler: "WebActions",
        moduleFolderNameInModeler: "webactions"
    };

    const tmpFolder = join(repoRootPath, "tmp", moduleFolderNameInRepo);
    await githubAuthentication(moduleInfo);
    const moduleChangelogs = await updateModuleChangelogs(moduleInfo);
    if (!moduleChangelogs) {
        throw new Error(
            `No unreleased changes found in the CHANGELOG.md for ${moduleInfo.nameWithSpace} ${moduleInfo.version}.`
        );
    }
    await commitAndCreatePullRequest(moduleInfo);
    await updateTestProjectWithJavascript(tmpFolder, moduleInfo);
    const mpkOutput = await createMPK(tmpFolder, moduleInfo, regex.excludeFiles);

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

async function commonActions(moduleInfo, widgets = [], exportWithSnippet = true, changeLogScope = "MODULE") {
    const tmpFolder = join(repoRootPath, "tmp", moduleFolderNameInRepo);
    await githubAuthentication(moduleInfo);
    const moduleChangelogs = await (changeLogScope === "WIDGETS"
        ? updateChangelogs(widgets, moduleInfo)
        : updateModuleChangelogs(moduleInfo));
    if (!moduleChangelogs) {
        throw new Error(
            `No unreleased changes found in the CHANGELOG.md for ${moduleInfo.nameWithSpace} ${moduleInfo.version}.`
        );
    }
    await commitAndCreatePullRequest(moduleInfo);
    if (exportWithSnippet) {
        await updateTestProjectWithWidgetsAndAtlas(moduleInfo, tmpFolder, widgets);
    } else {
        await updateTestProject(tmpFolder, widgets, moduleInfo);
    }
    const mpkOutput = await createMPK(tmpFolder, moduleInfo, regex.excludeFiles);

    if (!exportWithSnippet) {
        await exportModuleWithWidgets(moduleInfo.moduleNameInModeler, mpkOutput, widgets);
    }
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

    console.log("Updating project..");
    await cloneRepo(moduleInfo.testProjectUrl, tmpFolder);

    console.log("Copying widgets and styles..");
    await Promise.all([
        ...widgetsFolders.map(async folder => {
            const src = (await getFiles(folder, [`.mpk`]))[0];
            const dest = join(tmpFolderWidgets, basename(src));
            await rm(dest, { force: true });
            await copyFile(src, dest);
        }),
        ...styles.map(async file => {
            const dest = join(tmpFolderActions, file.replace(stylesPath, ""));
            await rm(dest, { force: true });
            await mkdir(dest.replace(basename(dest), ""), { recursive: true });
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
            await mkdir(dest.replace(basename(dest), ""), { recursive: true });
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

async function updateTestProjectWithJavascript(tmpFolder, moduleInfo) {
    const javascriptFiles = join(repoRootPath, `packages/modules/${moduleFolderNameInRepo}/dist/javascriptsource`);
    const files = await getFiles(javascriptFiles);
    const tmpFolderJs = join(tmpFolder, "javascriptsource");

    console.log("Updating project..");
    await cloneRepo(moduleInfo.testProjectUrl, tmpFolder);

    console.log("Copying javascript files..");
    await Promise.all([
        ...files.map(async file => {
            const dest = join(tmpFolderJs, file.replace(javascriptFiles, ""));
            await rm(dest, { force: true });
            await mkdir(dest.replace(basename(dest), ""), { recursive: true });
            await copyFile(file, dest);
        })
    ]);
    await execShellCommand(
        `echo ${moduleInfo.version} > javascriptsource/${moduleInfo.moduleFolderNameInModeler}/.version`,
        tmpFolder
    );
    const gitOutput = await execShellCommand(`cd ${tmpFolder} && git status`);
    if (/nothing to commit/i.test(gitOutput)) {
        console.warn(`Nothing to commit from repo ${tmpFolder}s`);
    } else {
        await execShellCommand(`git add . && git commit -m "Updated widgets and styles" && git push`, tmpFolder);
    }
}
