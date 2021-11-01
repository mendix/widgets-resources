const { execSync } = require("child_process");
const fetch = require("node-fetch");
const { join } = require("path");
const { cat, mkdir, rm, mv } = require("shelljs");
const { pipeline } = require("stream");
const { promisify } = require("util");
const { createWriteStream } = require("fs");
const { tmpdir } = require("os");
const nodeIp = require("ip");

main().catch(e => {
    console.error(e);
    process.exit(-1);
});

// todo: add all docker run inside a try finally, cleanup.
// not sure of docker container lifecycles in github actions environment
async function main() {
    const mendixVersion = await getMendixVersion();
    const ip = nodeIp.address();
    const ghcr = process.env.CI && process.env.FORKED !== "true" ? "ghcr.io/mendix/widgets-resources/" : "";

    const testArchivePath = await getTestProject("https://github.com/mendix/Native-Mobile-Resources", "main");
    const root = process.cwd();
    const projectsRoot = join(root, "tests");
    const projectDir = join(root, "tests/testProject");
    try {
        mkdir("-p", projectsRoot);
        execSync(`unzip -o ${testArchivePath} -d ${projectsRoot}`);
        mv(`${projectsRoot}/Native-Mobile-Resources-main`, projectDir);
        rm("-f", testArchivePath);
    } catch (e) {
        throw new Error("Failed to unzip the test project into testProject", e.message);
    }

    const output = execSync("npx lerna list --json --since origin/master --loglevel silent --scope '*-native'");
    const packages = JSON.parse(output);

    execSync("npx lerna run release --since origin/master --scope '*-native'");

    packages.forEach(({ name, location }) => {
        if (["mobile-resources-native", "nanoflow-actions-native"].includes(name)) {
            // for js actions
            const path = name === "mobile-resources-native" ? "nativemobileresources" : "nanoflowcommons";
            const jsActionsPath = `${projectDir}/javascriptsource/${path}/actions`;
            rm("-rf", jsActionsPath);
            cp("-r", `${location}/dist`, jsActionsPath);
        } else {
            // for widgets
            // this is acceptable if there's one built version.
            cp(`${location}/dist/**/*.mpk`, `${projectDir}/widgets`);
        }
    });

    // When running on CI pull the docker image from Github Container Registry
    if (ghcr) {
        console.log(`Pulling mxbuild docker image from Github Container Registry...`);
        execSync(`docker pull ${ghcr}mxbuild:${mendixVersion}`);
    }

    const existingImages = execSync(`docker image ls -q ${ghcr}mxbuild:${mendixVersion}`).toString().trim();
    const scriptsPath = join(root, "packages/tools/pluggable-widgets-tools/scripts");

    if (!existingImages) {
        console.log(`Creating new mxbuild docker image...`);
        execSync(
            `docker build -f ${join(scriptsPath, "mxbuild.Dockerfile")} ` +
                `--build-arg MENDIX_VERSION=${mendixVersion} ` +
                `-t mxbuild:${mendixVersion} ${scriptsPath}`,
            { stdio: "inherit" }
        );
    }

    if (ghcr) {
        console.log(`Pulling mxruntime docker image from Github Container Registry...`);
        execSync(`docker pull ${ghcr}mxruntime:${mendixVersion}`);
    }

    const existingRuntimeImages = execSync(`docker image ls -q ${ghcr}mxruntime:${mendixVersion}`).toString().trim();
    if (!existingRuntimeImages) {
        console.log(`Creating new runtime docker image...`);
        execSync(
            `docker build -f ${join(scriptsPath, "runtime.Dockerfile")} ` +
                `--build-arg MENDIX_VERSION=${mendixVersion} ` +
                `-t mxruntime:${mendixVersion} ${scriptsPath}`,
            { stdio: "inherit" }
        );
    }

    let runtimeContainerId;
    let mxbuildContainerId;
    try {
        // Build testProject via mxbuild
        const projectFile = "/source/tests/testProject/NativeComponentsTestProject.mpr";
        mxbuildContainerId = execSync(
            `docker run -p 8083:8083 -td -v ${root}:/source --rm ${ghcr}mxbuild:${mendixVersion} bash`
        )
            .toString()
            .trim();

        console.log("Updating widgets with mx util...");
        execSync(
            `docker exec -t ${mxbuildContainerId} bash -c "mx update-widgets --loose-version-check ${projectFile}"`,
            {
                stdio: "inherit"
            }
        );

        console.log("Building project with mxbuild...");
        execSync(`docker exec -t ${mxbuildContainerId} bash -c "mxbuild -o /tmp/automation.mda ${projectFile}"`, {
            stdio: "inherit"
        });
        console.log("All widgets are updated and project .mpr created.");

        console.log("Starting metro...");
        execSync(
            `docker exec -td ${mxbuildContainerId} bash -c "cd /source/tests/testProject/deployment/native && ` +
                `/tmp/mxbuild/modeler/tools/node/node /tmp/mxbuild/modeler/tools/node/node_modules/react-native/local-cli/cli.js ` +
                `start --port '8083' --config '/source/tests/testProject/deployment/native/metro.config.json' --no-interactive"`,
            { stdio: "inherit" }
        );

        // wait until metro bundler is alive
        let metroRequestAttempts = 60;
        for (; metroRequestAttempts > 0; --metroRequestAttempts) {
            try {
                const response = await fetch(`http://localhost:8083/status`);
                if (response.ok) {
                    break;
                }
            } catch (e) {
                console.log(`Could not reach Metro, trying again...`);
            }
            await new Promise(resolve => setTimeout(resolve, 3000));
        }

        if (metroRequestAttempts === 0) {
            throw new Error("Metro bundler did not start in time...");
        }
        console.log("Metro started.");

        console.log("Preheating bundler for Android dev=false minify=true");
        await Promise.race([
            fetch("http://localhost:8083/index.bundle?platform=android&dev=false&minify=true"),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error("Preheating call timed out!")), 10 * 60 * 1000)
            )
        ]);
        console.log("Preheating done!");

        // Spin up the runtime and run testProject
        runtimeContainerId = execSync(
            `docker run -td -v ${root}:/source -v ${scriptsPath}:/shared:ro -w /source -p 8080:8080 ` +
                `-e MENDIX_VERSION=${mendixVersion} --entrypoint /bin/bash ` +
                `--rm ${ghcr}mxruntime:${mendixVersion} /shared/runtime.sh`
        )
            .toString()
            .trim();

        // wait until runtime is alive
        let attempts = 60;
        for (; attempts > 0; --attempts) {
            try {
                const response = await fetch(`http://localhost:8083`);
                if (response.ok) {
                    break;
                }
            } catch (e) {
                console.log(`Could not reach http://localhost:8083, trying again...`);
            }
            await new Promise(resolve => setTimeout(resolve, 3000));
        }

        if (attempts === 0) {
            throw new Error("Runtime didn't start in time, existing now...");
        }
        const changedPackages = packages.map(package => package.name).join(",");
        console.log("Setup for android...");
        execSync("npm run setup-android");
        console.log("Android successfully setup");
        // https://github.com/lerna/lerna/issues/1846
        // execSync(`npx lerna run test:e2e:local:android --stream --concurrency 1 --scope '{${changedPackages},}'`);
        execSync(`npx lerna run test:e2e:local:android --stream --concurrency 1 --scope '{bar-chart-native,}'`);
    } catch (e) {
        try {
            execSync(`docker logs ${mxbuildContainerId}`, { stdio: "inherit" });
            execSync(
                `docker exec -td ${mxbuildContainerId} bash -c "cat /source/tests/testProject/deployment/log/native_packager_log.txt"`,
                { stdio: "inherit" }
            );
            execSync(`docker logs ${runtimeContainerId}`, { stdio: "inherit" });
        } catch (_) {}
        if (runtimeContainerId) {
            console.log(cat("results/runtime.log").toString());
        }
        throw e;
    } finally {
        execSync(`docker rm -f ${runtimeContainerId}`);
        execSync(`docker rm -f ${mxbuildContainerId}`);
    }
}

async function getTestProject(repository, branch) {
    const downloadedArchivePath = join(tmpdir(), `testProject.zip`);

    if (!repository.includes("github.com")) {
        throw new Error("githubUrl is not a valid github repository!");
    }

    try {
        await promisify(pipeline)(
            (
                await fetch(`${repository}/archive/refs/heads/${branch}.zip`)
            ).body,
            createWriteStream(downloadedArchivePath)
        );
        return downloadedArchivePath;
    } catch (e) {
        console.log(`Url is not available :(`);
        rm("-f", downloadedArchivePath);
    }
    throw new Error("Cannot find test project in GitHub repository. Try again later.");
}

async function getMendixVersion() {
    const mendixOptionIndex = process.argv.indexOf("--mx-version");
    const targetMendixVersion = mendixOptionIndex >= 0 ? process.argv[mendixOptionIndex + 1] : undefined;
    let mendixVersion;

    if (process.env.MENDIX_VERSION) {
        return process.env.MENDIX_VERSION;
    }
    try {
        const mendixVersions = await fetch(
            "https://raw.githubusercontent.com/mendix/widgets-resources/master/configs/e2e/mendix-versions.json"
        );

        const mendixVersionsJson = await mendixVersions.json();

        if (targetMendixVersion && targetMendixVersion in mendixVersionsJson) {
            mendixVersion = mendixVersionsJson[targetMendixVersion];
        } else {
            mendixVersion = mendixVersionsJson.latest;
        }
    } catch (e) {
        throw new Error("Couldn't reach github.com. Make sure you are connected to internet.");
    }
    if (!mendixVersion) {
        throw new Error("Couldn't retrieve Mendix version from github.com. Try again later.");
    }

    return mendixVersion;
}
