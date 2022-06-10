import { join } from "node:path";
import { find } from "shelljs";
import { string } from "zod";
import { getModulePackageInfo, ModuleInfo } from "./package-info";

export interface DepsBuildConfig {
    // Widget dirs
    widgetFolderNames: string[];

    // Module root path
    packagePath: string;

    // lerna filter glob for module widgets
    scope: string;

    // Monorepo root path
    repoRootPath: string;
}

export interface ModuleBuildConfig extends DepsBuildConfig {
    // Module metadata, mostly doata form module package.json
    moduleInfo: ModuleInfo;

    // Module styles
    stylesPath: string;

    // Module mpk after docker export
    dockerMpkOutputFile: string;

    // Final module mpk that should be uploaded to GH and Marketplace
    outputFile: string;

    // Array of widget mpk files
    widgetMpks: string[];

    // This map will be used to operate on copying and moving files.
    dist: {
        // path for dist directory
        dir: string;
        testProject: {
            // path for testProject direcotry
            dir: string;
            widgets: string;
            themesource: string;
        };
    };
}

export type BuildParams = {
    // Module root path, should be absolute
    packagePath: string;
    // Widget dirs
    widgetFolderNames: string[];
};

export type BuildOptions = {
    // By default we using widgetFolderNames to create lerna filter glob.
    // You can override glob by providing this option.
    scope?: string;
};

export function getDepsConfig(params: BuildParams, options: BuildOptions = {}): DepsBuildConfig {
    const { packagePath, widgetFolderNames } = params;
    // Lerna allow specify multiple `--scope` options, so we can use widget folders.
    const scope = options.scope ?? widgetFolderNames.map(pkg => `--scope ${pkg}`).join(" ");

    return {
        widgetFolderNames,
        packagePath,
        repoRootPath: join(packagePath, "../../.."),
        scope
    };
}

export async function getBuildConfig({
    packagePath,
    repoRootPath,
    scope,
    widgetFolderNames
}: DepsBuildConfig): Promise<ModuleBuildConfig> {
    console.info("Reading package.json...");
    const moduleInfo = await getModulePackageInfo(packagePath);
    const { version, moduleNameInModeler, moduleFolderNameInModeler } = moduleInfo;

    console.info(`Creating build config for ${moduleNameInModeler}...`);

    const stylesPath = join(packagePath, "src/themesource", moduleFolderNameInModeler);

    const mpkName = `${moduleNameInModeler}.mpk`;

    const widgetPaths = widgetFolderNames.map(folder => join(repoRootPath, "packages/pluggableWidgets", folder));

    const widgetMpks = widgetPaths.flatMap(path => {
        const files = find(`${path}/dist`);
        return files.filter(name => name.match(/\.mpk$/));
    });

    const distDir = join(packagePath, "dist");

    const outputFile = join(distDir, version.format(), mpkName);

    // target for both -- build and clone
    const testProjectDir = join(distDir, "testProject");

    const stylesOut = join(testProjectDir, "themesource");

    const widgetsOut = join(testProjectDir, "widgets");

    const dockerMpkOutputFile = join(testProjectDir, mpkName);

    const result = {
        moduleInfo,
        repoRootPath,
        packagePath,
        scope,
        stylesPath,
        dockerMpkOutputFile,
        outputFile,
        widgetFolderNames,
        widgetMpks,
        dist: {
            dir: distDir,
            testProject: {
                dir: testProjectDir,
                themesource: stylesOut,
                widgets: widgetsOut
            }
        }
    };

    console.info("Config:");
    console.info(result);

    return result;
}
