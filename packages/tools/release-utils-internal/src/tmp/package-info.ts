import { join } from "path";
import { access } from "fs/promises";
import { Version, versionStringToVersion } from "./version";
import { WidgetChangelogFileWrapper } from "./changelog-parser";
import { z } from "zod";

export const PackageMeta = z.object({
    name: z.string().min(1),
    version: versionStringToVersion,

    repository: z.object({
        type: z.literal("git"),
        url: z.string().url()
    }),

    marketplace: z.object({
        minimumMXVersion: versionStringToVersion,
        marketplaceId: z.number()
    }),

    testProject: z.object({
        githubUrl: z.string().url(),
        branchName: z.string().min(1)
    }),
    packagePath: z.string().min(1).optional()
});

export type PackageMeta = z.infer<typeof PackageMeta>;

export const WidgetPackageMeta = PackageMeta.extend({
    widgetName: z.string()
});

export const ModulePackageMeta = PackageMeta.extend({
    moduleName: z.string(),
    moduleNameInModeler: z.string(),
    moduleFolderNameInModeler: z.string()
}).refine(data => data.moduleNameInModeler === data.moduleFolderNameInModeler.toLowerCase(), {
    message: "Modeler folder should be lowercase string of modeler name",
    path: ["moduleFolderNameInModeler"]
});

export interface PackageInfo {
    packageName: string;
    packageFullName: string;
    version: Version;
    repositoryUrl: string;
    // changelog: WidgetChangelogFileWrapper;
}

export interface WidgetPackageInfo extends PackageInfo {
    packageFullName: string;
    minimumMXVersion: Version;
    repositoryUrl: string;
    // changelog: WidgetChangelogFileWrapper;
    testProjectUrl: string | undefined;
    testProjectBranchName: string | undefined;
}

export interface ModuleInfo extends WidgetPackageInfo {
    moduleNameInModeler: string;
    moduleFolderNameInModeler: string;
}

export async function getPackageInfo(path: string): Promise<PackageInfo> {
    const pkgPath = join(path, `package.json`);
    // try {
    await access(pkgPath);
    const pgkMeta = await import(pkgPath);
    const result = PackageMeta.safeParse(pgkMeta);
    if (!result.success) {
        const formatted = result.error.format();
        // How to pretty print parser errors?
        // console.log(formatted);
        throw new Error("Unable to parse package meta");
    } else {
        const { name, repository, version } = result.data;
        return {
            packageName: name,
            packageFullName: "",
            version,
            repositoryUrl: repository.url
            // changelog: WidgetChangelogFileWrapper.fromFile(`${path}/CHANGELOG.md`)
        };
    }
    // try {

    // } catch (err) {
    //     console.error("ERROR: Parsing error:", err);
    //     throw new Error("Error while reading package info at " + path);
    // }
    // } catch (error) {
    // console.log(error);
    // console.error(`ERROR: Path does not exist: ${pkgPath}`);
    // console.log((error as Error).message);
    // throw new Error("Error while reading package info at " + path + "\n" + (error as Error).message);
    // throw error;
    // }
}

// export async function getWidgetPackageInfo(path: string): Promise<WidgetPackageInfo> {
//     const pkgPath = join(path, `package.json`);
//     try {
//         await access(pkgPath);
//         const { name, widgetName, moduleName, version, marketplace, testProject, repository } = (await import(
//             pkgPath
//         )) as PackageJsonFileContent;
//         return {
//             packageName: ensureString(name, "name"),
//             packageFullName: ensureString(moduleName ?? widgetName, "moduleName or widgetName"),

//             version: ensureVersion(version),

//             minimumMXVersion: ensureVersion(marketplace?.minimumMXVersion),
//             repositoryUrl: ensureString(repository?.url, "repository.url"),

//             changelog: WidgetChangelogFileWrapper.fromFile(`${path}/CHANGELOG.md`),

//             testProjectUrl: testProject?.githubUrl,
//             testProjectBranchName: testProject?.branchName
//         };
//     } catch (error) {
//         console.log(error);
//         console.error(`ERROR: Path does not exist: ${pkgPath}`);
//         throw new Error("Error while reading widget info at " + path);
//     }
// }

// function ensureString(str: string | undefined, fieldName: string): string {
//     if (typeof str === "undefined") {
//         throw new Error(`Expected to be string got undefined for '${fieldName}'`);
//     }

//     return str;
// }

// function ensureVersion(version: VersionString | undefined): Version {
//     if (version && /\d+\.\d+\.\d+/.test(version)) {
//         return Version.fromString(version);
//     }

//     throw new Error(`Unknown version format, cant parse: '${version}'`);
// }
