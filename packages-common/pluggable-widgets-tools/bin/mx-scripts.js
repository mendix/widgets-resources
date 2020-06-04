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
        env: { ...process.env, PATH: `${process.env.PATH}${delimiter}${findNodeModulesBin()}` },
        shell: true,
        stdio: "inherit"
    });
    if (result.status !== 0) {
        process.exit(result.status);
    }
}

function getRealCommand(cmd, toolsRoot) {
    const eslintCommand = "eslint --config .eslintrc.js --ext .jsx,.js,.ts,.tsx src";
    const prrettierCommand = 'prettier --config prettier.config.js "{src,test}/**/*.{js,jsx,ts,tsx}"';
    const gulpCommand = `gulp --gulpfile ${join(toolsRoot, "scripts/gulp.js")} --cwd ${process.cwd()}`;

    switch (cmd) {
        case "start:server":
            return `webpack-dev-server --config ${join(toolsRoot, "configs/webpack.config.js")} --env=dev --quiet`;
        case "start:web":
        case "start:js":
        case "start:ts":
        case "dev:js":
        case "dev:ts":
            return `${gulpCommand} watch`;
        case "start:native":
        case "start:js:native":
        case "start:ts:native":
        case "dev:js:native":
        case "dev:ts:native":
            return `${gulpCommand} watch --native`;
        case "build:web":
        case "build:js":
        case "build:ts":
            return `${gulpCommand} build`;
        case "build:native":
        case "build:js:native":
        case "build:ts:native":
            return `${gulpCommand} build --native`;
        case "release:web":
        case "release:js":
        case "release:ts":
            return `${gulpCommand} release --silent`;
        case "release:native":
        case "release:js:native":
        case "release:ts:native":
            return `${gulpCommand} release --native --silent`;
        case "lint":
            return `${prrettierCommand} --check && ${eslintCommand}`;
        case "lint:fix":
            return `${prrettierCommand} --write && ${eslintCommand} --fix`;
        case "format":
            return `${prrettierCommand} --write`;
        case "test:unit":
        case "test:unit:web":
            return `jest --projects ${join(toolsRoot, "test-config/jest.config.js")}`;
        case "test:unit:native":
            return `jest --projects ${join(toolsRoot, "test-config/jest.native.config.js")}`;
        case "test:e2e":
        case "test:e2e:ts":
        case "test:e2e:js":
            return `wdio ${join(toolsRoot, "test-config/wdio.conf.js")}`;
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
