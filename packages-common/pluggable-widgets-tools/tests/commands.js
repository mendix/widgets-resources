const mapLimit = require("async/mapLimit");
const { Mutex } = require("async-mutex");
const { exec } = require("child_process");
const { copy, existsSync, readJson, writeJson } = require("fs-extra");
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

const mutex = new Mutex();

main().catch(e => {
    console.error(e);
    process.exit(1);
});

async function main() {
    console.log("Preparing...");

    const { stdout: packOutput } = await execAsync("npm pack", join(__dirname, ".."));
    const toolsPackagePath = join(
        __dirname,
        "..",
        packOutput
            .trim()
            .split(/\n/g)
            .pop()
    );

    const failures = (
        await mapLimit(CONFIGS, 4, async config => {
            try {
                await runTest(...config);
                return undefined;
            } catch (e) {
                return [config, e];
            }
        })
    ).filter(f => f);

    rm(toolsPackagePath);

    if (failures.length) {
        failures.forEach(f => console.error(`Test for configuration ${f[0]} failed: ${f[1]}`));
        process.exit(2);
    }

    async function runTest(platform, boilerplate, lang, version) {
        const widgetName = `generated_${version.replace(".", "_")}_${lang}_${platform}_${boilerplate}`;
        const workDir = join(tempdir(), `pwt_test_${Math.round(Math.random() * 10000)}`);
        let widgetPackageJson;

        console.log(`[${widgetName}] Preparing widget...`);
        await prepareWidget();
        console.log(`[${widgetName}] Ready to test!`);

        console.log(`[${widgetName}] Testing linting...`);
        await testLint();
        console.log(`[${widgetName}] Testing unit tests....`);
        await testTest();

        if (LIMIT_TESTS) {
            console.log(`[${widgetName}] Quick tested!`);
            return;
        }

        console.log(`[${widgetName}] Testing 'build' command...`);
        await testBuild();

        console.log(`[${widgetName}] Testing 'test:unit' command...`);
        await testTestUnit();

        console.log(`[${widgetName}] Testing 'release' command...`);
        await testRelease();

        console.log(`[${widgetName}] Testing npm start...`);
        await testStart();

        console.log(`[${widgetName}] Tested!`);
        rm("-rf", workDir); // ignore errors

        async function prepareWidget() {
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
                let generatedWidget;
                const release = await mutex.acquire(); // yeoman generator is no re-entrable :(
                try {
                    generatedWidget = await runYeoman(require.resolve("@mendix/generator-widget/generators/app"))
                        .inTmpDir()
                        .withPrompts(promptAnswers)
                        .withArguments("Generated")
                        .toPromise();
                } finally {
                    release();
                }
                await copy(join(generatedWidget, "generated"), workDir);
            } else {
                await copy(join(__dirname, "projects", widgetName), workDir);
            }

            widgetPackageJson = await readJson(join(workDir, "package.json"));
            widgetPackageJson.devDependencies["@mendix/pluggable-widgets-tools"] = toolsPackagePath;
            await writeJson(join(workDir, "package.json"), widgetPackageJson);

            await execAsync("npm install --loglevel=error", workDir);
        }

        async function testLint() {
            await execFailedAsync("npm run lint", workDir);
            await execAsync("npm run lint:fix", workDir);
            await execAsync("npm run lint", workDir);
        }

        async function testTest() {
            if (platform === "native") {
                await execFailedAsync("npm test", workDir);
                await execAsync("npm test -- -u", workDir);
            } else {
                await execAsync("npm test", workDir);
            }
        }

        async function testBuild() {
            await execAsync("npm run build", workDir);
            if (
                !existsSync(
                    join(
                        workDir,
                        `/dist/${widgetPackageJson.version}/${widgetPackageJson.packagePath}.${widgetPackageJson.widgetName}.mpk`
                    )
                )
            ) {
                throw new Error("Expected mpk file to be generated, but it wasn't.");
            }
        }

        async function testTestUnit() {
            await execAsync("npm run test:unit", workDir);
            if (!existsSync(join(workDir, `/dist/coverage/clover.xml`))) {
                throw new Error("Expected coverage file to be generated, but it wasn't.");
            }
        }

        async function testRelease() {
            rm("-rf", join(workDir, "dist"));
            await execAsync("npm run release", workDir);

            if (
                !existsSync(
                    join(
                        workDir,
                        `/dist/${widgetPackageJson.version}/${widgetPackageJson.packagePath}.${widgetPackageJson.widgetName}.mpk`
                    )
                )
            ) {
                throw new Error("Expected mpk file to be generated, but it wasn't.");
            }
        }

        async function testStart() {
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
                            console.log(`[${widgetName}] Start succeeded!`);
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
        }
    }
}

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
