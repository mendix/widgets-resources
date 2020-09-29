const { execSync } = require("child_process");
const findFreePort = require("find-free-port");
const { access, readFile } = require("fs").promises;
const fetch = require("node-fetch");
const { join } = require("path");
const semverCompare = require("semver/functions/rcompare");
const { cat, cp, ls, mkdir } = require("shelljs");

const isNativeEnabled = process.argv.includes("--native");

main().catch(e => {
    console.error(e);
    process.exit(-1);
});

async function main() {
    const latestMendixVersion = await getLatestMendixVersion();

    if (!(await exists("tests/testProject"))) {
        throw new Error("No e2e test project found locally in tests/testProject!");
    }
    try {
        execSync("docker info");
    } catch (e) {
        throw new Error("To run e2e test locally, make sure docker is running. Exiting now...");
    }

    const packageConf = JSON.parse(await readFile("package.json"));
    const widgetVersion = packageConf?.version;
    const widgetMpk = ls(`dist/${widgetVersion}/*.mpk`).length;

    if (!widgetMpk) {
        throw new Error("No widgets founds in dist folder. Please execute `npm run release` before start e2e tests.");
    }

    // Copy the built widget to test project
    mkdir("-p", "tests/testProject/widgets");
    cp("-rf", `dist/${widgetVersion}/*.mpk`, "tests/testProject/widgets/");

    // Create reusable mxbuild image
    const existingImages = execSync(`docker image ls -q mxbuild:${latestMendixVersion}`)
        .toString()
        .trim();
    if (!existingImages) {
        console.log(`Creating new mxbuild docker image...`);
        execSync(
            `docker build -f ${join(__dirname, "mxbuild.Dockerfile")} ` +
                `--build-arg MENDIX_VERSION=${latestMendixVersion} ` +
                `-t mxbuild:${latestMendixVersion} ${__dirname}`,
            { stdio: "inherit" }
        );
    }

    let mxbuildServerContainerId;
    let runtimeContainerId;
    try {
        const projectFile = ls("tests/testProject/*.mpr").toString();
        const nativePackagerPort = await findFreePort(8083);

        /**
         * Create container network in order for runtime and mxserver to communicate
         because of native packager
         */
        execSync(`docker network create docker-network`);

        // Build testProject via mxbuild
        if (isNativeEnabled) {
            const mxbuildServerPort = await findFreePort(6543);

            mxbuildServerContainerId = execSync(
                `docker run -td -v ${process.cwd()}:/source -p ${mxbuildServerPort}:6543 -p ${nativePackagerPort}:8083 ` +
                    `--rm mxbuild:${latestMendixVersion} ` +
                    `--serve --host=* --native-packager-host=*`
            ).toString();
            execSync(`docker network connect docker-network ${mxbuildServerContainerId}`);
            await waitForAvailability(`http://localhost:${mxbuildServerPort}`, "mxbuild");
            console.log("MxBuild server started!");

            const mxbuildResult = await fetch(`http://localhost:${mxbuildServerPort}/build`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    target: "Deploy",
                    projectFilePath: `/source/${projectFile}`,
                    useLooseVersionCheck: true
                })
            });

            if (!mxbuildResult.ok) {
                throw new Error(`Cannot deploy an app response status: ${mxbuildResult.status}`);
            }

            const resultJson = await mxbuildResult.json();
            if (resultJson.status !== "Success") {
                throw new Error(`Cannot deploy an app: ${JSON.stringify(resultJson)} is not successful`);
            }

            await waitForAvailability(
                `http://localhost:${nativePackagerPort}/index.bundle?platform=ios&dev=false&minify=true`,
                "packager",
                6000
            );
            console.log("Application deployed!");
        } else {
            execSync(
                `docker run -t -v ${process.cwd()}:/source ` +
                    `--rm mxbuild:${latestMendixVersion} -o /tmp/automation.mda --loose-version-check /source/${projectFile}`,
                { stdio: "inherit" }
            );
        }

        // Spin up the runtime and run testProject
        const runtimePort = await findFreePort(3000);
        runtimeContainerId = execSync(
            `docker run -td -v ${process.cwd()}:/source -v ${__dirname}:/shared:ro -w /source -p ${runtimePort}:8080 ` +
                `-u root -e MENDIX_VERSION=${latestMendixVersion} --network=docker-network ` +
                `-e NATIVE_ENABLED=${isNativeEnabled} -e PACKAGER_PORT=${nativePackagerPort} --entrypoint /bin/bash ` +
                `mendix/runtime-base:${latestMendixVersion}-bionic /shared/runtime.sh`
        ).toString();
        await waitForAvailability(`http://localhost:${runtimePort}`, "runtime");

        if (isNativeEnabled) {
            console.warn("====================================Executing======================");
        } else {
            execSync(`wdio ${join(__dirname, "../test-config/wdio.conf.js")}`, {
                stdio: "inherit",
                env: { ...process.env, URL: `http://localhost:${freePort}` }
            });
        }
    } catch (e) {
        try {
            execSync(`docker logs ${runtimeContainerId.trim()}`, { stdio: "inherit" });
        } catch (_) {}
        console.log(cat("results/runtime.log").toString());
        throw e;
    } finally {
        if (runtimeContainerId) {
            execSync(`docker rm -f ${runtimeContainerId.trim()}`);
        }
        if (mxbuildServerContainerId) {
            execSync(`docker rm -f ${mxbuildServerContainerId.trim()}`);
        }
        execSync(`docker network rm docker-network`);
    }
}

async function exists(filePath) {
    try {
        await access(filePath);
        return true;
    } catch (e) {
        return false;
    }
}

async function getLatestMendixVersion() {
    let latestMendixVersion;
    try {
        const dockerTagsResponse = await fetch(
            "https://registry.hub.docker.com/v1/repositories/mendix/runtime-base/tags"
        );
        const runtimeVersions = (await dockerTagsResponse.json()).map(r => r.name.split("-")[0]);
        runtimeVersions.sort((a, b) =>
            semverCompare(a.replace(/^(\d+\.\d+\.\d+).*/, "$1"), b.replace(/^(\d+\.\d+\.\d+).*/, "$1"))
        );
        latestMendixVersion = runtimeVersions[0];
    } catch (e) {
        throw new Error("Couldn't reach hub.docker.com. Make sure you are connected to internet.");
    }
    if (!latestMendixVersion) {
        throw new Error("Couldn't retrieve latest Mendix version from hub.docker.com. Try again later.");
    }

    return latestMendixVersion;
}

async function waitForAvailability(url, description, timeout = 3000) {
    let attempts = 60;
    for (; attempts > 0; --attempts) {
        try {
            await fetch(url);
            break;
        } catch (e) {}
        console.log(`Could not reach ${description} at ${url}, trying again...`);
        await new Promise(resolve => setTimeout(resolve, timeout));
    }
    if (attempts === 0) {
        throw new Error(`${description} didn't start in time, exiting now...`);
    }
}
