const { basename, extname, join, resolve } = require("path");
const { access, readdir, readFile, writeFile, rm } = require("fs/promises");
const { mkdir } = require("shelljs");
const { exec } = require("child_process");

const regex = {
    changelogs: /(?<=## \[unreleased\]\n)((?!## \[\d+\.\d+\.\d+\])\W|\w)*/i,
    changelogsIncludingUnreleased: /## \[unreleased\]\n?((?!## \[\d+\.\d+\.\d+\])\W|\w)*/i,
    releasedVersions: /(?<=## \[)\d+\.\d+\.\d+(?=\])/g
};

async function setLocalGitCredentials(workingDirectory) {
    await execShellCommand(`git config user.name "${process.env.GH_NAME}"`, workingDirectory);
    await execShellCommand(`git config user.email "${process.env.GH_EMAIL}"`, workingDirectory);
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

async function getFiles(dir, includeExtension = []) {
    const dirents = await readdir(dir, { withFileTypes: true });
    const files = await Promise.all(
        dirents
            .filter(dirent => !dirent.name.startsWith("."))
            .map(dirent => {
                const res = resolve(dir, dirent.name);
                return dirent.isDirectory() ? getFiles(res, includeExtension) : res;
            })
    );
    return files
        .flat()
        .filter(file => !includeExtension?.length || (extname(file) && includeExtension?.includes(extname(file))));
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

async function bumpVersionInPackageJson(moduleFolder, moduleInfo) {
    const moduleVersionNew = process.env.TAG?.split("-v")?.[1];
    if (moduleInfo.version === moduleVersionNew) {
        throw new Error(
            `It looks like version ${moduleInfo.version} of "${moduleInfo.nameWithSpace}" has been released already. Did you manually bump the version without releasing? Then you should revert the bump before retrying.`
        );
    } else {
        console.log(
            `Bumping "${moduleInfo.nameWithSpace}" version from ${moduleInfo.version} to ${moduleVersionNew}..`
        );
        const pkgPath = join(moduleFolder, "package.json");
        const pkg = require(pkgPath);
        moduleInfo.version = pkg.version = moduleVersionNew;
        await writeFile(pkgPath, JSON.stringify(pkg, null, 2));
    }
    return moduleInfo;
}

async function writeToWidgetChangelogs(changelogs, { nameWithSpace, changelogPath, version }) {
    const d = new Date();
    const date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    const content = await readFile(changelogPath, "utf8");
    const oldChangelogs = content.match(regex.changelogs)?.[0].trim();
    const newContent = content
        .replace(oldChangelogs, changelogs)
        .replace(`## [Unreleased]`, `## [Unreleased]\n\n## [${version}] - ${date}`);
    await writeFile(changelogPath, newContent);
}

async function writeToModuleChangelogs(changelogs, { nameWithSpace, changelogPath, version }) {
    const d = new Date();
    const date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    const content = await readFile(changelogPath, "utf8");
    const oldChangelogs = content.match(regex.changelogsIncludingUnreleased)?.[0].trim();
    const newContent = content.replace(
        oldChangelogs,
        `## [Unreleased]\n\n## [${version}] ${nameWithSpace} - ${date}\n${changelogs}`
    );
    await writeFile(changelogPath, newContent);
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

// Update changelogs and create PR in widget-resources
async function commitAndCreatePullRequest(moduleInfo) {
    const changelogBranchName = `${moduleInfo.nameWithDash}-release-${moduleInfo.version}`;
    await execShellCommand(
        `git checkout -b ${changelogBranchName} && git add . && git commit -m "chore(${moduleInfo.nameWithDash}): update changelogs" && git push --set-upstream origin ${changelogBranchName}`
    );
    await execShellCommand(
        `gh pr create --title "${moduleInfo.nameWithSpace}: Updating changelogs" --body "This is an automated PR." --base master --head ${changelogBranchName}`
    );
    console.log("Created PR for changelog updates.");
}

async function updateWidgetChangelogs(widgetsFolders) {
    console.log("Updating widget changelogs..");
    const nativeWidgetsChangelogs = [];
    for await (const folder of widgetsFolders) {
        const widgetInfo = await getPackageInfo(folder);
        if (!widgetInfo) {
            continue;
        }
        const widgetChangelogs = await getUnreleasedChangelogs(widgetInfo);
        if (widgetChangelogs) {
            nativeWidgetsChangelogs.push(`## [${widgetInfo.version}] ${widgetInfo.nameWithSpace}\n${widgetChangelogs}`);
            console.log(`Writing "${widgetInfo.nameWithSpace}" changelogs to ${widgetInfo.changelogPath}`);
            await writeToWidgetChangelogs(widgetChangelogs, widgetInfo);
        }
    }
    return nativeWidgetsChangelogs;
}

async function updateModuleChangelogs(moduleInfo, nativeWidgetsChangelogs) {
    console.log("Updating module changelogs..");
    const moduleChangelogs = await getUnreleasedChangelogs(moduleInfo);
    const newModuleChangelogs = nativeWidgetsChangelogs?.length
        ? `${moduleChangelogs}\n\n${nativeWidgetsChangelogs.join("\n\n")}`
        : moduleChangelogs;
    if (newModuleChangelogs) {
        console.log(`Writing "${moduleInfo.nameWithSpace}" changelogs to ${moduleInfo.changelogPath}`);
        await writeToModuleChangelogs(newModuleChangelogs, moduleInfo);
    }
    return newModuleChangelogs;
}

async function updateChangelogs(widgetFolders, moduleInfo) {
    const nativeWidgetsChangelogs = await updateWidgetChangelogs(widgetFolders);
    return updateModuleChangelogs(moduleInfo, nativeWidgetsChangelogs);
}

async function githubAuthentication(moduleInfo) {
    await setLocalGitCredentials();
    await execShellCommand(
        `git remote set-url origin https://${process.env.GH_USERNAME}:${process.env.GH_PAT}@${moduleInfo.url.replace(
            "https://",
            ""
        )}`
    );
    await execShellCommand(`echo "${process.env.GH_PAT}" | gh auth login --with-token`);
}

async function cloneRepo(githubUrl, localFolder) {
    const githubUrlDomain = githubUrl.replace("https://", "");
    const githubUrlAuthenticated = `https://${process.env.GH_USERNAME}:${process.env.GH_PAT}@${githubUrlDomain}`;
    await rm(localFolder, { recursive: true, force: true });
    mkdir("-p", localFolder);
    await execShellCommand(`git clone ${githubUrlAuthenticated} ${localFolder}`);
    await setLocalGitCredentials(localFolder);
}

async function createMPK(tmpFolder, moduleInfo) {
    console.log("Creating module MPK..");
    await createMxBuildContainer(tmpFolder, moduleInfo.moduleNameInModeler, moduleInfo.minimumMXVersion);
    return (await getFiles(tmpFolder, [`.mpk`]))[0];
}

async function createGithubRelease(moduleInfo, moduleChangelogs, mpkOutput) {
    console.log(`Creating Github release for module ${moduleInfo.nameWithSpace}`);
    await execShellCommand(
        `gh release create --title "${moduleInfo.nameWithSpace} ${moduleInfo.version} - Mendix ${moduleInfo.minimumMXVersion}" --notes "${moduleChangelogs}" "${process.env.TAG}" "${mpkOutput}"`
    );
}

module.exports = {
    setLocalGitCredentials,
    execShellCommand,
    getFiles,
    getPackageInfo,
    githubAuthentication,
    createMxBuildContainer,
    bumpVersionInPackageJson,
    commitAndCreatePullRequest,
    updateWidgetChangelogs,
    updateModuleChangelogs,
    updateChangelogs,
    cloneRepo,
    createMPK,
    createGithubRelease
};
