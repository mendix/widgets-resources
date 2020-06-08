const { exec } = require("child_process");
const { copy, readJson, writeJson, existsSync } = require("fs-extra");
const { join } = require("path");
const { mkdir, rm, tempdir } = require("shelljs");
const kill = require("tree-kill");
const { promisify } = require("util");
const { run: runYeoman } = require("yeoman-test");

const LIMIT_TESTS = !!process.env.LIMIT_TESTS;

const CONFIGS = [
    ["web", "full", "ts", "8.0"],
    ["native", "full", "js", "8.1"],
    ["web", "full", "js", "8.3"],
    ["native", "full", "ts", "8.6"],
    ["web", "full", "ts", "8.6"],
    ["web", "full", "js", "8.7"],
    ["web", "full", "js", "latest"],
    ["web", "full", "ts", "latest"],
    ["native", "full", "js", "latest"],
    ["native", "full", "ts", "latest"],
    ["web", "empty", "ts", "latest"],
    ["native", "empty", "ts", "latest"]
];

if (LIMIT_TESTS) {
    CONFIGS.splice(1, CONFIGS.length - 2); // Remove all configs except the first and the last
}

describe("pluggable-widgets-tools commands", () => {
    let toolsPackagePath;
    beforeAll(async () => {
        const { stdout: packOutput } = await execAsync("npm pack --loglevel=error", join(__dirname, ".."));
        toolsPackagePath = join(__dirname, "..", packOutput.trim());
    });
    afterAll(() => {
        rm(toolsPackagePath);
    });

    describe.each(CONFIGS)("for %s %s widget created with generator %s", (platform, boilerplate, lang, version) => {
        const widgetName = `generated_${version.replace(".", "_")}_${lang}_${platform}`;
        const workDir = join(tempdir(), `pwt_test_${Math.round(Math.random() * 10000)}`);
        const promptAnswers = {
            widgetName,
            description: "My widget description",
            organization: "com.mendix",
            copyright: "Mendix 2020",
            license: "Apache-2.0",
            version: "1.0.0",
            author: "Widget Generator",
            projectPath: "./dist/MxTestProject",
            programmingLanguage: lang === "ts" ? "typescript" : "javascript",
            platform,
            boilerplate,
            unitTests: true,
            e2eTests: false
        };

        beforeAll(async () => {
            process.stderr.write(`[${widgetName}] Preparing widget...\n`);
            mkdir(workDir);

            if (version === "latest") {
                const generatedWidget = await runYeoman(require.resolve("@mendix/generator-widget/generators/app"))
                    .inTmpDir()
                    .withPrompts(promptAnswers)
                    .withArguments("Generated")
                    .toPromise();
                await copy(join(generatedWidget, "generated"), workDir);
            } else {
                await copy(join(__dirname, "projects", widgetName), workDir);
            }

            const widgetPackageJson = await readJson(join(workDir, "package.json"));
            widgetPackageJson.devDependencies["@mendix/pluggable-widgets-tools"] = toolsPackagePath;
            await writeJson(join(workDir, "package.json"), widgetPackageJson);

            await execAsync("npm install --loglevel=error", workDir);
            process.stderr.write(`[${widgetName}] Ready to test!\n`);
        });
        afterAll(() => {
            process.stderr.write(`[${widgetName}] Tested!\n`);
            rm("-rf", workDir); // ignore errors
        });

        it("lint initially fails (due to prettier) but is fixed by lint:fix", async () => {
            process.stderr.write(`[${widgetName}] Testing linting...\n`);
            await execFailedAsync("npm run lint", workDir);
            await execAsync("npm run lint:fix", workDir);
            await execAsync("npm run lint", workDir);
        });

        if (platform === "native") {
            it("tests originally fail due to snapshots and are fixed with '-u'", async () => {
                process.stderr.write(`[${widgetName}] Testing unit tests...\n`);
                await execFailedAsync("npm test:unit", workDir);
                await execAsync("npm test:unit -- -u", workDir);
                expect(existsSync(join(workDir, `/dist/coverage/clover.xml`))).toBe(true);
            });
        } else {
            it("tests succeed", async () => {
                process.stderr.write(`[${widgetName}] Testing unit tests...\n`);
                await execAsync("npm test:unit", workDir);
                expect(existsSync(join(workDir, `/dist/coverage/clover.xml`))).toBe(true);
            });
        }

        if (!LIMIT_TESTS) {
            it.each(["build", "test:unit", "release"])("'%s' command succeeds", async cmd => {
                process.stderr.write(`[${widgetName}] Testing '${cmd}' command...\n`);
                await execAsync(`npm run ${cmd}`, workDir);
                if (cmd === "build") {
                    expect(
                        existsSync(
                            join(
                                workDir,
                                `/dist/${
                                    promptAnswers.version
                                }/${promptAnswers.organization.trim().toLowerCase()}.${widgetName}.mpk`
                            )
                        )
                    ).toBe(true);
                }
            });

            it("start command doesn't produce errors", async () => {
                process.stderr.write(`[${widgetName}] Testing npm start...\n`);
                const startProcess = exec("npm start", { cwd: workDir });

                try {
                    await new Promise((resolve, reject) => {
                        startProcess.stdout.on("data", data => {
                            if (/\berror\b/i.test(data)) {
                                reject(new Error(`Received error ${data}`));
                            } else if (data.includes("Finished 'copyToDeployment'")) {
                                process.stderr.write(`[${widgetName}] Start succeeded!\n`);
                                resolve();
                            }
                        });
                        startProcess.stderr.on("data", data => {
                            reject(new Error(`Received error output: ${data}`));
                        });
                        startProcess.on("exit", code => {
                            reject(new Error(`Exited with status ${code}`));
                        });
                    });
                } finally {
                    try {
                        await promisify(kill)(startProcess.pid);
                    } catch (_) {}
                    await new Promise(resolve => setTimeout(resolve, 2000)); // give time for processes to die
                }
            });
        }
    });
});

async function execAsync(command, workDir) {
    return promisify(exec)(command, { cwd: workDir });
}

async function execFailedAsync(command, workDir) {
    try {
        await promisify(exec)(command, { cwd: workDir });
    } catch (e) {
        return;
    }
    throw new Error(`Expected '${command}' to fail, but it didn't!`);
}
