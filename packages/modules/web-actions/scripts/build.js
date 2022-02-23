const { join } = require("path");
const { cp, rm, mkdir } = require("shelljs");
const { execSync } = require("child_process");

main().catch(e => {
    console.error(e);
    process.exit(1);
});

async function main() {
    let mode = "build";

    if (process.argv.includes("start")) {
        mode = "start";
    } else if (process.argv.includes("release")) {
        mode = "release";
    }

    let outputDir;

    if (mode === "build") {
        const MX_PROJECT_PATH = process.env.MX_PROJECT_PATH; // should be an absolute path.
        outputDir = MX_PROJECT_PATH ? MX_PROJECT_PATH : join(__dirname, "../tests/testProject");

        const toRemoveDirs = [join(outputDir, "javascriptsource/webactions/actions")];
        rm("-rf", toRemoveDirs);
        console.info(`Ensured the directories ${toRemoveDirs.join(", ")} are removed from your Mendix project`);
    } else if (mode === "release") {
        outputDir = join(__dirname, "../dist");

        rm("-rf", outputDir);
        console.info(`Ensured the directory ${outputDir} is removed`);
    }

    console.info(`Building & copying files...`);
    try {
        await copyWebActions(outputDir, mode);
        console.log("Building & copying styles has completed successfully");
    } catch (commands) {
        const commandInfo = commands.map(command => `{ name: ${command.command.name}, exit code: ${command.exitCode}}`);
        throw new Error(`One or more commands failed:\n${commandInfo.join("\n")}`);
    }
}

async function copyWebActions(destination, mode) {
    let cwd = process.cwd();
    if (cwd.endsWith("web-actions")) {
        cwd = join(cwd, "../../../");
    }

    if (mode === "release") {
        execSync(`npm run build -- --scope 'nanoflow-actions-web'`, {
            stdio: "inherit",
            cwd
        });

        const dest = join(__dirname, "../dist/javascriptsource/webactions/actions");
        mkdir("-p", dest);
        cp(join(cwd, "packages/jsActions/nanoflow-actions-web/dist/*"), dest);
    } else {
        execSync(`npx cross-env MX_PROJECT_PATH=${destination} npm run build -- --scope 'nanoflow-actions-web'`, {
            stdio: "inherit",
            cwd
        });
    }
}
