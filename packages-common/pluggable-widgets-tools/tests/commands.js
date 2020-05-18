const { Mutex } = require("async-mutex");
const { exec } = require("child_process");
const fkill = require("fkill");
const { copy, readJson, writeJson } = require("fs-extra");
const { join } = require("path");
const { mkdir, rm, tempdir } = require("shelljs");
const { promisify } = require("util");
const { run: runYeoman } = require("yeoman-test");

const LIMIT_TESTS = process.argv.includes("--limited");

const CONFIGS = [
    ["web", "ts", "8.0"],
    ["native", "js", "8.1"],
    ["web", "js", "8.3"],
    ["native", "ts", "8.6"],
    ["web", "ts", "8.6"],
    ["web", "js", "8.7"],
    ["web", "ts", "latest"],
    ["native", "js", "latest"]
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

    const { stdout: packOutput } = await execAsync("npm pack --loglevel=error", join(__dirname, ".."));
    const toolsPackagePath = join(__dirname, "..", packOutput.trim());

    const failures = (
        await Promise.all(
            CONFIGS.map(async config => {
                try {
                    await runTest(...config);
                    return undefined;
                } catch (e) {
                    return [config, e];
                }
            })
        )
    ).filter(f => f);

    rm(toolsPackagePath);

    if (failures.length) {
        failures.forEach(f => console.error(`Test for configuration ${f[0]} failed: ${f[1]}`));
        process.exit(2);
    }

    async function runTest(platform, lang, version) {
        const widgetName = `generated_${version.replace(".", "_")}_${lang}_${platform}`;
        const workDir = join(tempdir(), `pwt_test_${Math.round(Math.random() * 10000)}`);

        try {
            console.log(`[${widgetName}] Preparing widget...`);
            await prepareWidget();
            console.log(`[${widgetName}] Ready to test!`);

            console.log(`[${widgetName}] Testing linting...`);
            await testLint();
            console.log(`[${widgetName}] Testing unit tests....`);
            if (platform === "native") {
                await testTest();
            } else {
                await execAsync("npm run test", workDir);
            }

            if (LIMIT_TESTS) {
                console.log(`[${widgetName}] Quick tested!`);
                return;
            }

            for (const cmd of ["build", "test:unit", "release"]) {
                console.log(`[${widgetName}] Testing '${cmd}' command...`);
                await execAsync(`npm run ${cmd}`, workDir);
            }
            console.log(`[${widgetName}] Testing npm start...`);
            await testStart();
            console.log(`[${widgetName}] Tested!`);
        } finally {
            await new Promise(resolve => setTimeout(resolve, 5000)); // time for all processes to die and unlock the folder
            rm("-rf", workDir);
        }

        async function prepareWidget() {
            mkdir(workDir);

            if (version === "latest") {
                let generatedWidget;
                const release = await mutex.acquire(); // yeoman generator is no re-entrable :(
                try {
                    generatedWidget = await runYeoman(require.resolve("@mendix/generator-widget/generators/app"))
                        .inTmpDir()
                        .withPrompts({
                            widgetName: "Generated",
                            programmingLanguage: lang === "ts" ? "typescript" : "javascript",
                            platform,
                            e2eTests: false
                        })
                        .withArguments("Generated")
                        .toPromise();
                } finally {
                    release();
                }
                await copy(join(generatedWidget, "generated"), workDir);
            } else {
                await copy(join(__dirname, "projects", widgetName), workDir);
            }

            const widgetPackageJson = await readJson(join(workDir, "package.json"));
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
            await execFailedAsync("npm test", workDir);
            await execAsync("npm test -- -u", workDir);
        }

        async function testStart() {
            const startProcess = exec("npm start", { cwd: workDir });

            return Promise.race([
                new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout!")), 100000)),
                new Promise((resolve, reject) => {
                    startProcess.stdout.on("data", data => {
                        if (/\berror\b/i.test(data)) {
                            reject(new Error(`Received error ${data}`));
                        } else if (data.includes("Finished 'copyToDeployment'")) {
                            console.log(`[${widgetName}] Done!`);
                            resolve();
                        }
                    });
                    startProcess.stderr.on("data", data => {
                        reject(new Error(`Received error output: ${data}`));
                    });
                    startProcess.on("exit", code => {
                        reject(new Error(`Exited with status ${code}`));
                    });
                })
            ]).finally(() => fkill(startProcess.pid, { force: true, tree: true, silent: true }));
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
