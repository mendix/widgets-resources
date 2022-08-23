const { exec } = require("child_process");
const { rmSync } = require("fs");
const { promisify } = require("util");
const { join } = require("path");
const { downloadFile, execCommand } = require("./helpers");

main().catch(e => {
    console.error(e);
    process.exit(-1);
});

async function main() {
    console.log("Checking OS...");
    if (process.platform !== "darwin") {
        throw new Error("iOS simulators can only run on Mac OS.");
    }

    console.log("Installing xcode-select...");
    execCommand("xcode-select --install", "command line tools are already installed");

    console.log("Installing simutils...");
    execCommand("brew tap wix/brew && brew install applesimutils");

    console.log("Done!");
}
