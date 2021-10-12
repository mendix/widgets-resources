const concurrently = require("concurrently");
const { join } = require("path");
const { rm, mkdir } = require("shelljs");

const repoRoot = join(__dirname, "../../../../");

main().catch(e => {
    console.error(e);
    process.exit(-1);
});

async function main() {
    const outputDir = join(__dirname, "../dist");

    rm("-rf", outputDir);
    console.info(`Ensured the directory ${outputDir} is removed`);

    // when targeting a networked windows drive, the cmds executed by concurrently run into a race condition when
    // creating directories. create them here to avoid the error.
    mkdir("-p", join(outputDir, "themesource/atlas_nativemobile_content"));

    await buildAndCopyStyles(outputDir);
}

async function buildAndCopyStyles(destination) {
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
        const commandInfo = commands.map(command => `{ name: ${command.command.name}, exit code: ${command.exitCode}}`);
        throw new Error(`One or more commands failed:\n${commandInfo.join("\n")}`);
    }
}
