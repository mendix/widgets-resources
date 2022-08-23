import { join } from "path";
import { accessSync } from "fs";
import { Version, VersionString } from "./version";
// FIXME: Uncomment when md parser is 100% ready.
// Disable changelog parser for now
// import { WidgetChangelogFileWrapper } from "./changelog-parser";

export interface PackageJsonFileContent {
    name?: string;
    widgetName?: string;
    moduleName?: string;
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
}

export interface ModuleInfo extends WidgetPackageInfo {
    testProjectUrl: string;
    testProjectBranchName: string;
    moduleNameInModeler: string;
    moduleFolderNameInModeler: string;
}

export function getPackageFileContent(dirPath: string): PackageJsonFileContent {
    const pkgPath = join(dirPath, `package.json`);
    try {
        accessSync(pkgPath);
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const result = <PackageJsonFileContent>require(pkgPath);
        return result;
    } catch (error) {
        console.log(error);
        console.error(`ERROR: Path does not exist: ${pkgPath}`);
        throw new Error("Error while reading package info at " + dirPath);
    }
}

export function getPackageInfo(path: string): PackageInfo {
    const pkgPath = join(path, `package.json`);
    try {
        accessSync(pkgPath);
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const { name, version, repository } = <PackageJsonFileContent>require(pkgPath);
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

export function getWidgetPackageInfo(path: string): WidgetPackageInfo {
    const pkgPath = join(path, `package.json`);
    try {
        accessSync(pkgPath);
        const { name, widgetName, moduleName, version, marketplace, testProject, repository } =
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            require(pkgPath) as PackageJsonFileContent;
        return {
            packageName: ensureString(name, "name"),
            packageFullName: ensureString(moduleName ?? widgetName, "moduleName or widgetName"),

            version: ensureVersion(version),

            minimumMXVersion: ensureVersion(marketplace?.minimumMXVersion),
            repositoryUrl: ensureString(repository?.url, "repository.url"),
            // FIXME: Replace with md parser when md parser is 100% ready.
            changelog: "[Parsed Changelog]",

            testProjectUrl: testProject?.githubUrl,
            testProjectBranchName: testProject?.branchName
        };
    } catch (error) {
        console.log(error);
        console.error(`ERROR: Path does not exist: ${pkgPath}`);
        throw new Error("Error while reading widget info at " + path);
    }
}

export function getModulePackageInfo(pkgDir: string): ModuleInfo {
    const {
        name,
        moduleName: moduleNameRaw,
        version,
        marketplace,
        testProject,
        repository
    } = getPackageFileContent(pkgDir);
    const moduleName = ensureString(moduleNameRaw, "moduleName");
    return {
        packageName: ensureString(name, "name"),
        packageFullName: moduleName,
        moduleNameInModeler: moduleName,
        moduleFolderNameInModeler: moduleName.toLowerCase(),
        version: ensureVersion(version),
        minimumMXVersion: ensureVersion(marketplace?.minimumMXVersion),
        repositoryUrl: ensureString(repository?.url, "repository.url"),
        // FIXME: Replace with md parser when md parser is 100% ready.
        changelog: "[Parsed Changelog]",
        testProjectUrl: ensureString(testProject?.githubUrl, "testProject.githubUrl"),
        testProjectBranchName: ensureString(testProject?.branchName, "testProject.branchName")
    };
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
