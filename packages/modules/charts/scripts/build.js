const { join } = require("path");
const { cp, rm, mkdir } = require("shelljs");
const { execSync } = require("child_process");
const { readdir } = require("fs/promises");
const { existsSync } = require("fs");

main().catch(e => {
    console.error(e);
    process.exit(1);
});

async function main() {
    let mode = "build";

    if (process.argv.includes("release")) {
        mode = "release";
    }

    let outputDir;

    if (mode === "build") {
        const MX_PROJECT_PATH = process.env.MX_PROJECT_PATH; // should be an absolute path.
        outputDir = MX_PROJECT_PATH ? MX_PROJECT_PATH : join(__dirname, "../tests/testProject");

        const toRemoveDirs = [join(outputDir, "themesource/charts")];
        rm("-rf", toRemoveDirs);
        console.info(`Ensured the directories ${toRemoveDirs.join(", ")} are removed from your Mendix project`);
    } else if (mode === "release") {
        outputDir = join(__dirname, "../dist");

        rm("-rf", outputDir);
        console.info(`Ensured the directory ${outputDir} is removed`);
    }

    // when targeting a networked windows drive, the cmds executed by concurrently run into a race condition when
    // creating directories. create them here to avoid the error.
    mkdir("-p", join(outputDir, "themesource/charts"));

    await buildAndCopyStyles(outputDir, mode);
}

async function buildAndCopyStyles(destination, mode) {
    console.info(`Building & copying styles...`);

    mkdir("-p", join(destination, "themesource/charts/public"));
    cp(join(__dirname, "../src/themesource/charts/public/*"), join(destination, "themesource/charts/public"));

    await copyChartsWidgets(destination, mode);
    console.log("Building & copying styles has completed successfully");
}

async function copyChartsWidgets(destination, mode) {
    const widgets = [
        "area-chart-web",
        "bar-chart-web",
        "bubble-chart-web",
        "column-chart-web",
        "heatmap-chart-web",
        "line-chart-web",
        "pie-doughnut-chart-web",
        "time-series-chart-web"
    ];

    let cwd = process.cwd();
    if (cwd.endsWith("charts")) {
        cwd = join(cwd, "../../../");
    }

    if (mode === "release") {
        execSync(`npm run release -- --scope '*-chart-web' --concurrency 1`, {
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
        execSync(
            `npx cross-env MX_PROJECT_PATH=${destination} npm run build -- --scope '*-chart-web' --concurrency 1`,
            {
                stdio: "inherit",
                cwd
            }
        );
    }
}
