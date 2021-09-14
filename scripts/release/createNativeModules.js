const { join } = require("path");
const { access, readdir, readFile, copyFile, writeFile, rm } = require("fs/promises");
const { exec } = require("child_process");
const { basename, extname, resolve } = require("path");

const moduleVersionNew = process.env.TAG?.split("-v")?.[1];
const regex = {
    changelogs: /(?<=## \[unreleased\]\n)((?!## \[\d+\.\d+\.\d+\])\W|\w)*/i,
    releasedVersions: /(?<=## \[)\d+\.\d+\.\d+(?=\])/g
};

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

    const moduleInfo = await getPackageInfo(NMRFolder);
    await bumpVersionInPackageJson(NMRFolder, moduleInfo.version, moduleInfo.nameWithSpace);
    await setLocalGitCredentials();
    await execShellCommand(
        `git remote set-url origin https://${process.env.GH_USERNAME}:${process.env.GH_PAT}@${moduleInfo.url.replace(
            "https://",
            ""
        )}`
    );
    await execShellCommand(`echo "${process.env.GH_PAT}" | gh auth login --with-token`);

    const changelog = await updateChangelogs(nativeWidgetFolders, moduleInfo);
    await updateTestProject(tmpFolder, nativeWidgetFolders, moduleInfo.testProjectUrl);

    console.log("Creating module MPK..");
    await createMxBuildContainer(tmpFolder, "NativeMobileResources", moduleInfo.minimumMXVersion);
    const mpkOutput = (await getFiles(tmpFolder, [`.mpk`]))[0];

    console.log(`Creating Github release for module ${moduleInfo.nameWithSpace}`);
    await execShellCommand(
        `gh release create --title "${moduleInfo.nameWithSpace} ${moduleVersionNew} - Mendix ${moduleInfo.minimumMXVersion}" --notes "${changelog}" "${process.env.TAG}" "${mpkOutput}"`
    );
    await execShellCommand(`rm -rf ${tmpFolder}`);
    console.log("Done.");
}

// Update changelogs and create PR in widget-resources
async function updateChangelogs(nativeWidgetFolders, moduleInfo) {
    console.log("Updating changelogs..");
    const moduleChangelogs = await getUnreleasedChangelogs(moduleInfo);
    let nativeWidgetsChangelogs = "";
    for await (const folder of nativeWidgetFolders) {
        const widgetInfo = await getPackageInfo(folder);
        if (!widgetInfo) {
            continue;
        }
        const widgetChangelogs = await getUnreleasedChangelogs(widgetInfo);
        nativeWidgetsChangelogs += widgetChangelogs
            ? `## [${widgetInfo.version}] ${widgetInfo.nameWithSpace}\n\n${widgetChangelogs}\n\n`
            : "";
        if (widgetChangelogs) {
            console.log(`Writing "${widgetInfo.nameWithSpace}" changelogs to ${widgetInfo.changelogPath}`);
            await writeToChangelogs(widgetChangelogs, widgetInfo);
        }
    }
    // let newModuleChangelogs = moduleChangelogs
    //     ? `## [${moduleInfo.version}] ${moduleInfo.nameWithSpace}\n${moduleChangelogs}\n`
    //     : "";
    const newModuleChangelogs = nativeWidgetsChangelogs
        ? `${moduleChangelogs}\n\n${nativeWidgetsChangelogs}`
        : moduleChangelogs;
    if (newModuleChangelogs) {
        console.log(`Writing "${moduleInfo.nameWithSpace}" changelogs to ${moduleInfo.changelogPath}`);
        await writeToChangelogs(newModuleChangelogs, moduleInfo);
    }

    const changelogBranchName = `${moduleInfo.nameWithDash}-release-${moduleVersionNew}`;
    await execShellCommand(
        `git checkout -b ${changelogBranchName} && git add . && git commit -m "chore(${moduleInfo.nameWithDash}): update changelogs" && git push --set-upstream origin ${changelogBranchName}`
    );
    await execShellCommand(
        `gh pr create --title "Updating all the changelogs" --body "This is an automated PR." --base master --head ${changelogBranchName}`
    );
    console.log("Created PR for changelog updates.");
    return newModuleChangelogs;
}

async function getPackageInfo(path) {
    const pkgPath = join(path, `package.json`);
    try {
        await access(pkgPath);
        const { name, widgetName, moduleName, version, marketplace, testProject, repository } = require(pkgPath);
        return {
            nameWithDash: name,
            nameWithSpace: moduleName ?? widgetName,
            version,
            minimumMXVersion: marketplace?.minimumMXVersion,
            url: repository?.url,
            testProjectUrl: testProject?.githubUrl,
            testProjectBranchName: testProject?.branchName,
            changelogPath: `${path}/CHANGELOG.md`
        };
    } catch (error) {
        console.error(`ERROR: Path does not exist: ${pkgPath}`);
        return null;
    }
}

async function getUnreleasedChangelogs({ version, changelogPath }) {
    try {
        await access(changelogPath);
        const content = await readFile(changelogPath, "utf8");
        const changelogs = content.match(regex.changelogs)?.[0].trim();
        const releasedVersions = content.match(regex.releasedVersions);
        if (releasedVersions?.includes(version)) {
            throw new Error(
                `It looks like version ${version} from package.json is already released. Did you forget to bump the version?`
            );
        }

        return changelogs || "";
    } catch (error) {
        console.error(`ERROR: Path does not exist: ${changelogPath}`);
    }
}

async function writeToChangelogs(changelogs, { name, changelogPath, version }) {
    const d = new Date();
    const date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    const content = await readFile(changelogPath, "utf8");
    const oldChangelogs = content.match(regex.changelogs)?.[0].trim();
    const newContent = content
        .replace(oldChangelogs, changelogs)
        .replace(`## [Unreleased]`, `## [Unreleased]\n\n## [${version}] ${date} - ${name}`);
    await writeFile(changelogPath, newContent);
}

async function bumpVersionInPackageJson(NMRFolder, moduleVersionOld, name) {
    if (moduleVersionOld === moduleVersionNew) {
        throw new Error(
            `It looks like version ${moduleVersionOld} of "${name}" has been released already. Did you manually bump the version without releasing? Then you should revert the bump before retrying.`
        );
    } else {
        console.log(`Bumping "${name}" version from ${moduleVersionOld} to ${moduleVersionNew}..`);
        const pkgPath = join(NMRFolder, "package.json");
        const pkg = require(pkgPath);
        pkg.version = moduleVersionNew;
        await writeFile(pkgPath, JSON.stringify(pkg, null, 2));
    }
}

// Update test project with latest changes
async function updateTestProject(tmpFolder, nativeWidgetFolders, githubUrl) {
    const jsActionsPath = join(process.cwd(), "packages/jsActions/mobile-resources-native/dist");
    const jsActions = await getFiles(jsActionsPath);
    const tmpFolderWidgets = join(tmpFolder, "widgets");
    const tmpFolderActions = join(tmpFolder, "javascriptsource/nativemobileresources/actions");

    console.log("Updating NativeComponentsTestProject..");
    const githubUrlDomain = githubUrl.replace("https://", "");
    const githubUrlAuthenticated = `https://${process.env.GH_USERNAME}:${process.env.GH_PAT}@${githubUrlDomain}`;
    await rm(tmpFolder, { recursive: true, force: true });
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

// Create reusable mxbuild image
async function createMxBuildContainer(sourceDir, moduleName, mendixVersion) {
    const existingImages = (await execShellCommand(`docker image ls -q mxbuild:${mendixVersion}`)).toString().trim();
    if (!existingImages) {
        console.log(`Creating new mxbuild docker image...`);
        await execShellCommand(
            `docker build -f ${join(
                process.cwd(),
                "packages/tools/pluggable-widgets-tools/scripts/mxbuild.Dockerfile"
            )} ` +
                `--build-arg MENDIX_VERSION=${mendixVersion} ` +
                `-t mxbuild:${mendixVersion} ${process.cwd()}`
        );
    }

    // Build testProject via mxbuild
    const projectFile = basename((await getFiles(sourceDir, [`.mpr`]))[0]);
    await execShellCommand(
        `docker run -t -v ${sourceDir}:/source ` +
            `--rm mxbuild:${mendixVersion} bash -c "mx update-widgets --loose-version-check /source/${projectFile} && mono /tmp/mxbuild/modeler/mxutil.exe create-module-package /source/${projectFile} ${moduleName}"`
    );
    console.log(`Module ${moduleName} created successfully.`);
}

function execShellCommand(cmd, workingDirectory = process.cwd()) {
    return new Promise((resolve, reject) => {
        exec(cmd, { cwd: workingDirectory }, (error, stdout, stderr) => {
            if (error) {
                console.warn(stderr);
                console.warn(stdout);
                reject(error);
            }
            if (stderr) {
                console.warn(stderr);
            }
            resolve(stdout);
        });
    });
}

async function getFiles(dir, includeExtension) {
    const dirents = await readdir(dir, { withFileTypes: true });
    const files = await Promise.all(
        dirents.map(dirent => {
            const res = resolve(dir, dirent.name);
            return dirent.isDirectory() ? getFiles(res, includeExtension) : res;
        })
    );
    return files
        .flat()
        .filter(file => !includeExtension?.length || (extname(file) && includeExtension?.includes(extname(file))));
}

async function setLocalGitCredentials(workingDirectory) {
    await execShellCommand(`git config user.name "${process.env.GH_NAME}"`, workingDirectory);
    await execShellCommand(`git config user.email "${process.env.GH_EMAIL}"`, workingDirectory);
}
