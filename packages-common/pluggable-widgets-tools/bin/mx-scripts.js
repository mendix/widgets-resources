#! /usr/bin/env node
const { spawnSync } = require("child_process");
const { existsSync } = require("fs");
const { delimiter, dirname, join, parse } = require("path");

const [, currentScriptPath, cmd, ...args] = process.argv;
const toolsRoot = currentScriptPath.endsWith("pluggable-widgets-tools")
    ? join(dirname(currentScriptPath), "../@mendix/pluggable-widgets-tools")
    : join(dirname(currentScriptPath), "..");

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

    switch (cmd) {
        case "start:server":
            return `webpack-dev-server --config ${join(toolsRoot, "configs/webpack.config.js")} --env=dev --quiet`;
        case "start:js":
        case "dev:js":
            return `gulp watch --gulpfile ${join(toolsRoot, "scripts/gulp.js")}`;
        case "start:ts":
        case "dev:ts":
            return `gulp watchTs --gulpfile ${join(toolsRoot, "scripts/gulp.js")}`;
        case "start:js:native":
        case "dev:js:native":
            return `gulp watch --gulpfile ${join(toolsRoot, "scripts/gulp.native.js")}`;
        case "start:ts:native":
        case "dev:ts:native":
            return `gulp watchTs --gulpfile ${join(toolsRoot, "scripts/gulp.native.js")}`;
        case "test":
            return `jest --projects ${join(toolsRoot, "jest.config.js")} --no-cache --ci`;
        case "build:js":
            return `gulp build --gulpfile ${join(toolsRoot, "scripts/gulp.js")}`;
        case "build:ts":
            return `gulp buildTs --gulpfile ${join(toolsRoot, "scripts/gulp.js")}`;
        case "build:js:native":
            return `gulp build --gulpfile ${join(toolsRoot, "scripts/gulp.native.js")}`;
        case "build:ts:native":
            return `gulp buildTs --gulpfile ${join(toolsRoot, "scripts/gulp.native.js")}`;
        case "release:js":
            return `gulp release --gulpfile ${join(toolsRoot, "scripts/gulp.js")} --silent`;
        case "release:ts":
            return `gulp releaseTs --gulpfile ${join(toolsRoot, "scripts/gulp.js")} --silent`;
        case "release:js:native":
            return `gulp release --gulpfile ${join(toolsRoot, "scripts/gulp.native.js")} --silent`;
        case "release:ts:native":
            return `gulp releaseTs --gulpfile ${join(toolsRoot, "scripts/gulp.native.js")} --silent`;
        case "lint":
            return `${prrettierCommand} --check && ${eslintCommand}`;
        case "lint:fix":
            return `${prrettierCommand} --write && ${eslintCommand} --fix`;
        case "format":
            return `${prrettierCommand} --write`;
        case "test:unit":
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
