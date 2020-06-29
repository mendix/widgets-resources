const { exec, execSync, spawnSync } = require("child_process");
const findFreePort = require("find-free-port");
const { readFile } = require("fs").promises;
const fetch = require("node-fetch");
const { join } = require("path");
const semverCompare = require("semver/functions/rcompare");
const { cp } = require("shelljs");
const { promisify } = require("util");

main().catch(e => {
    console.error(e);
    process.exit(-1);
});

async function main() {
    // verify that docker exists and complain otherwise
    try {
        await execAsync("docker info");
    } catch (e) {
        throw new Error("To run e2e test locally, make sure docker is running. Exiting now...");
    }

    const latestRuntimeVersion = await getLatestRuntimeVersion();
    if (!latestRuntimeVersion) {
        throw new Error("Couldn't reach hub.docker.com. Make sure you are connected to internet.");
    }

    const packageConf = JSON.parse(await readFile("package.json"));
    const sprintrProject = packageConf?.config?.testProjectId;
    const widgetVersion = packageConf?.version;

    if (!sprintrProject) {
        throw new Error(
            "Currently e2e tests only can run with sprintr project. Please make sure there is a testProjectId field in package.json for respective projects."
        );
    }
    if (!process.env.SPRINTR_USERNAME || process.env.SPRINTR_PASSWORD) {
        throw new Error(
            "Currently e2e tests only can run with sprintr project. Please make sure there is a SPRINTR_USERNAME and SPRINTR_PASSWORD set in environment vars."
        );
    }

    const dockerStartCommand = `docker run -t --rm -v ${process.cwd()}:/source -v ${__dirname}:/shared:ro -w /source`;

    // Clone the project
    execSync(
        `${dockerStartCommand} jgsqware/svn-client checkout --no-auth-cache -q --username "${process.env.SPRINTR_USERNAME}" --password "${process.env.SPRINTR_PASSWORD}" https://teamserver.sprintr.com/${sprintrProject}/branches/nightly /source/mendixProject`,
        { stdio: "inherit" }
    );

    // Copy the built widget to test project
    cp("-rf", `dist/${widgetVersion}/*.mpk`, "mendixProject/widgets/");

    // Build testProject via mxbuild
    execSync(
        `${dockerStartCommand} -e MENDIX_VERSION=${latestRuntimeVersion} mono:latest /bin/bash /shared/mxbuild.sh`,
        { stdio: "inherit" }
    );

    // Spin up the runtime and run testProject
    const freePort = await findFreePort(3000);
    const runtimeContainerId = await execAsync(
        `${dockerStartCommand} -d -u root -e MENDIX_VERSION=${latestRuntimeVersion} -p ${freePort}:8080 mendix/runtime-base:${latestRuntimeVersion}-bionic /bin/bash /shared/runtime.sh`
    );

    let attempts = 600;
    for (; attempts > 0; --attempts) {
        try {
            const response = await fetch(`http://localhost:${freePort}`);
            if (response.ok) {
                break;
            }
        } catch (e) {
            // we need this
        }
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    try {
        if (attempts === 0) {
            throw new Error("Maximum attempt to spin up runtime reached. Exiting now...");
        }
        execSync(`wdio ${join(__dirname, "../test-config/wdio.conf.js")}`, {
            stdio: "inherit",
            env: { ...process.env, URL: `http://localhost:${freePort}` }
        });
    } finally {
        await execAsync(`docker kill ${runtimeContainerId.trim()}`);
    }
}

async function getLatestRuntimeVersion() {
    const dockerTagsResponse = await fetch("https://registry.hub.docker.com/v1/repositories/mendix/runtime-base/tags");
    const runtimeVersions = (await dockerTagsResponse.json()).map(r => r.name.split("-")[0]);
    runtimeVersions.sort((a, b) =>
        semverCompare(a.replace(/^(\d+\.\d+\.\d+).*/, "$1"), b.replace(/^(\d+\.\d+\.\d+).*/, "$1"))
    );
    return runtimeVersions[0];
}

async function execAsync(command) {
    return (await promisify(exec)(command, { cwd: process.cwd() })).stdout;
}
