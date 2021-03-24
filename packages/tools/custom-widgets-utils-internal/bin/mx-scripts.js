#! /usr/bin/env node
"use strict";

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on("unhandledRejection", err => {
    throw err;
});

const spawn = require("child_process").spawnSync;
const path = require("path");
const args = process.argv.slice(2);
const script = args[0];
const argsFiltered = args.length > 1 ? args.slice(1) : [];
const gulpSlash = require("gulp-slash");

const paths = process.cwd().split(path.sep);
const projectPath = paths.slice(Math.max(paths.length - 2, 1)).join(path.sep);

switch (script) {
    case "build":
    case "dev":
    case "format":
    case "lint":
    case "lint:fix":
    case "start:server":
    case "start":
    case "test:unit":
    case "test:dev":
    case "test:e2e":
    case "release": {
        console.log(
            `Running MX Custom React Widget Tools script: "${script}" ${
                argsFiltered.length > 0 ? `with options "${argsFiltered.join(" ")}"` : ""
            }`
        );
        executeScript(script);
        break;
    }
    default:
        console.log(`Unknown script ${script}".`);
        break;
}

function executeScript(script) {
    const libraryPath = getLibraryPath();
    const spawnParams = { stdio: "inherit" };
    let args = ["run", script];
    if (argsFiltered.length > 0) {
        args.push("--");
        if (!argsFiltered.includes("--subProjectPath")) {
            args = args.concat(["--subProjectPath", projectPath]);
        }
    } else if (!argsFiltered.includes("--subProjectPath")) {
        args.push("--");
        args = args.concat(["--subProjectPath", projectPath]);
    }
    if (
        /.*node_modules[\/|\\]@mendix[\/|\\]custom-widgets-utils-internal[\/|\\]?$/.test(libraryPath) ||
        /^win/.test(process.platform)
    ) {
        spawnParams.cwd = libraryPath;
    }
    const result = spawn(/^win/.test(process.platform) ? "npm.cmd" : "npm", args, spawnParams);
    if (result.signal) {
        if (result.signal === "SIGKILL") {
            console.log(
                "The build failed because the process exited too early. " +
                    "This probably means the system ran out of memory or someone called " +
                    "`kill -9` on the process."
            );
        } else if (result.signal === "SIGTERM") {
            console.log(
                "The build failed because the process exited too early. " +
                    "Someone might have called `kill` or `killall`, or the system could " +
                    "be shutting down."
            );
        }
        process.exit(1);
    } else if (result.status > 1) {
        console.log(result);
    }
    process.exit(result.status);
}

function getLibraryPath() {
    const currentPath = process.argv[1];

    if (currentPath.endsWith("mx-scripts.js")) {
        return gulpSlash(path.join(currentPath, "../../"));
    }
    const isBinFolder = currentPath.indexOf(gulpSlash("/node_modules/.bin")) !== -1;
    return gulpSlash(isBinFolder ? path.join(currentPath, "../../@mendix/custom-widgets-utils-internal") : currentPath);
}
