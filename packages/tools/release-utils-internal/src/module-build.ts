import { execSync } from "node:child_process";
import { dirname, join, relative } from "node:path";
import { cp, mkdir, mv, popd, pushd, rm } from "shelljs";
import { BuildOptions, BuildParams, DepsBuildConfig, getBuildConfig, getDepsConfig, ModuleBuildConfig } from "./config";
import { cloneRepoShallow } from "./git";
import { createMPK, exportModuleWithWidgets } from "./mpk";

export async function cleanup(config: ModuleBuildConfig): Promise<void> {
    console.info("Removing dist...");
    rm("-rf", join(config.packagePath, "dist"));
}

export async function updateTestProjectWidgets(config: ModuleBuildConfig): Promise<void> {
    console.info("Copying widgets to testProject...");
    const source = config.widgetMpks;
    const dest = config.dist.testProject.widgets;
    mkdir("-p", dest);
    cp("-f", source, dest);
}

export async function updateTestProjectStyles(config: ModuleBuildConfig): Promise<void> {
    console.info("Copying styles to testProject...");
    const source = config.stylesPath;
    const dest = config.dist.testProject.themesource;
    cp("-Rf", source, dest);
}

export async function updateTestProject(config: ModuleBuildConfig): Promise<void> {
    console.info("Updating testProject...");
    // This still a big question should we update testProject before doing export
    // or not. But, this is how it was before, so we preserve same flow.
    // Also, updating testProject on this stage smiplifyes next step with commiting
    // updates to testProject.
    await Promise.all([updateTestProjectWidgets(config), updateTestProjectStyles(config)]);
}

// Build module dependencies.
// After this step we can be sure that module deps are build successfuly.
export async function stepBuildDeps(config: DepsBuildConfig): Promise<void> {
    console.info("Changing cwd...");
    pushd(config.repoRootPath);
    console.info("Start building dependencies...");
    execSync(`npm run release -- ${config.scope} --include-dependencies --concurrency 1`, { stdio: "inherit" });
    console.info("Changing cwd...");
    popd();
}

// Build module contents only, which skips packing and other steps.
// This type of build is mainly exists for developing purposes.
// When build is done you can find all files, that should be
// included in module in `config.dist.testProject.dir`
// If MX_PROJECT_PATH env var is set, copy module files to this path.
export async function stepBuildContentOnly(config: ModuleBuildConfig): Promise<void> {
    console.info(`Start building ${config.moduleInfo.moduleNameInModeler} module content...`);
    await cleanup(config);
    await updateTestProject(config);
    console.info("Success.");
    console.info("Unpacked module content can be found at:");
    console.info(relative(config.packagePath, config.dist.testProject.dir));
}

// Build module and produce final mpk.
// This type of build is meant to be used in CI to produce
// artifact that will be published in marketplace.
export async function stepBuildModuleMpk(config: ModuleBuildConfig): Promise<void> {
    console.info(`Start building ${config.moduleInfo.moduleNameInModeler} module mpk...`);
    await cleanup(config);
    await cloneRepoShallow(
        config.moduleInfo.testProjectUrl,
        config.moduleInfo.testProjectBranchName,
        config.dist.testProject.dir
    );
    await updateTestProject(config);
    // We have to change cwd to repo root to properly execute docker
    console.info("Changing cwd...");
    pushd(config.repoRootPath);
    await createMPK(config.dist.testProject.dir, config.moduleInfo, "^(resources|userlib)/.*");
    console.info("Changing cwd...");
    popd();
    await exportModuleWithWidgets(config.dockerMpkOutputFile, config.widgetMpks);
    mkdir("-p", dirname(config.outputFile));
    mv(config.dockerMpkOutputFile, config.outputFile);
    console.info("Module mpk build success.");
    console.info("Mpk to publish:");
    console.info(relative(config.packagePath, config.outputFile));
}

// Top level build command that create mpk
export async function buildModuleMpk(params: BuildParams, options?: BuildOptions): Promise<void> {
    const depsConfig = getDepsConfig(params, options);
    await stepBuildDeps(depsConfig);
    const buildConfig = await getBuildConfig(depsConfig);
    await stepBuildModuleMpk(buildConfig);
}

// Top level build-content command that generate module content
export async function buildContentOnly(params: BuildParams, options?: BuildOptions): Promise<void> {
    const depsConfig = getDepsConfig(params, options);
    await stepBuildDeps(depsConfig);
    const buildConfig = await getBuildConfig(depsConfig);
    await stepBuildContentOnly(buildConfig);
}
