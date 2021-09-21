const { join } = require("path");
const { access, readdir, readFile, writeFile } = require("fs/promises");
const { exec } = require("child_process");
const { basename, extname, resolve } = require("path");

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

function getPackageInfo(path) {
    const {
        name,
        widgetName,
        moduleName,
        version,
        marketplace: { minimumMXVersion },
        testProject: { githubUrl, branchName },
        repository: { url }
    } = require(`${path}/package.json`);
    return {
        nameWithDash: name,
        nameWithSpace: moduleName ?? widgetName,
        version,
        minimumMXVersion,
        url,
        testProjectUrl: githubUrl,
        testProjectBranchName: branchName,
        changelogPath: `${path}/CHANGELOG.md`
    };
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
    const moduleVersionNew = process.env.TAG.split("-v")[1];
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
        pkg.version = moduleVersionNew;
        await writeFile(pkgPath, pkg);
    }
}

async function writeToChangelogs(changelogs, changelogPath, version) {
    const d = new Date();
    const date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    const newContent = changelogs.replace(`## [Unreleased]`, `## [Unreleased]\n\n## [${version}] ${date}`);
    await writeFile(changelogPath, newContent);
}

async function getUnreleasedChangelogs({ name, version, changelogPath }) {
    try {
        await access(changelogPath);
        const content = await readFile(changelogPath, "utf8");
        const changelogs = content.match(/(?<=## \[unreleased\]\n)((?!## \[\d+\.\d+\.\d+\])\W|\w)*/i)?.[0].trim();
        const releasedVersions = content.match(/(?<=## \[)\d+\.\d+\.\d+(?=\])/g);
        if (releasedVersions?.includes(version)) {
            throw new Error(
                `It looks like version ${version} from package.json is already released. Did you forget to bump the version?`
            );
        }

        return changelogs
            ? `## [${version}] ${name}
            
            ${changelogs}\n\n`
            : "";
    } catch (error) {
        console.warn(`${changelogPath} does not exist.`);
    }
}

// Update changelogs and create PR in widget-resources
async function updateChangelogs(widgetsFolders, moduleInfo) {
    console.log("Updating changelogs..");
    const moduleChangelogs = await getUnreleasedChangelogs(moduleInfo);
    let nativeWidgetsChangelogs = "";
    for await (const folder of widgetsFolders) {
        const widgetInfo = getPackageInfo(folder);
        const widgetChangelogs = await getUnreleasedChangelogs(widgetInfo);
        nativeWidgetsChangelogs += changelogs || "";
        if (widgetChangelogs) {
            console.log(`Writing "${widgetInfo.nameWithSpace}" changelogs to ${widgetInfo.changelogPath}`);
            await writeToChangelogs(widgetChangelogs, widgetInfo.changelogPath, widgetInfo.version);
        }
    }
    let changelog = moduleChangelogs
        ? `## [${moduleInfo.version}] ${moduleInfo.nameWithSpace}\n${moduleChangelogs}\n`
        : "";
    changelog = nativeWidgetsChangelogs ? `${changelog}\n\n${nativeWidgetsChangelogs}` : changelog;
    if (changelog) {
        console.log(`Writing "${moduleInfo.nameWithSpace}" changelogs to ${moduleInfo.changelogPath}`);
        await writeToChangelogs(changelog, moduleInfo.changelogPath, moduleInfo.version);
    }

    const changelogBranchName = `${moduleInfo.name}-release-${moduleInfo.version}`;
    await execShellCommand(
        `git checkout -b ${changelogBranchName} && git add . && git commit -m "chore(${moduleInfo.name}): update changelogs" && git push --set-upstream origin ${changelogBranchName}`
    );
    await execShellCommand(
        `gh pr create --title "Updating all the changelogs" --body "This is an automated PR." --base master --head ${changelogBranchName}`
    );
    console.log("Created PR for changelog updates.");
    return changelog;
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

module.exports = {
    setLocalGitCredentials,
    execShellCommand,
    getFiles,
    getPackageInfo,
    githubAuthentication,
    createMxBuildContainer,
    bumpVersionInPackageJson,
    updateChangelogs
};
