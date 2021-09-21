const concurrently = require("concurrently");
const { join } = require("path");
const { cp, rm, mkdir } = require("shelljs");
const { execSync } = require("child_process");
const { readdir } = require("fs/promises");
const { existsSync } = require("fs");

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
        await buildAndCopyStyles(true, outputDir, mode);
    } else {
        await buildAndCopyStyles(false, outputDir, mode);
    }
}

async function buildAndCopyStyles(watchMode, destination, mode) {
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
            await copyDataWidgets(destination, mode);
            console.log("Building & copying styles has completed successfully");
        }
    } catch (commands) {
        const commandInfo = commands.map(command => `{ name: ${command.command.name}, exit code: ${command.exitCode}}`);
        throw new Error(`One or more commands failed:\n${commandInfo.join("\n")}`);
    }
}

async function copyDataWidgets(destination, mode) {
    const widgets = [
        "datagrid-date-filter-web",
        "datagrid-dropdown-filter-web",
        "datagrid-number-filter-web",
        "datagrid-text-filter-web",
        "datagrid-web",
        "dropdown-sort-web",
        "gallery-web",
        "tree-node-web"
    ];

    let cwd = process.cwd();
    if (cwd.endsWith("data-widgets")) {
        cwd = join(process.cwd(), "../../../");
    }

    if (mode === "release") {
        execSync(`npm run release:data-widgets`, {
            stdio: "inherit",
            cwd
        });

        const pluggableWidgetsFolderPath = join(cwd, "packages/pluggableWidgets");
        const mpkPathsToCopy = [];
        for await (const widget of widgets) {
            const version = require(join(pluggableWidgetsFolderPath, widget, "package.json")).version;
            const widgetDistPath = join(pluggableWidgetsFolderPath, widget, "dist", version);
            const distExists = existsSync(widgetDistPath);

            if (distExists) {
                mpkPathsToCopy.push(...(await readdir(widgetDistPath)).map(name => join(widgetDistPath, name)));
            }
        }
        if (mpkPathsToCopy.length > 0) {
            mkdir("-p", join(__dirname, "../dist/widgets"));
            cp(mpkPathsToCopy, join(__dirname, "../dist/widgets"));
        }
    } else {
        execSync(`MX_PROJECT_PATH=${destination} npm run build:data-widgets`, {
            stdio: "inherit",
            cwd
        });
    }
}
