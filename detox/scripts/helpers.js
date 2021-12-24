const { mkdirSync, rmSync, existsSync, createWriteStream } = require("fs");
const { join } = require("path");
const { pipeline } = require("stream");
const fetch = require("node-fetch");
const { execSync } = require("child_process");
const { promisify } = require("util");

async function downloadFile(url) {
    const folder = join(__dirname, "..", "apps");
    const filename = url.split("/").pop().split("#")[0].split("?")[0];
    const downloadPath = join(folder, filename);

    if (!existsSync(folder)) {
        mkdirSync(folder);
    }
    try {
        await promisify(pipeline)((await fetch(url)).body, createWriteStream(downloadPath));
        return downloadPath;
    } catch (e) {
        if (existsSync(downloadPath)) {
            rmSync(downloadPath);
        }
        throw new Error(`Cannot download from '${url}'.`);
    }
}

function execCommand(command, ignoreErrorContaining) {
    try {
        execSync(command);
    } catch (error) {
        if (!error.message.includes(ignoreErrorContaining)) {
            throw new Error(error);
        }
    }
}

module.exports = { downloadFile, execCommand };
