const { execSync } = require("child_process");
const findFreePort = require("find-free-port");
const { readFile } = require("fs").promises;
const fetch = require("node-fetch");
const { join } = require("path");
const semverCompare = require("semver/functions/rcompare");
const { cp, ls, rm } = require("shelljs");

main().catch(e => {
    console.error(e);
    process.exit(-1);
});

async function main() {
    // verify that docker exists and complain otherwise
    try {
        execSync("docker info");
    } catch (e) {
        throw new Error("To run e2e test locally, make sure docker is running. Exiting now...");
    }

    const latestMendixVersion = await getLatestMendixVersion();
    const packageConf = JSON.parse(await readFile("package.json"));
    const teamServerProject = packageConf?.config?.testProjectId;
    const widgetVersion = packageConf?.version;
    const branch = packageConf?.config.e2eBranch || "trunk";

    if (!teamServerProject) {
        throw new Error(
            "Currently e2e tests can only run against a teamserver project. Please provide the id of such project through config.testPorjectId in you package.json"
        );
    }
    if (!process.env.TS_USERNAME || !process.env.TS_PASSWORD) {
        throw new Error(
            "Currently e2e tests can only run against a teamserver project. Please provide the credentials to access TeamServer through TS_USERNAME and TS_PASSWORD environment variables."
        );
    }
    const widgetMpk = ls(`dist/${widgetVersion}/*.mpk`).length;
    if (!widgetMpk) {
        throw new Error("No widgets founds in dist folder. Please execute `npm run release` before start e2e tests.");
    }

    // Clone the project
    rm("-rf", "mendixProject");
    dockerRun(
        `jgsqware/svn-client checkout --no-auth-cache -q --username "${process.env.TS_USERNAME}" --password "${
            process.env.TS_PASSWORD
        }" https://teamserver.sprintr.com/${teamServerProject}/${
            branch === "trunk" ? branch : `branches/${branch}`
        } /source/mendixProject`
    );

    // Copy the built widget to test project
    cp("-rf", `dist/${widgetVersion}/*.mpk`, "mendixProject/widgets/");

    // Build testProject via mxbuild
    dockerRun(`-e MENDIX_VERSION=${latestMendixVersion} mono:latest /bin/bash /shared/mxbuild.sh`);

    // Spin up the runtime and run testProject
    const freePort = await findFreePort(3000);
    const runtimeContainerId = dockerRun(
        `-d -u root -e MENDIX_VERSION=${latestMendixVersion} -p ${freePort}:8080 mendix/runtime-base:${latestMendixVersion}-bionic /bin/bash /shared/runtime.sh`,
        false
    );

    let attempts = 60;
    for (; attempts > 0; --attempts) {
        try {
            const response = await fetch(`http://localhost:${freePort}`);
            if (response.ok) {
                break;
            }
        } catch (e) {
            console.log(`Could not reach http://localhost:${freePort}, trying again...`);
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    try {
        if (attempts === 0) {
            throw new Error("Runtime didn't start in time, existing now...");
        }
        execSync(`wdio ${join(__dirname, "../test-config/wdio.conf.js")}`, {
            stdio: "inherit",
            env: { ...process.env, URL: `http://localhost:${freePort}` }
        });
    } finally {
        execSync(`docker kill ${runtimeContainerId.trim()}`);
    }
}

function dockerRun(command, appendOutput = true) {
    const dockerStartCommand = `docker run -t --rm -v ${process.cwd()}:/source -v ${__dirname}:/shared:ro -w /source`;
    const output = execSync(`${dockerStartCommand} ${command}`, appendOutput ? { stdio: "inherit" } : {});
    if (!appendOutput) {
        return output.toString();
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
