const { Mutex, Semaphore } = require("async-mutex");
const { exec } = require("child_process");
const { readFileSync, writeFileSync } = require("fs");
const { copy, existsSync, readJson, writeJson } = require("fs-extra");
const { join } = require("path");
const { ls, mkdir, rm, tempdir } = require("shelljs");
const kill = require("tree-kill");
const { promisify } = require("util");
const { run: runYeoman } = require("yeoman-test");

const LIMIT_TESTS = !!process.env.LIMIT_TESTS;
const PARALLELISM = 4;

const CONFIGS = [
    ["web", "full", "ts", "8.0"],
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

const yeomanMutex = new Mutex();

main().catch(e => {
    console.error(e);
    process.exit(1);
});

async function main() {
    console.log("Preparing...");

    const { stdout: packOutput } = await execAsync("npm pack", join(__dirname, ".."));
    const toolsPackagePath = join(__dirname, "..", packOutput.trim().split(/\n/g).pop());

    const workDirs = [];
    const workDirSemaphore = new Semaphore(PARALLELISM);
    const failures = (
        await Promise.all(
            CONFIGS.map(async config => {
                const [, release] = await workDirSemaphore.acquire();
                let workDir;
                try {
                    workDir = workDirs.pop();
                    if (!workDir) {
                        workDir = join(tempdir(), `pwt_test_${Math.round(Math.random() * 10000)}`);
                        mkdir(workDir);
                    }
                    await runTest(workDir, ...config);
                    return undefined;
                } catch (e) {
                    return [config, e];
                } finally {
                    workDirs.push(workDir);
                    release();
                }
            })
        )
    ).filter(f => f);

    console.log("All done!");
    try {
        rm("-r", toolsPackagePath, ...workDirs);
    } catch (error) {
        console.warn(`Error while removing files: ${error.message}`);
    }

    if (failures.length) {
        failures.forEach(f => console.error(`Test for configuration ${f[0]} failed: ${f[1]}`));
        process.exit(2);
    }

    async function runTest(workDir, platform, boilerplate, lang, version) {
        const isNative = platform === "native";
        const widgetName = `generated_${version.replace(".", "_")}_${lang}_${platform}_${boilerplate}`;
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

        // Check native dependency management
        if (isNative) {
            console.log(`[${widgetName}] Testing native dependency management...`);
            await testNativeDependencyManagement();
        }

        console.log(`[${widgetName}] Tested!`);

        async function prepareWidget() {
            const filesToRemove = ls(workDir)
                .filter(file => file !== "node_modules")
                .map(file => join(workDir, file));
            if (filesToRemove.length) {
                rm("-r", ...filesToRemove);
            }

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
                const release = await yeomanMutex.acquire(); // yeoman generator is no re-entrable :(
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

            // Check native dependency management
            if (isNative) {
                widgetPackageJson.dependencies["react-native-maps"] = "0.27.0";
            }

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
                await execFailedAsync("npm test -- --forceExit", workDir);
                await execAsync("npm test -- -u --forceExit", workDir);
            } else {
                await execAsync("npm test -- --forceExit", workDir);
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
            await execAsync("npm run test:unit -- --forceExit", workDir);
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
            const startProcess = exec("npm start", { cwd: workDir, env: { ...process.env, NO_COLOR: "true" } });

            try {
                await new Promise((resolve, reject) => {
                    let inProgress = false;
                    startProcess.stdout.on("data", onOutput);
                    startProcess.stderr.on("data", onOutput);
                    startProcess.on("exit", exitCode => {
                        reject(new Error(`Exited with status ${exitCode}`));
                    });
                    function onOutput(data) {
                        if (/error/i.test(data)) {
                            reject(new Error(`Received error ${data}`));
                        } else if (/\bbundles /.test(data)) {
                            inProgress = true;
                        } else if (/\bcreated .* in /.test(data)) {
                            inProgress = false;
                            setTimeout(() => {
                                if (!inProgress) {
                                    console.log(`[${widgetName}] Start succeeded!`);
                                    resolve();
                                }
                            }, 100);
                        }
                    }
                });
            } finally {
                try {
                    await promisify(kill)(startProcess.pid, "SIGKILL");
                } catch (_) {
                    console.warn(`[${widgetName}] Error while killing start process`);
                }
                await new Promise(resolve => setTimeout(resolve, 5000)); // give time for processes to die
            }
        }

        async function testNativeDependencyManagement() {
            const entryPointPath = join(workDir, "src", `Generated.${lang}x`);
            const jsonPath = join(workDir, `/dist/tmp/widgets/${widgetPackageJson.widgetName}.json`);
            const fileData = readFileSync(entryPointPath);
            writeFileSync(
                entryPointPath,
                Buffer.concat([
                    Buffer.from(`import "react-native-maps";
`),
                    Buffer.from(fileData)
                ])
            );
            await execAsync("npm run build", workDir);
            if (!existsSync(jsonPath)) {
                throw new Error("Expected dependency json file to be generated, but it wasn't.");
            }
            const dependencyJson = await readJson(jsonPath);
            if (
                !dependencyJson.nativeDependencies ||
                dependencyJson.nativeDependencies["react-native-maps"] !== "0.27.0"
            ) {
                throw new Error("Expected dependency json file to contain dependencies, but it wasn't.");
            }
            if (!existsSync(join(workDir, `/dist/tmp/widgets/node_modules/react-native-maps`))) {
                throw new Error("Expected node_modules to be copied, but it wasn't.");
            }
            if (
                !existsSync(join(workDir, `/dist/tmp/widgets/node_modules/react-native-maps/node_modules/prop-types`))
            ) {
                throw new Error("Expected transitive node_modules to be copied, but it wasn't.");
            }
            console.log(`[${widgetName}] Native dependency management succeeded!`);
        }
    }
}

async function execAsync(command, workDir) {
    const resultPromise = promisify(exec)(command, { cwd: workDir });
    while (true) {
        const waitPromise = new Promise(resolve => setTimeout(resolve, 60 * 1000));

        const haveCompleted = await Promise.race([resultPromise.then(() => true), waitPromise.then(() => false)]);
        if (haveCompleted) {
            return resultPromise;
        }
        console.log("Waiting...");
    }
}

async function execFailedAsync(command, workDir) {
    try {
        await promisify(exec)(command, { cwd: workDir });
    } catch (e) {
        return;
    }
    throw new Error(`Expected '${command}' to fail, but it didn't!`);
}
