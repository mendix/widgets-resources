const { execSync } = require("child_process");

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
    try {
        execSync("xcode-select --install");
    } catch (error) {
        if (!error.message.includes("command line tools are already installed")) {
            throw new Error(error);
        }
    }

    console.log("Installing simutils...");
    execSync("brew tap wix/brew && brew install applesimutils");

    console.log("Done!");
}
