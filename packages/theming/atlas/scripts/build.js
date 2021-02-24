const concurrently = require("concurrently");
const { access } = require("fs").promises;
const { join } = require("path");
const { rm } = require("shelljs");

main().catch(e => {
    console.error(e);
    process.exit(-1);
});

async function main() {
    const mode = process.argv[2] || "build";

    let outputDir;

    if (mode === "build" || mode === "start") {
        const MX_PROJECT_PATH = process.env.ATLAS_MX_PROJECT_PATH; // should be an absolute path.
        outputDir = MX_PROJECT_PATH ? MX_PROJECT_PATH : join(__dirname, "../tests/testProject");

        const toRemoveDirs = [join(outputDir, "theme"), join(outputDir, "themesource/atlas_ui_resources")];
        rm("-rf", toRemoveDirs);
        console.info(`Ensured the directories ${toRemoveDirs.join(", ")} are removed from your Mendix project`);
    } else if (mode === "release") {
        outputDir = join(__dirname, "../dist");

        if (await exists(outputDir)) {
            rm("-rf", outputDir);
            console.info(`Successfully removed dist folder`);
        }
    } else {
        throw new Error(`Invalid mode: "${mode}"`);
    }

    await buildAndCopyAtlas(mode === "start", outputDir);
}

async function buildAndCopyAtlas(watchMode, destination) {
    console.info(`Building & copying Atlas...`);
    const watchArg = watchMode ? "--watch" : "";

    try {
        const success = await concurrently(
            [
                {
                    name: "web-theme-content",
                    command: `copy-and-watch ${watchArg} "src/theme/web/**/*" "${destination}/theme/web"`
                },
                {
                    name: "web-themesource-content",
                    command: `copy-and-watch ${watchArg} 'src/themesource/atlas_ui_resources/web/**/*' '${destination}/themesource/atlas_ui_resources/web'`
                },
                {
                    name: "native-typescript",
                    command: `tsc ${watchArg} --project tsconfig.json --outDir '${destination}'`
                },
                {
                    name: "native-design-properties-and-manifest",
                    command: `copy-and-watch ${watchArg} 'src/themesource/atlas_ui_resources/native/**/*.json' '${destination}/themesource/atlas_ui_resources/native'`
                }
            ],
            {
                killOthers: ["failure"]
            }
        );
        console.log("Success", success);
    } catch (failure) {
        throw new Error(`Failure ${failure}`);
    }
}

async function exists(filePath) {
    try {
        await access(filePath);
        return true;
    } catch (e) {
        return false;
    }
}
