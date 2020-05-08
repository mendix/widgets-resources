const { readdirSync } = require("fs");
const { copySync, readJsonSync, writeJsonSync } = require("fs-extra");
const { join } = require("path");
const { cd, tempdir, exec, mkdir, rm } = require("shelljs");

const workDir = join(tempdir(), `pwt_test_${Math.round(Math.random() * 10000)}`);
let toolsPackagePath;

beforeAll(() => {
    cd(join(__dirname, ".."));
    const packResult = exec("npm pack --loglevel=error", { silent: true });
    toolsPackagePath = join(__dirname, "..", packResult.stdout.trim());

    mkdir(workDir);
    cd(workDir);
});
afterAll(() => {
    rm("-rf", [workDir, toolsPackagePath]);
});

describe.each([
    ["web", "ts", "8.0"],
    ["native", "js", "8.1"],
    ["web", "js", "8.3"],
    ["native", "ts", "8.6"],
    ["web", "ts", "8.6"]
])("For %s %s widget created with generator v%s", (platform, lang, version) => {
    const widgetName = `generated_${version.replace(".", "_")}_${lang}_${platform}`;

    beforeAll(() => {
        process.stderr.write(`Preparing widget ${widgetName}...\n`);
        readdirSync(".")
            .filter(f => f !== "node_modules")
            .forEach(f => rm("-rf", f));
        copySync(join(__dirname, "projects", widgetName), workDir);

        const widgetPackageJson = readJsonSync("package.json");
        widgetPackageJson.devDependencies["@mendix/pluggable-widgets-tools"] = toolsPackagePath;
        writeJsonSync("package.json", widgetPackageJson);

        const result = exec("npm install --loglevel=error", { silent: true });
        expect(result.code).toBe(0);
    });

    it("lint:fix actually fixes lint errors", () => {
        const r0 = exec("npm run lint", { silent: true });
        expect(r0.code).not.toBe(0, "link command should fail initially");
        const r1 = exec("npm run lint:fix", { silent: true });
        expectSuccess(r1);
        const r2 = exec("npm run lint", { silent: true });
        expectSuccess(r2);
    });

    if (platform === "native") {
        it("tests that are originally failing and are fixed with '-u'", () => {
            const r0 = exec("npm test", { silent: true });
            expect(r0.code).not.toBe(0, "test command should fail initially");
            const r1 = exec("npm test -- -u", { silent: true });
            expectSuccess(r1);
        });
    }

    it.each(["build", "test", "test:unit", "release"])("'%s' command works", cmd => {
        process.stderr.write(`Starting ${cmd} for ${widgetName}...\n`);
        const result = exec(`npm run ${cmd}`, { silent: true });
        expectSuccess(result);
    });

    // todo: test start/dev commands; test current generator
});

function expectSuccess(result) {
    if (result.code !== 0 || /\berror\b/i.test(result.stdout + result.stderr)) {
        fail(`Command exited with ${result.code}:\n${result.stdout}\n\n${result.stderr}`);
    }
}
