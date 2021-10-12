import concurrently from "concurrently";
import { join } from "path";
import { rm, mkdir } from "shelljs";

const repoRoot = join(__dirname, "../../../../");

main().catch(e => {
    console.error(e);
    process.exit();
});

async function main(): Promise<void> {
    const outputDir = join(__dirname, "../dist");

    rm("-rf", outputDir);
    console.info(`Ensured the directory ${outputDir} is removed`);

    // when targeting a networked windows drive, the cmds executed by concurrently run into a race condition when
    // creating directories. create them here to avoid the error.
    mkdir("-p", join(outputDir, "themesource/atlas_nativemobile_content"));

    await buildAndCopyStyles(outputDir);
}

async function buildAndCopyStyles(destination: string): Promise<void> {
    console.info(`Copying styles...`);
    try {
        await concurrently(
            [
                {
                    name: "native-themesource-atlas-content-native",
                    command: `copy-and-watch "${join(
                        repoRoot,
                        "packages/theming/atlas/dist/themesource/atlas_nativemobile_content/**/*"
                    )}" "${join(destination, "themesource/atlas_nativemobile_content")}"`
                }
            ],
            {
                killOthers: ["failure"]
            }
        );

        console.log("Copying styles has completed successfully");
    } catch (commands) {
        const commandInfo = commands.map(
            (command: concurrently.ExitInfos) => `{ name: ${command.command.name}, exit code: ${command.exitCode}}`
        );
        throw new Error(`One or more commands failed:\n${commandInfo.join("\n")}`);
    }
}
