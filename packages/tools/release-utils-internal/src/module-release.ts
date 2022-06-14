import { stat } from "node:fs/promises";
import { BuildOptions, BuildParams, getBuildConfig, getDepsConfig, ModuleBuildConfig } from "./module-build-config";
import { setLocalGitUserInfo, updateTestProjectRepo } from "./git";
import gh from "./github";
import { stepBuildDeps, stepBuildModuleMpk, stepCreateConfig } from "./module-build";
import * as flow from "./flow";

export async function stepOpenChangelogUpdatePr(): Promise<void> {
    await flow.runStep("Open PR that update CHANGELOG", async () => {
        console.info("FIXME: Add changelog PR creation");
    });
}

async function stepUpdateTestProject(config: ModuleBuildConfig): Promise<void> {
    await flow.runStep("Commit changes to testProject repo", async () => {
        await updateTestProjectRepo(config.dist.testProject.dir, `"Update widgets & styles"`);
    });
}

async function stepCreateModuleRelease({ moduleInfo, outputFile }: ModuleBuildConfig): Promise<void> {
    await flow.runStep(`Create Github release for module ${moduleInfo.packageFullName}`, async () => {
        console.info("Setting git config settings...");
        await setLocalGitUserInfo();
        console.info("Checking artifacts...");
        await stat(outputFile);
        console.info("Creating release...");
        await gh.createGithubReleaseFrom({
            title: moduleInfo.releaseTitle,
            notes: "[Changelog body]",
            repo: moduleInfo.repositoryUrl,
            tag: moduleInfo.releaseTag,
            target: `HEAD`,
            filesToRelease: outputFile,
            isDraft: true
        });
    });
}

export async function releaseModuleOnGithub(params: BuildParams, options?: BuildOptions): Promise<void> {
    await flow.runFlow("Release module on Github", async () => {
        const depsConfig = getDepsConfig(params, options);
        await stepBuildDeps(depsConfig);
        const buildConfig = await stepCreateConfig(depsConfig);
        await stepBuildModuleMpk(buildConfig);
        await stepUpdateTestProject(buildConfig);
        await stepCreateModuleRelease(buildConfig);
        await stepOpenChangelogUpdatePr();
    });
}
