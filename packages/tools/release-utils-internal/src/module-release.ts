import { stat } from "node:fs/promises";
import { BuildOptions, BuildParams, getBuildConfig, getDepsConfig, ModuleBuildConfig } from "./config";
import { setLocalGitUserInfo, updateTestProjectRepo } from "./git";
import gh from "./github";
import { stepBuildDeps, stepBuildModuleMpk } from "./module-build";

export async function moduleChangelogPR(): Promise<void> {
    console.info("FIXME: Add changelog PR creation");
}

async function stepUpdateTestProject(config: ModuleBuildConfig): Promise<void> {
    console.info("Pushing updates to testProject repo...");
    await updateTestProjectRepo(config.dist.testProject.dir, `"Update widgets & styles"`);
}

async function stepCreateModuleRelease({ moduleInfo, outputFile }: ModuleBuildConfig): Promise<void> {
    console.info(`Creating Github release for module ${moduleInfo.packageFullName}`);
    console.info("Setting git config settings...");
    await setLocalGitUserInfo();
    console.info("Checking artifacts...");
    await stat(outputFile);
    await gh.createGithubReleaseFrom({
        title: moduleInfo.releaseTitle,
        notes: "[Changelog body]",
        repo: moduleInfo.repositoryUrl,
        tag: moduleInfo.releaseTag,
        target: `HEAD`,
        filesToRelease: outputFile,
        isDraft: true
    });
}

export async function moduleGithubRelease(params: BuildParams, options?: BuildOptions): Promise<void> {
    const depsConfig = getDepsConfig(params, options);
    await stepBuildDeps(depsConfig);
    const buildConfig = await getBuildConfig(depsConfig);
    await stepBuildModuleMpk(buildConfig);
    await stepUpdateTestProject(buildConfig);
    await stepCreateModuleRelease(buildConfig);
}
