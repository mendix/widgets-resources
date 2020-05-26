const { exec } = require("child_process");
const findFreePort = require("find-free-port");
const { readFile } = require("fs").promises;
const fetch = require("node-fetch");
const { join } = require("path");
const semverCompare = require("semver/functions/rcompare");
const { rm } = require("shelljs");
const { promisify } = require("util");

main().catch(e => {
    console.error(e);
    process.exit(-1);
});

async function main() {
    // verify that docker exists and complain otherwise
    // verify sprint password and username

    const latestRuntimeVersion = await getLatestRuntimeVersion();
    if (!latestRuntimeVersion) {
        throw new Error("duck you");
    }

    rm("-rf", "mendixProject");
    const sprintrProject = JSON.parse(await readFile("package.json"))?.config?.testProjectId;
    if (!sprintrProject) {
        throw new Error("duck you");
    }

    const dockerStartCommand = `docker run -t --rm -v ${process.cwd()}:/source -v ${__dirname}:/shared:ro -w /source`;

    await execAsync(
        `${dockerStartCommand} jgsqware/svn-client checkout --no-auth-cache -q --username "${process.env.SPRINTR_USERNAME}" --password "${process.env.SPRINTR_PASSWORD}" https://teamserver.sprintr.com/${sprintrProject}/branches/nightly /source/mendixProject`
    );
    await execAsync(
        `${dockerStartCommand} -e MENDIX_VERSION=${latestRuntimeVersion} mono:latest /bin/bash /shared/mxbuild.sh`
    );
    const freePort = await findFreePort(3000);
    const runtimeContainerId = await execAsync(
        `${dockerStartCommand} -d -u root -e MENDIX_VERSION=${latestRuntimeVersion} -p ${freePort}:8080 mendix/runtime-base:${latestRuntimeVersion}-bionic /bin/bash /shared/runtime.sh`
    );
    try {
        exec(`wdio ${join(__dirname, "../test-configs/wdio.config.js")}`);
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
    return promisify(exec)(command, { cwd: process.cwd() });
}
