import { dirname, join, relative } from "node:path";
import sh from "./sh";
import { BuildOptions, BuildParams, DepsBuildConfig, getBuildConfig, getDepsConfig, ModuleBuildConfig } from "./config";
import { cloneRepoShallow } from "./git";
import { createMPK, exportModuleWithWidgets } from "./mpk";

export function cleanup(config: ModuleBuildConfig): void {
    console.info("Removing dist...");
    sh.rm("-rf", join(config.packagePath, "dist"));
}

export function updateTestProjectWidgets(config: ModuleBuildConfig): void {
    console.info("Copying widgets to testProject...");
    const source = config.widgetMpks;
    const dest = config.dist.testProject.widgets;
    sh.mkdir("-p", dest);
    sh.cp("-f", source, dest);
}

export function updateTestProjectStyles(config: ModuleBuildConfig): void {
    console.info("Copying styles to testProject...");
    const source = config.stylesPath;
    const dest = config.dist.testProject.themesource;
    sh.cp("-Rf", source, dest);
}

export function updateTestProject(config: ModuleBuildConfig): void {
    console.info("Updating testProject...");
    // This still a big question should we update testProject before doing export
    // or not. But, this is how it was before, so we preserve same flow.
    // Also, updating testProject on this stage smiplifyes next step with commiting
    // updates to testProject.
    updateTestProjectWidgets(config);
    updateTestProjectStyles(config);
}

// Build module dependencies.
// After this step we can be sure that module deps are build successfuly.
export function stepBuildDeps(config: DepsBuildConfig): void {
    console.info("Changing cwd...");
    sh.pushd(config.repoRootPath);
    console.info("Start building dependencies...");
    sh.exec(`npm run release -- ${config.scope} --include-dependencies --concurrency 1`);
    console.info("Changing cwd...");
    sh.popd();
}

// Build module contents only, which skips packing and other steps.
// This type of build is mainly exists for developing purposes.
// When build is done you can find all files, that should be
// included in module in `config.dist.testProject.dir`
// If MX_PROJECT_PATH env var is set, copy module files to this path.
export function stepBuildContentOnly(config: ModuleBuildConfig): void {
    console.info(`Start building ${config.moduleInfo.moduleNameInModeler} module content...`);
    cleanup(config);
    updateTestProject(config);
    console.info("Success.");
    console.info("Unpacked module content can be found at:");
    console.info(relative(config.packagePath, config.dist.testProject.dir));
}

// Build module and produce final mpk.
// This type of build is meant to be used in CI to produce
// artifact that will be published in marketplace.
export function stepBuildModuleMpk(config: ModuleBuildConfig): void {
    console.info(`Start building ${config.moduleInfo.moduleNameInModeler} module mpk...`);
    cleanup(config);
    cloneRepoShallow(
        config.moduleInfo.testProjectUrl,
        config.moduleInfo.testProjectBranchName,
        config.dist.testProject.dir
    );
    updateTestProject(config);
    // We have to change cwd to repo root to properly execute docker
    console.info("Changing cwd...");
    sh.pushd(config.repoRootPath);
    createMPK(config.dist.testProject.dir, config.moduleInfo, "^(resources|userlib)/.*");
    console.info("Changing cwd...");
    sh.popd();
    exportModuleWithWidgets(config.dockerMpkOutputFile, config.widgetMpks);
    sh.mkdir("-p", dirname(config.outputFile));
    sh.mv(config.dockerMpkOutputFile, config.outputFile);
    console.info("Module mpk build success.");
    console.info("Mpk to publish:");
    console.info(relative(config.packagePath, config.outputFile));
}

// Top level build command that create mpk
export function buildModuleMpk(params: BuildParams, options?: BuildOptions): void {
    const depsConfig = getDepsConfig(params, options);
    stepBuildDeps(depsConfig);
    const buildConfig = getBuildConfig(depsConfig);
    stepBuildModuleMpk(buildConfig);
}

// Top level build-content command that generate module content
export function buildContentOnly(params: BuildParams, options?: BuildOptions): void {
    const depsConfig = getDepsConfig(params, options);
    stepBuildDeps(depsConfig);
    const buildConfig = getBuildConfig(depsConfig);
    stepBuildContentOnly(buildConfig);
}
