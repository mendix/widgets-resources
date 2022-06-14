import { execSync } from "node:child_process";
import { dirname, relative } from "node:path";
import { cp, mkdir, mv, popd, pushd, rm, echo } from "shelljs";
import {
    BuildOptions,
    BuildParams,
    DepsBuildConfig,
    getBuildConfig,
    getDepsConfig,
    ModuleBuildConfig
} from "./module-build-config";
import { cloneRepoShallow, updateTestProjectRepo } from "./git";
import { createMPK, exportModuleWithWidgets } from "./mpk";
import { skipDepsBuild } from "./vars";
import * as flow from "./flow";

export async function cleanup(config: ModuleBuildConfig): Promise<void> {
    console.info("Removing dist...");
    rm("-rf", config.dist.dir);
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

export async function updateModuleVersion(config: ModuleBuildConfig): Promise<void> {
    console.info("Updating .version...");
    echo(config.moduleInfo.version.format()).to(config.dist.testProject.versionFile);
}

export async function updateTestProject(config: ModuleBuildConfig): Promise<void> {
    console.info("Updating local testProject...");
    // This still a big question should we update testProject before doing export
    // or not. But, this is how it was before, so we preserve same flow.
    // Also, updating testProject on this stage smiplifyes next step with commiting
    // updates to testProject.
    await Promise.all([updateTestProjectWidgets(config), updateTestProjectStyles(config), updateModuleVersion(config)]);
}

// Build module dependencies.
// After this step we can be sure that module deps are build successfuly.
export async function stepBuildDeps(config: DepsBuildConfig, skipDeps = skipDepsBuild()): Promise<void> {
    await flow.runStep("Build dependencies", async () => {
        pushd(config.repoRootPath);
        if (!skipDeps) {
            console.info("Start building dependencies...");

            execSync(`npm run release -- ${config.scope} --include-dependencies --concurrency 1`, { stdio: "inherit" });
        } else {
            console.info("Skipping building dependencies...");
        }
        popd();
    });
}

// Create module build config.
export async function stepCreateConfig(depsConfig: DepsBuildConfig): Promise<ModuleBuildConfig> {
    let config: ModuleBuildConfig | undefined;
    await flow.runStep("Create module config", async () => {
        config = await getBuildConfig(depsConfig);
    });
    if (config === undefined) {
        throw new Error("Create module config: resulting config is undefined");
    }
    return config;
}

// Build module contents only, which skips packing and other steps.
// This type of build is mainly exists for developing purposes.
// When build is done you can find all files, that should be
// included in module in `config.dist.testProject.dir`
// If MX_PROJECT_PATH env var is set, copy module files to this path.
export async function stepBuildContentOnly(config: ModuleBuildConfig): Promise<void> {
    await flow.runStep("Build module content", async () => {
        console.info(`Start building ${config.moduleInfo.packageFullName} module content...`);
        await cleanup(config);
        await updateTestProject(config);
        console.info("Unpacked module content can be found at:");
        console.info(relative(config.packagePath, config.dist.testProject.dir));
    });
}

// Build module and produce final mpk.
// This type of build is meant to be used in CI to produce
// artifact that will be published in marketplace.
export async function stepBuildModuleMpk(config: ModuleBuildConfig): Promise<void> {
    await flow.runStep("Build module mpk", async () => {
        console.info(`Start building ${config.moduleInfo.packageFullName} module mpk...`);
        await cleanup(config);
        await cloneRepoShallow(
            config.moduleInfo.testProjectUrl,
            config.moduleInfo.testProjectBranchName,
            config.dist.testProject.dir
        );
        await updateTestProject(config);
        // We have to change cwd to repo root to properly execute docker
        pushd(config.repoRootPath);
        await createMPK(config.dist.testProject.dir, config.moduleInfo);
        popd();
        await exportModuleWithWidgets(config.dockerMpkOutputFile, config.widgetMpks);
        mkdir("-p", dirname(config.outputFile));
        mv(config.dockerMpkOutputFile, config.outputFile);
        console.info("Mpk to publish:");
        console.info(relative(config.packagePath, config.outputFile));
    });
}

// Top level build command that create mpk
export async function buildModuleMpk(params: BuildParams, options?: BuildOptions): Promise<void> {
    await flow.runFlow("Create module artifact", async () => {
        const depsConfig = getDepsConfig(params, options);
        await stepBuildDeps(depsConfig);
        const buildConfig = await stepCreateConfig(depsConfig);
        await stepBuildModuleMpk(buildConfig);
    });
}

// Top level build-content command that generate module content
export async function buildContentOnly(params: BuildParams, options?: BuildOptions): Promise<void> {
    await flow.runFlow("Create module content", async () => {
        const depsConfig = getDepsConfig(params, options);
        await stepBuildDeps(depsConfig);
        const buildConfig = await stepCreateConfig(depsConfig);
        await stepBuildContentOnly(buildConfig);
    });
}

export async function showConfig(widgets: string[], cwd = process.cwd()): Promise<void> {
    await flow.runFlow("Show config", async () => {
        const depsConfig = getDepsConfig({
            packagePath: cwd,
            widgetFolderNames: widgets
        });
        await stepBuildDeps(depsConfig);
        // Enable debug to print config to stdout
        process.env.DEBUG = "true";
        await stepCreateConfig(depsConfig);
    });
}
