const { exec } = require("child_process");
const { join } = require("path");
const rCopy = require("recursive-copy");
const { rm } = require("shelljs");
const { promisify } = require("util");

main().catch(e => {
    console.error(e);
    process.exit(-1);
});

async function main() {
    rm("-rf", "tests/testProject/themesource/datawidgets");

    await copyLatestDataWidgets();
}

async function copyLatestDataWidgets() {
    console.log("Copying latest data widgets from mono repo...");

    const dataWidgetsSrc = join(process.cwd(), "../../modules/data-widgets");

    try {
        await promisify(exec)("npm run release:module", { cwd: dataWidgetsSrc });
    } catch (e) {
        throw new Error(`Failed to create a release distribution of Data Widgets: ${e}`);
    }

    try {
        await promisify(rCopy)(join(dataWidgetsSrc, "dist"), "tests/testProject");
    } catch (e) {
        throw new Error("Failed to copy Data Widgets release distribution to test/testProject");
    }
}
