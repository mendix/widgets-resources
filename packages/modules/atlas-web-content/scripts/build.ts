import concurrently from "concurrently";
import { join } from "path";
import { rm, mkdir } from "shelljs";

const repoRoot = join(__dirname, "../../../../");

main().catch(e => {
    console.error(e);
    process.exit(1);
});

async function main(): Promise<void> {
    let mode = "build";
    if (process.argv.includes("start")) {
        mode = "start";
    } else if (process.argv.includes("release")) {
        mode = "release";
    }

    let outputDir;

    if (mode === "build" || mode === "start") {
        const MX_PROJECT_PATH = process.env.MX_PROJECT_PATH; // should be an absolute path.
        outputDir = MX_PROJECT_PATH ? MX_PROJECT_PATH : join(__dirname, "../tests/testProject");

        const toRemoveDirs = [join(outputDir, "themesource/atlas_web_content")];
        rm("-rf", toRemoveDirs);
        console.info(`Ensured the directories ${toRemoveDirs.join(", ")} are removed from your Mendix project`);
    } else if (mode === "release") {
        outputDir = join(__dirname, "../dist");

        rm("-rf", outputDir);
        console.info(`Ensured the directory ${outputDir} is removed`);
    }

    if (outputDir) {
        // when targeting a networked windows drive, the cmds executed by concurrently run into a race condition when
        // creating directories. create them here to avoid the error.
        mkdir("-p", join(outputDir, "themesource/atlas_web_content"));

        await copyStylesAndAssets(mode === "start", outputDir);
    }
}

async function copyStylesAndAssets(watchMode: boolean, destination: string): Promise<void> {
    console.info(`Copying styles and assets...`);
    const watchArg = watchMode ? "--watch" : "";

    try {
        await concurrently(
            [
                {
                    name: "web-themesource-content",
                    command: `copy-and-watch ${watchArg} "${join(
                        repoRoot,
                        "packages/theming/atlas",
                        "src/themesource/atlas_web_content/web/**/*"
                    )}" "${join(destination, "themesource/atlas_web_content/web")}"`
                },
                {
                    name: "public-themesource-content",
                    command: `copy-and-watch ${watchArg} "${join(
                        repoRoot,
                        "packages/theming/atlas",
                        "src/themesource/atlas_web_content/public/**/*"
                    )}" "${join(destination, "themesource/atlas_web_content/public")}"`
                }
            ],
            {
                killOthers: ["failure"]
            }
        );

        console.log("Copying styles and assets has completed successfully");
    } catch (commands) {
        const commandInfo = commands.map(
            (command: concurrently.ExitInfos) => `{ name: ${command.command.name}, exit code: ${command.exitCode}}`
        );
        throw new Error(`One or more commands failed:\n${commandInfo.join("\n")}`);
    }
}
