const chokidar = require("chokidar");
const concurrently = require("concurrently");
const { debounce } = require("lodash");
const sass = require("sass");
const { join } = require("path");
const { rm, mkdir } = require("shelljs");

main().catch(e => {
    console.error(e);
    process.exit(-1);
});

async function main() {
    let mode = "build";

    if (process.argv.includes("start")) {
        mode = "start";
    } else if (process.argv.includes("release")) {
        mode = "release";
    }

    let outputDir;

    if (mode === "build" || mode === "start") {
        const MX_PROJECT_PATH = process.env.ATLAS_MX_PROJECT_PATH; // should be an absolute path.
        outputDir = MX_PROJECT_PATH ? MX_PROJECT_PATH : join(__dirname, "../tests/testProject");

        const toRemoveDirs = [
            join(outputDir, "theme"),
            join(outputDir, "themesource/atlas_ui_resources"),
            join(outputDir, "themesource/atlas_core"),
            join(outputDir, "themesource/atlas_nativemobile_content"),
            join(outputDir, "themesource/atlas_web_content")
        ];
        rm("-rf", toRemoveDirs);
        console.info(`Ensured the directories ${toRemoveDirs.join(", ")} are removed from your Mendix project`);
    } else if (mode === "release") {
        outputDir = join(__dirname, "../dist");

        rm("-rf", outputDir);
        console.info(`Ensured the directory ${outputDir} is removed`);
    }

    // when targeting a networked windows drive, the cmds executed by concurrently run into a race condition when
    // creating directories. create them here to avoid the error.
    mkdir("-p", join(outputDir, "theme"));
    mkdir("-p", join(outputDir, "themesource/atlas_core"));
    mkdir("-p", join(outputDir, "themesource/atlas_web_content"));
    mkdir("-p", join(outputDir, "themesource/atlas_nativemobile_content"));

    if (mode === "start") {
        if (process.argv.includes("--validate-sass")) {
            const watcher = chokidar
                .watch(join(__dirname, "../src/themesource/{atlas_core,atlas_web_content}/web/**/*.scss"))
                .on(
                    "all",
                    debounce(
                        () => {
                            validateSass(mode === "start");
                        },
                        500,
                        { maxWait: 1000 }
                    )
                );

            closeOnSigint(watcher);
        }

        await buildAndCopyAtlas(true, outputDir);
    } else {
        if (process.argv.includes("--validate-sass")) {
            validateSass(mode === "start");
        }
        await buildAndCopyAtlas(false, outputDir);
    }
}

function closeOnSigint(watcher) {
    if (process.platform === "win32") {
        const rl = require("readline").createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.on("SIGINT", () => {
            process.emit("SIGINT");
        });
    }

    process.on("SIGINT", () => {
        watcher.close();
    });
}

function validateSass(watchMode) {
    console.info(`Validating Sass...`);

    try {
        sass.renderSync({ file: join(__dirname, "../src/themesource/atlas_core/web/main.scss") });
        sass.renderSync({ file: join(__dirname, "../src/themesource/atlas_web_content/web/main.scss") });
    } catch (e) {
        if (watchMode) {
            console.error(`Sass validation failed: ${e.message}`);
            return;
        } else {
            throw new Error(`Sass validation failed: ${e.message}`);
        }
    }

    console.info("Sass validation succeeded");
}

async function buildAndCopyAtlas(watchMode, destination) {
    console.info(`Building & copying Atlas...`);
    const watchArg = watchMode ? "--watch" : "";

    try {
        await concurrently(
            [
                {
                    name: "web-theme-content",
                    command: `copy-and-watch ${watchArg} "src/theme/web/**/*" "${join(destination, "theme/web")}"`
                },
                {
                    name: "web-themesource-core",
                    command: `copy-and-watch ${watchArg} "src/themesource/atlas_core/web/**/*" "${join(
                        destination,
                        "themesource/atlas_core/web"
                    )}"`
                },
                {
                    name: "public-themesource-core",
                    command: `copy-and-watch ${watchArg} "src/themesource/atlas_core/public/**/*" "${join(
                        destination,
                        "themesource/atlas_core/public"
                    )}"`
                },
                {
                    name: "web-themesource-content",
                    command: `copy-and-watch ${watchArg} "src/themesource/atlas_web_content/web/**/*" "${join(
                        destination,
                        "themesource/atlas_web_content/web"
                    )}"`
                },
                {
                    name: "public-themesource-content",
                    command: `copy-and-watch ${watchArg} "src/themesource/atlas_web_content/public/**/*" "${join(
                        destination,
                        "themesource/atlas_web_content/public"
                    )}"`
                },
                {
                    name: "native-typescript",
                    command: `tsc ${watchArg} --project tsconfig.json --outDir "${destination}"`
                },
                {
                    name: "native-design-properties-and-manifest",
                    command: `copy-and-watch ${watchArg} "src/themesource/atlas_core/native/**/*.json" "${join(
                        destination,
                        "themesource/atlas_core/native"
                    )}"`
                },
                {
                    name: "public-themesource-nativecontent",
                    command: `copy-and-watch ${watchArg} "src/themesource/atlas_nativemobile_content/public/**/*" "${join(
                        destination,
                        "themesource/atlas_nativemobile_content/public"
                    )}"`
                }
            ],
            {
                killOthers: ["failure"]
            }
        );

        if (!watchMode) {
            console.log("Building & copying Atlas has completed successfully");
        }
    } catch (commands) {
        const commandInfo = commands.map(command => `{ name: ${command.command.name}, exit code: ${command.exitCode}}`);
        throw new Error(`One or more commands failed:\n${commandInfo.join("\n")}`);
    }
}
