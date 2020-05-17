const { exec } = require("child_process");
const { copy, readJson, writeJson } = require("fs-extra");
const { join } = require("path");
const { cd, mkdir, rm, tempdir } = require("shelljs");
const kill = require("tree-kill");
const { promisify } = require("util");
const { run: runYeoman } = require("yeoman-test");

const CONFIGS = [
    ["web", "ts", "8.0"],
    ["native", "js", "8.1"],
    ["web", "js", "8.3"],
    ["native", "ts", "8.6"],
    ["web", "ts", "8.6"],
    ["web", "js", "8.7"],
    ["native", "js", "latest"],
    ["web", "ts", "latest"]
];

main().catch(e => {
    console.error(e);
    process.exit(1);
});

async function main() {
    console.log("Preparing...");

    cd(join(__dirname, ".."));
    const { stdout: packOutput } = await execAsync("npm pack --loglevel=error");
    const toolsPackagePath = join(__dirname, "..", packOutput.trim());

    const results = await Promise.all(
        CONFIGS.map(config =>
            runTest(...config).then(
                () => ["success"],
                e => ["failed", e]
            )
        )
    );

    rm(toolsPackagePath);

    const failedConfigs = results
        .map((result, index) => (result[0] === "failed" ? [CONFIGS[index], result[1]] : undefined))
        .filter(c => c);
    if (failedConfigs.length) {
        failedConfigs.forEach(c => console.error(`Test for configuration ${c[0]} failed: ${c[1]}`));
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
            if (platform === "native") {
                console.log(`[${widgetName}] Testing unit tests....`);
                await testTest();
            }
            for (const cmd of ["build", "test", "test:unit", "release"]) {
                console.log(`[${widgetName}] Testing '${cmd}' command...`);
                await execAsync(`npm run ${cmd}`);
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
            cd(workDir);

            if (version === "latest") {
                const generatedWidget = await runYeoman(require.resolve("@mendix/generator-widget/generators/app"))
                    .inTmpDir()
                    .withPrompts({
                        widgetName: "Generated",
                        programmingLanguage: lang === "ts" ? "typescript" : "javascript",
                        platform,
                        e2eTests: false
                    })
                    .withArguments("Generated")
                    .toPromise();
                await copy(join(generatedWidget, "generated"), workDir);
            } else {
                await copy(join(__dirname, "projects", widgetName), workDir);
            }

            const widgetPackageJson = await readJson("package.json");
            widgetPackageJson.devDependencies["@mendix/pluggable-widgets-tools"] = toolsPackagePath;
            await writeJson("package.json", widgetPackageJson);

            await execAsync("npm install --loglevel=error");
        }

        async function testLint() {
            await execAsync("npm run lint", { expectFailure: true });
            await execAsync("npm run lint:fix");
            await execAsync("npm run lint");
        }

        async function testTest() {
            await execAsync("npm test", { expectFailure: true });
            await execAsync("npm test -- -u");
        }

        async function testStart() {
            const startProcess = exec("npm start", { cwd: process.cwd() });

            return Promise.race([
                new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout!")), 20000)),
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
            ]).finally(() => promisify(kill)(startProcess.pid));
        }
    }
}

async function execAsync(command, options = {}) {
    let result;

    try {
        result = await promisify(exec)(command, { cwd: process.cwd() });
    } catch (e) {
        if (!options.expectFailure) {
            throw e;
        } else {
            return undefined;
        }
    }
    if (options.expectFailure) {
        throw new Error(`Expected '${command}' to fail, but it didn't!`);
    }

    return result;
}
