const { readdirSync } = require("fs");
const { copySync, readJsonSync, writeJsonSync } = require("fs-extra");
const { join } = require("path");
const { cd, exec, mkdir, rm, tempdir } = require("shelljs");
const kill = require("tree-kill");
const { run: runYeoman } = require("yeoman-test");

describe("pluggable-widgets-tools scripts", () => {
    let toolsPackagePath;
    beforeAll(() => {
        cd(join(__dirname, ".."));
        const packResult = exec("npm pack --loglevel=error", { silent: true });
        expectSuccess(packResult);
        toolsPackagePath = join(__dirname, "..", packResult.stdout.trim());
    });
    afterAll(() => {
        expectSuccess(rm(toolsPackagePath));
    });

    let workDir;
    if (process.platform !== "win32") {
        // Optimize build for linux/mac by reusing the same folder (and hence node_modules)
        beforeAll(initialize);
    }

    describe.each([
        ["web", "ts", "8.0"],
        ["native", "js", "8.1"],
        ["web", "js", "8.3"],
        ["native", "ts", "8.6"],
        ["web", "ts", "8.6"],
        ["web", "js", "8.7"],
        ["native", "js", "latest"],
        ["web", "ts", "latest"]
    ])("For %s %s widget created with generator %s", (platform, lang, version) => {
        const widgetName = `generated_${version.replace(".", "_")}_${lang}_${platform}`;

        beforeAll(async () => {
            process.stderr.write(`Preparing widget ${widgetName}...\n`);

            if (process.platform === "win32") {
                initialize();
            }

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
                copySync(join(generatedWidget, "generated"), workDir);
            } else {
                readdirSync(".")
                    .filter(f => f !== "node_modules")
                    .forEach(f => expectSuccess(rm("-rf", f)));
                copySync(join(__dirname, "projects", widgetName), workDir);
            }

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

        it.each(["build", "test", "test:unit", "release"])("'%s' command succeeds", cmd => {
            process.stderr.write(`Starting ${cmd} for ${widgetName}...\n`);
            const result = exec(`npm run ${cmd}`, { silent: true });
            expectSuccess(result);
        });

        it("start command doesn't produce errors", done => {
            process.stderr.write(`Starting ${widgetName}...\n`);
            const startProcess = exec("npm start", { async: true, silent: true });
            let finished = false;

            startProcess.stdout.on("data", data => {
                if (finished) {
                    return;
                }
                if (/\berror\b/i.test(data)) {
                    finished = true;
                    kill(startProcess.pid);
                    fail(`Received error ${data}`);
                    done();
                } else if (data.includes("Finished 'copyToDeployment'")) {
                    process.stderr.write("Done!\n");
                    finished = true;
                    kill(startProcess.pid);
                    done();
                }
            });
            startProcess.stderr.on("data", data => {
                if (finished) {
                    return;
                }
                finished = true;
                kill(startProcess.pid);
                fail(`Received error output: ${data}`);
                done();
            });
        }, 20000);
    });

    function expectSuccess(result) {
        if (result.code !== 0 || /\berror\b/i.test(result.stdout + result.stderr)) {
            fail(`Command exited with ${result.code}:\n${result.stdout}\n\n${result.stderr}`);
        }
    }

    function initialize() {
        workDir = join(tempdir(), `pwt_test_${Math.round(Math.random() * 10000)}`);
        mkdir(workDir);
        cd(workDir);
    }
});
