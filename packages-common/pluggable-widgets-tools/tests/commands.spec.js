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
    ["web", "full", "ts", "8.9"],
    ["native", "full", "ts", "8.9"],
    ["web", "full", "js", "latest"],
    ["web", "full", "ts", "latest"],
    ["native", "full", "js", "latest"],
    ["native", "full", "ts", "latest"],
    ["web", "empty", "js", "latest"],
    ["web", "empty", "ts", "latest"],
    ["native", "empty", "js", "latest"],
    ["native", "empty", "ts", "latest"]
];

if (LIMIT_TESTS) {
    CONFIGS.splice(1, CONFIGS.length - 2); // Remove all configs except the first and the last
}

describe("pluggable-widgets-tools commands", () => {
    let toolsPackagePath;
    beforeAll(async () => {
        const { stdout: packOutput } = await execAsync("npm pack", join(__dirname, ".."));
        toolsPackagePath = join(
            __dirname,
            "..",
            packOutput
                .trim()
                .split(/\n/g)
                .pop()
        );
    });
    afterAll(() => {
        rm(toolsPackagePath);
    });

    describe.each(CONFIGS)("for %s %s widget created with generator %s", (platform, boilerplate, lang, version) => {
        const widgetConfigDescription = `generated_${version.replace(".", "_")}_${lang}_${platform}`;
        const workDir = join(tempdir(), `pwt_test_${Math.round(Math.random() * 10000)}`);
        let widgetPackageJson;

        beforeAll(async () => {
            process.stderr.write(`[${widgetConfigDescription}] Preparing widget...\n`);
            mkdir(workDir);

            if (version === "latest") {
                const promptAnswers = {
                    name: "Generated",
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
                    hasUnitTests: true,
                    hasE2eTests: false
                };
                const generatedWidget = await runYeoman(require.resolve("@mendix/generator-widget/generators/app"))
                    .inTmpDir()
                    .withPrompts(promptAnswers)
                    .withArguments("Generated")
                    .toPromise();
                await copy(join(generatedWidget, "generated"), workDir);
            } else {
                await copy(join(__dirname, "projects", widgetConfigDescription), workDir);
            }

            widgetPackageJson = await readJson(join(workDir, "package.json"));
            widgetPackageJson.devDependencies["@mendix/pluggable-widgets-tools"] = toolsPackagePath;
            await writeJson(join(workDir, "package.json"), widgetPackageJson);

            await execAsync("npm install --loglevel=error", workDir);
            process.stderr.write(`[${widgetConfigDescription}] Ready to test!\n`);
        });
        afterAll(() => {
            process.stderr.write(`[${widgetConfigDescription}] Tested!\n`);
            rm("-rf", workDir); // ignore errors
        });

        it("lint initially fails (due to prettier) but is fixed by lint:fix", async () => {
            process.stderr.write(`[${widgetConfigDescription}] Testing linting...\n`);
            await execFailedAsync("npm run lint", workDir);
            await execAsync("npm run lint:fix", workDir);
            await execAsync("npm run lint", workDir);
        });

        if (platform === "native") {
            it("tests originally fail due to snapshots and are fixed with '-u'", async () => {
                process.stderr.write(`[${widgetConfigDescription}] Testing unit tests...\n`);
                await execFailedAsync("npm test", workDir);
                await execAsync("npm test -- -u", workDir);
            });
        } else {
            it("tests succeed", async () => {
                process.stderr.write(`[${widgetConfigDescription}] Testing unit tests...\n`);
                await execAsync("npm test", workDir);
            });
        }

        if (!LIMIT_TESTS) {
            it("'build' command succeeds", async () => {
                process.stderr.write(`[${widgetConfigDescription}] Testing 'build' command...\n`);
                await execAsync("npm run build", workDir);

                expect(
                    existsSync(
                        join(
                            workDir,
                            `/dist/${widgetPackageJson.version}/${widgetPackageJson.packagePath}.${widgetPackageJson.widgetName}.mpk`
                        )
                    )
                ).toBe(true);
            });

            it("'test:unit' command succeeds", async () => {
                process.stderr.write(`[${widgetConfigDescription}] Testing 'test:unit' command...\n`);
                await execAsync("npm run test:unit", workDir);

                expect(existsSync(join(workDir, `/dist/coverage/clover.xml`))).toBe(true);
            });

            fit("'release' command succeeds", async () => {
                process.stderr.write(`[${widgetConfigDescription}] Testing 'release' command...\n`);
                rm(
                    "-f",
                    join(
                        workDir,
                        `/dist/${widgetPackageJson.version}/${widgetPackageJson.packagePath}.${widgetPackageJson.widgetName}.mpk`
                    )
                );

                await execAsync("npm run release", workDir);

                expect(
                    existsSync(
                        join(
                            workDir,
                            `/dist/${widgetPackageJson.version}/${widgetPackageJson.packagePath}.${widgetPackageJson.widgetName}.mpk`
                        )
                    )
                ).toBe(true);
            });

            it("'start' command doesn't produce errors", async () => {
                process.stderr.write(`[${widgetConfigDescription}] Testing npm start...\n`);
                const startProcess = exec("npm start", { cwd: workDir });

                try {
                    await new Promise((resolve, reject) => {
                        startProcess.stdout.on("data", data => {
                            if (/\berror\b/i.test(data)) {
                                reject(new Error(`Received error ${data}`));
                            } else if (
                                data.includes("Finished 'copyToDeployment'") ||
                                data.includes("Project is running at http://localhost:3000/")
                            ) {
                                process.stderr.write(`[${widgetConfigDescription}] Start succeeded!\n`);
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
