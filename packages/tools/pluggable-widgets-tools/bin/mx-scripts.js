#! /usr/bin/env node
const { spawnSync } = require("child_process");
const { existsSync } = require("fs");
const { delimiter, dirname, join, parse } = require("path");

const [, currentScriptPath, cmd, ...args] = process.argv;
const toolsRoot = currentScriptPath.endsWith("pluggable-widgets-tools")
    ? join(dirname(currentScriptPath), "../@mendix/pluggable-widgets-tools")
    : join(dirname(currentScriptPath), "..");

if (args.indexOf("--subprojectPath") > -1) {
    args.splice(args.indexOf("--subprojectPath"), 2);
}
const realCommand = getRealCommand(cmd, toolsRoot) + " " + args.join(" ");
console.log(`Running MX Widgets Tools script ${cmd}...`);

for (const subCommand of realCommand.split(/&&/g)) {
    const result = spawnSync(subCommand.trim(), [], {
        cwd: process.cwd(),
        env: {
            ...process.env,
            PATH: `${process.env.PATH}${delimiter}${findNodeModulesBin()}`,
            // Hack for Windows using NTFS Filesystem, we cannot add platform specific check otherwise GitBash or other linux based terminal on windows will also fail.
            Path: `${process.env.Path}${delimiter}${findNodeModulesBin()}`
        },
        shell: true,
        stdio: "inherit"
    });
    if (result.status !== 0) {
        process.exit(result.status);
    }
}

function getRealCommand(cmd, toolsRoot) {
    const eslintCommand = "eslint --config .eslintrc.js --ext .jsx,.js,.ts,.tsx src";
    const prettierConfigRootPath = join(__dirname, "../../../../prettier.config.js");
    const prettierConfigPath = existsSync(prettierConfigRootPath) ? prettierConfigRootPath : "prettier.config.js";
    const prettierCommand = `prettier --config "${prettierConfigPath}" "{src,typings,tests}/**/*.{js,jsx,ts,tsx,scss}"`;
    const rollupCommandWeb = `rollup --config "${join(toolsRoot, "configs/rollup.config.js")}"`;
    const rollupCommandNative = `rollup --config "${join(toolsRoot, "configs/rollup.config.native.js")}"`;

    switch (cmd) {
        case "start:web":
        case "start:server":
        case "dev:js":
        case "dev:ts":
            return `${rollupCommandWeb} --watch`;
        case "start:native":
        case "start:js:native":
        case "start:ts:native":
        case "dev:js:native":
        case "dev:ts:native":
            return `${rollupCommandNative} --watch`;
        case "build:web":
        case "build:js":
        case "build:ts":
            return `${rollupCommandWeb}`;
        case "build:native":
        case "build:js:native":
        case "build:ts:native":
            return `${rollupCommandNative}`;
        case "release:web":
        case "release:js":
        case "release:ts":
            return `${rollupCommandWeb} --configProduction`;
        case "release:native":
        case "release:js:native":
        case "release:ts:native":
            return `${rollupCommandNative} --configProduction`;
        case "lint":
            return `${prettierCommand} --check && ${eslintCommand}`;
        case "lint:fix":
            return `${prettierCommand} --write && ${eslintCommand} --fix`;
        case "format":
            return `${prettierCommand} --write`;
        case "test:unit":
        case "test:unit:web":
            return `jest --projects "${join(toolsRoot, "test-config/jest.config.js")}"`;
        case "test:unit:native":
            return `jest --projects "${join(toolsRoot, "test-config/jest.native.config.js")}"`;
        case "test:e2e":
        case "test:e2e:ts":
        case "test:e2e:web:cypress":
            return `node "${join(toolsRoot, "scripts/e2e.cypress.js")}" $@`;
        case "test:e2e:web:cypress:local":
            return "npx cypress open --browser chrome --e2e";
        case "start:js":
        case "start:ts":
            return "echo This command has no effect, use pluggable-widgets-tools start:web instead!";
        default:
            console.error(`Unknown command passed to MX Widgets Tools script: '${cmd}'`);
            process.exit(1);
    }
}

function findNodeModulesBin() {
    let parentDir = join(__dirname, "../..");
    while (parse(parentDir).root !== parentDir) {
        const candidate = join(parentDir, "node_modules/.bin");
        if (existsSync(candidate)) {
            return candidate;
        }
        parentDir = join(parentDir, "..");
    }
    throw new Error("Cannot find bin folder");
}
