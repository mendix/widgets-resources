import { getPackageInfo, PackageInfo } from "../../packages/tools/release-utils-internal/src";
import gh from "../../packages/tools/release-utils-internal/src/github";
import { execShellCommand } from "../../packages/tools/release-utils-internal/src/shell";
import { addRemoteWithAuthentication } from "../../packages/tools/release-utils-internal/src/git";
import { ls } from "shelljs";
import { join } from "path";

main(process.argv[2]).catch(e => {
    console.error(e);
    process.exit(-1);
});

async function main(widgetScope: string): Promise<void> {
    if (!widgetScope.endsWith("-web")) {
        throw new Error(`'${widgetScope}' is not a valid widget package. Expected '*-web'.`);
    }

    const widgetPath = join(process.cwd(), "packages/pluggableWidgets", widgetScope);

    // 1. Get widget info
    console.log(`Getting the widget release information for '${widgetScope}' widget...`);
    console.log(`Widget directory:`, widgetPath);

    const packageInfo = await getPackageInfo(widgetPath);
    const releaseMpkPath = getWidgetReleaseMPK(widgetPath);
    const releaseTag = `${packageInfo.packageName}-v${packageInfo.version.format()}`;

    // 2. Check prerequisites

    // 2.1. Check if current version is already in CHANGELOG
    if (packageInfo.changelog.hasVersion(packageInfo.version)) {
        throw new Error(`Version ${packageInfo.version.format()} already exists in CHANGELOG.md file.`);
    }

    // 2.2. Check if there is something to release (entries under "Unreleased" section)
    if (!packageInfo.changelog.hasUnreleasedLogs()) {
        throw new Error(
            `No unreleased changes found in the CHANGELOG.md for ${
                packageInfo.packageName
            } ${packageInfo.version.format()}.`
        );
    }

    // 2.3. Check there is no release of that version on GitHub
    const releaseId = await gh.getReleaseIdByReleaseTag(releaseTag);
    if (releaseId) {
        throw new Error(`There is already a release for tag '${releaseTag}'.`);
    }

    // 4. Do release
    console.log("Starting widget release...");

    const remoteName = `origin-${packageInfo.packageName}-v${packageInfo.version.format()}-${makeid()}`;

    // 4.1 Set remote repo as origin
    await addRemoteWithAuthentication(packageInfo.repositoryUrl, remoteName);

    // 4.2 Create release
    console.log("Creating Github release...");
    await gh.createGithubReleaseFrom({
        title: `${packageInfo.packageFullName} (Web) - Marketplace Release v${packageInfo.version.format()}`,
        notes: packageInfo.changelog.changelog.content[0].sections
            .map(s => `## ${s.type}\n\n${s.logs.map(l => `- ${l}`).join("\n\n")}`)
            .join("\n\n"),
        tag: releaseTag,
        filesToRelease: releaseMpkPath,
        isDraft: true,
        repo: packageInfo.repositoryUrl
    });

    // 5. Update changelog and open PR
    console.log("Creating PR with updated CHANGELOG.md file...");
    await updateChangelogsAndCreatePR(packageInfo, remoteName);
    console.log("Done.");
}

function getWidgetReleaseMPK(widgetPath: string): string {
    console.log("Looking for widget MPK file in 'dist' sub-folder...");
    const mpkFile = ls(join(widgetPath, "dist", "**/*.mpk")).toString();

    if (!mpkFile) {
        throw new Error(`MPK file not found in 'dist' sub-folder.`);
    }

    console.log(`MPK path: ${mpkFile}`);

    return mpkFile;
}

async function updateChangelogsAndCreatePR(packageInfo: PackageInfo, remoteName: string): Promise<void> {
    const changelogBranchName = `${packageInfo.packageName}-release-v${packageInfo.version.format()}-${makeid()}`;

    console.log(`Creating branch '${changelogBranchName}'...`);
    await execShellCommand(`git checkout -b ${changelogBranchName}`);

    console.log("Updating widget CHANGELOG.md...");
    const updatedChangelog = packageInfo.changelog.moveUnreleasedToVersion(packageInfo.version);
    updatedChangelog.save();

    console.log(`Committing CHANGELOG.md to '${changelogBranchName}' and pushing to origin...`);
    await execShellCommand([
        `git add ${packageInfo.changelog.changelogPath}`,
        `git commit -m "chore(${packageInfo.packageName}): update changelogs"`,
        `git push ${remoteName} ${changelogBranchName}`
    ]);

    console.log(`Creating pull request for '${changelogBranchName}'`);
    await gh.createGithubPRFrom({
        title: `${packageInfo.packageFullName}: Update changelogs`,
        body: "This is an automated PR.",
        base: "master",
        head: changelogBranchName,
        repo: packageInfo.repositoryUrl
    });

    console.log("Created PR for changelog updates.");
}

function makeid(length = 4): string {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
