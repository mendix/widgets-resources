const chokidar = require("chokidar");
const concurrently = require("concurrently");
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

    const sassValidationEnabled = process.argv.includes("--validate-sass");

    let outputDir;

    if (mode === "build" || mode === "start") {
        const MX_PROJECT_PATH = process.env.MX_PROJECT_PATH; // should be an absolute path.
        outputDir = MX_PROJECT_PATH ? MX_PROJECT_PATH : join(__dirname, "../tests/testProject");

        const toRemoveDirs = [join(outputDir, "themesource/datawidgets")];
        rm("-rf", toRemoveDirs);
        console.info(`Ensured the directories ${toRemoveDirs.join(", ")} are removed from your Mendix project`);
    } else if (mode === "release") {
        outputDir = join(__dirname, "../dist");

        rm("-rf", outputDir);
        console.info(`Ensured the directory ${outputDir} is removed`);
    }

    // when targeting a networked windows drive, the cmds executed by concurrently run into a race condition when
    // creating directories. create them here to avoid the error.
    mkdir("-p", join(outputDir, "themesource/datawidgets"));

    if (mode === "start") {
        if (sassValidationEnabled) {
            await new Promise(resolve => {
                const watcher = chokidar.watch(join(__dirname, "../src/themesource/datawidgets/web/**/*.scss")).on(
                    "all",
                    debounce(() => {
                        validateSass(mode === "start");
                        resolve();
                    }, 500)
                );

                closeOnSigint(watcher);
            });
        }

        await buildAndCopyStyles(true, outputDir);
    } else {
        if (sassValidationEnabled) {
            validateSass(mode === "start");
        }
        await buildAndCopyStyles(false, outputDir);
    }
}

function debounce(func, waitFor) {
    let timeout = null;

    return (...args) => {
        if (timeout !== null) {
            clearTimeout(timeout);
            timeout = null;
        }
        timeout = setTimeout(() => func(...args), waitFor);
    };
}

function closeOnSigint(watcher) {
    let rl;

    if (process.platform === "win32") {
        rl = require("readline").createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.on("SIGINT", () => {
            process.emit("SIGINT");
        });
    }

    process.on("SIGINT", () => {
        if (rl) {
            rl.close();
        }
        watcher.close();
    });
}

function validateSass(watchMode) {
    console.info(`Validating Sass...`);

    try {
        sass.renderSync({ file: join(__dirname, "../src/themesource/datawidgets/web/main.scss") });
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

async function buildAndCopyStyles(watchMode, destination) {
    console.info(`Building & copying styles...`);
    const watchArg = watchMode ? "--watch" : "";

    try {
        await concurrently(
            [
                {
                    name: "web-themesource-datawidgets",
                    command: `copy-and-watch ${watchArg} "src/themesource/datawidgets/web/**/*" "${join(
                        destination,
                        "themesource/datawidgets/web"
                    )}"`
                },
                {
                    name: "public-themesource-datawidgets",
                    command: `copy-and-watch ${watchArg} "src/themesource/datawidgets/public/**/*" "${join(
                        destination,
                        "themesource/datawidgets/public"
                    )}"`
                }
            ],
            {
                killOthers: ["failure"]
            }
        );

        if (!watchMode) {
            console.log("Building & copying styles has completed successfully");
        }
    } catch (commands) {
        const commandInfo = commands.map(command => `{ name: ${command.command.name}, exit code: ${command.exitCode}}`);
        throw new Error(`One or more commands failed:\n${commandInfo.join("\n")}`);
    }
}
