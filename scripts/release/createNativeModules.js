const { join } = require("path");
const { access, readdir, readFile, copyFile, writeFile, rm } = require("fs/promises");
const { exec } = require("child_process");
const { basename, extname, resolve } = require("path");

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
    const pkgPath = join(process.cwd(), "packages/jsActions/mobile-resources-native/package.json");
    const tmpFolder = join(process.cwd(), "tmp/mobile-resources-native");
    const widgetFolders = await readdir(join(process.cwd(), "packages/pluggableWidgets"));
    const nativeWidgetFolders = widgetFolders
        .filter(folder => folder.includes("-native"))
        .map(folder => join(process.cwd(), "packages/pluggableWidgets", folder));
    const {
        name,
        moduleName,
        version,
        marketplace: { minimumMXVersion },
        testProject: { githubUrl, branchName },
        repository: { url }
    } = require(pkgPath);
    await execShellCommand(
        `git remote set-url origin https://${process.env.GH_USERNAME}:${process.env.GH_PAT}@${url.replace(
            "https://",
            ""
        )}}`
    );

    const changelog = await updateChangelogs(nativeWidgetFolders, pkgPath, version, moduleName, name);
    await updateTestProject(tmpFolder, nativeWidgetFolders, githubUrl);

    console.log("Creating module MPK..");
    await createMxBuildContainer(tmpFolder, "NativeMobileResources", minimumMXVersion);
    const mpkOutput = (await getFiles(tmpFolder, [`.mpk`]))[0];

    console.log(`Creating Github release for module ${moduleName}`);
    await execShellCommand(
        `gh release create --title "${moduleName} ${version} - Mendix ${minimumMXVersion}" --notes "${changelog}" "${process.env.TAG}" "${mpkOutput}"`
    );
    await execShellCommand(`rm -rf ${tmpFolder}`);
    console.log("Done.");
}

// Update changelogs and create PR in widget-resources
async function updateChangelogs(nativeWidgetFolders, pkgPath, version, moduleName, name) {
    console.log("Updating changelogs..");
    const moduleChangelogs = await getUnreleasedChangelogs(pkgPath, version);
    let nativeWidgetsChangelogs = "";
    for await (const folder of nativeWidgetFolders) {
        nativeWidgetsChangelogs += (await combineWidgetChangelogs(folder)) || "";
    }
    let changelog = moduleChangelogs ? `## [${version}] ${moduleName}\n${moduleChangelogs}\n` : "";
    changelog = nativeWidgetsChangelogs ? `\n${nativeWidgetsChangelogs}` : changelog;

    const changelogBranchName = `${name}-release-${version}`;
    await execShellCommand(
        `git checkout -b ${changelogBranchName} && git add . && git commit -m "chore(${name}): update changelogs" && git push --set-upstream origin ${changelogBranchName}`
    );
    await execShellCommand(
        `gh pr create --title "Updating all the changelogs" --body "This is an automated PR." --base master --head ${changelogBranchName}`
    );
    console.log("Created PR for changelog updates.");
    return changelog;
}

async function combineWidgetChangelogs(currentFolder) {
    const { widgetName, version } = require(`${currentFolder}/package.json`);
    const changelogPath = `${currentFolder}/CHANGELOG.md`;
    try {
        await access(changelogPath);
        const changelogs = await getUnreleasedChangelogs(changelogPath, version);
        return changelogs
            ? `## [${version}] ${widgetName}
            
            ${changelogs}`
            : "";
    } catch (error) {
        console.warn(`${changelogPath} does not exist.`);
    }
}

async function getUnreleasedChangelogs(changelogFile, version) {
    const content = await readFile(changelogFile, "utf8");
    const unreleasedChangelogs = content
        .match(/(?<=## \[unreleased\]\n)(\w|\W)*(?=\n## \[\d+\.\d+\.\d+\])/i)?.[0]
        .trim();
    const releasedVersions = content.match(/(?<=## \[)\d+\.\d+\.\d+(?=\])/g);
    if (releasedVersions?.includes(version)) {
        throw new Error(
            `It looks like version ${version} from package.json is already released. Did you forget to bump the version?`
        );
    }

    const d = new Date();
    const date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    const newContent = content.replace(`## [Unreleased]`, `## [Unreleased]\n\n## [${version}] ${date}`);
    await writeFile(changelogFile, newContent);

    return unreleasedChangelogs;
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
            `cd ${tmpFolder} && git add . && git commit -m "Updated native widgets and js actions" && git push`
        );
    } else {
        console.warn(`Nothing to commit from repo ${tmpFolder}`);
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

function execShellCommand(cmd) {
    return new Promise((resolve, reject) => {
        const cwd = process.cwd();
        exec(cmd, { cwd }, (error, stdout, stderr) => {
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
