import { stat } from "node:fs/promises";
import { BuildOptions, BuildParams, getBuildConfig, getDepsConfig } from "./config";
import { setLocalGitUserInfo } from "./git";
import gh from "./github";
import { stepBuildDeps, stepBuildModuleMpk } from "./module-build";

export async function moduleChangelogPR(): Promise<void> {
    console.info("FIXME: Add changelog PR creation");
}

export async function moduleGithubRelease(params: BuildParams, options?: BuildOptions): Promise<void> {
    const depsConfig = getDepsConfig(params, options);
    await stepBuildDeps(depsConfig);
    const buildConfig = await getBuildConfig(depsConfig);
    await stepBuildModuleMpk(buildConfig);
    const { moduleInfo } = buildConfig;
    console.info(`Creating Github release for module ${moduleInfo.moduleNameInModeler}`);
    console.info(`Setting git config settings...`);
    await setLocalGitUserInfo();
    console.info("Checking artifacts...");
    await stat(buildConfig.outputFile);
    gh.createGithubReleaseFrom({
        title: `${moduleInfo.moduleNameInModeler} - Marketplace Release v${moduleInfo.version.format()}-alpha`,
        notes: "[Changelog body]",
        repo: moduleInfo.repositoryUrl,
        tag: `${moduleInfo.packageName}-v${moduleInfo.version.format()}-alpha-no-publish`,
        target: `HEAD`,
        filesToRelease: buildConfig.outputFile,
        isDraft: true
    });
}
