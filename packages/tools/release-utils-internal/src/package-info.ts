import { join } from "path";
import { access } from "fs/promises";
import { Version, VersionString } from "./version";
// FIXME: Uncomment when md parser is 100% ready.
// Disable changelog parser for now
// import { WidgetChangelogFileWrapper } from "./changelog-parser";

export interface PackageJsonFileContent {
    name?: string;
    widgetName?: string;
    // User friendly name. This will be included in release title.
    moduleName?: string;
    // Module name in Studio Pro (visible in App Explorer)
    moduleNameInModeler?: string;
    // Module folder name under themesources
    moduleFolderNameInModeler?: string;

    version?: VersionString;

    repository?: {
        type: "git";
        url: string;
    };

    marketplace?: {
        minimumMXVersion: VersionString;
        marketplaceId?: string;
    };

    testProject?: {
        githubUrl: string;
        branchName: string;
    };

    packagePath?: string;
}

export interface PackageInfo {
    packageName: string;
    packageFullName: string;

    version: Version;

    repositoryUrl: string;

    changelog: string;
}

export interface WidgetPackageInfo extends PackageInfo {
    packageFullName: string;
    minimumMXVersion: Version;
    repositoryUrl: string;
    testProjectUrl: string | undefined;
    testProjectBranchName: string | undefined;
    releaseTag: string;
    releaseTitle: string;
}

export interface ModuleInfo extends WidgetPackageInfo {
    testProjectUrl: string;
    testProjectBranchName: string;
    moduleNameInModeler: string;
    moduleFolderNameInModeler: string;
}

function releaseTag(name: string, version: Version): string {
    return `${name}-v${version.format()}`;
}

function releaseTitle(name: string, version: Version): string {
    return `${name} - Marketplace Release v${version.format()}`;
}

function widgetReleaseTitle(name: string, version: Version): string {
    return releaseTitle(`${name} (Web)`, version);
}

export async function getPackageFileContent(dirPath: string): Promise<PackageJsonFileContent> {
    const pkgPath = join(dirPath, `package.json`);
    try {
        await access(pkgPath);
        const result = (await import(pkgPath)) as PackageJsonFileContent;
        return result;
    } catch (error) {
        console.log(error);
        console.error(`ERROR: Path does not exist: ${pkgPath}`);
        throw new Error("Error while reading package info at " + dirPath);
    }
}

export async function getPackageInfo(path: string): Promise<PackageInfo> {
    const pkgPath = join(path, `package.json`);
    try {
        await access(pkgPath);
        const { name, version, repository } = (await import(pkgPath)) as PackageJsonFileContent;
        return {
            packageName: ensureString(name, "name"),
            packageFullName: "",
            version: ensureVersion(version),

            repositoryUrl: ensureString(repository?.url, "repository.url"),

            // FIXME: Uncomment when md parser is 100% ready.
            // changelog: WidgetChangelogFileWrapper.fromFile(`${path}/CHANGELOG.md`)
            changelog: "[Parsed Changelog]"
        };
    } catch (error) {
        console.log(error);
        console.error(`ERROR: Path does not exist: ${pkgPath}`);
        throw new Error("Error while reading package info at " + path);
    }
}

export async function getWidgetPackageInfo(path: string): Promise<WidgetPackageInfo> {
    const pkgPath = join(path, `package.json`);
    try {
        await access(pkgPath);
        const { name, widgetName, version, marketplace, testProject, repository } = (await import(
            pkgPath
        )) as PackageJsonFileContent;
        const packageName = ensureString(name, "name");
        const packageFullName = ensureString(widgetName, "moduleName or widgetName");
        const packageVersion = ensureVersion(version);

        return {
            packageName,
            packageFullName,
            version: packageVersion,
            minimumMXVersion: ensureVersion(marketplace?.minimumMXVersion),
            repositoryUrl: ensureString(repository?.url, "repository.url"),
            // FIXME: Replace with md parser when md parser is 100% ready.
            changelog: "[Parsed Changelog]",

            testProjectUrl: testProject?.githubUrl,
            testProjectBranchName: testProject?.branchName,
            releaseTag: releaseTitle(packageName, packageVersion),
            releaseTitle: widgetReleaseTitle(packageFullName, packageVersion)
        };
    } catch (error) {
        console.log(error);
        console.error(`ERROR: Path does not exist: ${pkgPath}`);
        throw new Error("Error while reading widget info at " + path);
    }
}

export async function getModulePackageInfo(pkgDir: string): Promise<ModuleInfo> {
    const pkgMeta = await getPackageFileContent(pkgDir);
    const packageName = ensureString(pkgMeta.name, "name");
    const packageFullName = ensureString(pkgMeta.moduleName, "moduleName");
    const packageVersion = ensureVersion(pkgMeta.version);
    const moduleNameInModeler = ensureString(pkgMeta.moduleNameInModeler, "moduleNameInModeler");

    return {
        packageName,
        packageFullName,
        moduleNameInModeler,
        moduleFolderNameInModeler: ensureModuleFolderName(
            moduleNameInModeler,
            pkgMeta.moduleFolderNameInModeler,
            "moduleFolderNameInModeler"
        ),
        version: packageVersion,
        minimumMXVersion: ensureVersion(pkgMeta.marketplace?.minimumMXVersion),
        repositoryUrl: ensureString(pkgMeta.repository?.url, "repository.url"),
        // FIXME: Replace with md parser when md parser is 100% ready.
        changelog: "[Parsed Changelog]",
        testProjectUrl: ensureString(pkgMeta.testProject?.githubUrl, "testProject.githubUrl"),
        testProjectBranchName: ensureString(pkgMeta.testProject?.branchName, "testProject.branchName"),
        releaseTag: releaseTag(packageName, packageVersion),
        releaseTitle: releaseTitle(packageFullName, packageVersion)
    };
}

function ensureModuleFolderName(name: string, str: string | undefined, fieldName): string {
    const folderName = ensureString(str, fieldName);
    if (folderName !== name.toLowerCase()) {
        throw new Error(`Expectd ${fieldName} to be equal to lowercase variant of modeler name, but got: ${str}`);
    }

    return folderName;
}

function ensureString(str: string | undefined, fieldName: string): string {
    if (typeof str === "undefined") {
        throw new Error(`Expected to be string got undefined for '${fieldName}'`);
    }

    return str;
}

function ensureVersion(version: VersionString | undefined): Version {
    if (version && /\d+\.\d+\.\d+/.test(version)) {
        return Version.fromString(version);
    }

    throw new Error(`Unknown version format, cant parse: '${version}'`);
}
