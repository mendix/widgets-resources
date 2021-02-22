const { execSync } = require("child_process");
const findFreePort = require("find-free-port");
const { access, readFile } = require("fs").promises;
const fetch = require("node-fetch");
const { join } = require("path");
const semverCompare = require("semver/functions/rcompare");
const { cat, cp, ls, mkdir } = require("shelljs");
const nodeIp = require("ip");

main().catch(e => {
    console.error(e);
    process.exit(-1);
});

async function main() {
    const mendixVersion = await getMendixVersion();
    const ip = nodeIp.address();

    if (!ip) {
        throw new Error("Could not determine local ip address!");
    }

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

    if (!process.argv.includes("--no-widget-update")) {
        const widgetMpk = ls(`dist/${widgetVersion}/*.mpk`).length;
        if (!widgetMpk) {
            throw new Error(
                "No widgets founds in dist folder. Please execute `npm run release` before start e2e tests."
            );
        }

        // Copy the built widget to test project
        mkdir("-p", "tests/testProject/widgets");
        cp("-rf", `dist/${widgetVersion}/*.mpk`, "tests/testProject/widgets/");
    }

    // Create reusable mxbuild image
    const existingImages = execSync(`docker image ls -q mxbuild:${mendixVersion}`).toString().trim();
    if (!existingImages) {
        console.log(`Creating new mxbuild docker image...`);
        execSync(
            `docker build -f ${join(__dirname, "mxbuild.Dockerfile")} ` +
                `--build-arg MENDIX_VERSION=${mendixVersion} ` +
                `-t mxbuild:${mendixVersion} ${__dirname}`,
            { stdio: "inherit" }
        );
    }

    // Build testProject via mxbuild
    const projectFile = ls("tests/testProject/*.mpr").toString();
    execSync(
        `docker run -t -v ${process.cwd()}:/source ` +
            `--rm mxbuild:${mendixVersion} bash -c "mx update-widgets --loose-version-check /source/${projectFile} && mxbuild ` +
            `-o /tmp/automation.mda /source/${projectFile}"`,
        { stdio: "inherit" }
    );
    console.log("Bundle created and all the widgets are updated");

    // Spin up the runtime and run testProject
    const freePort = await findFreePort(3000);
    const runtimeContainerId = execSync(
        `docker run -td -v ${process.cwd()}:/source -v ${__dirname}:/shared:ro -w /source -p ${freePort}:8080 ` +
            `-u root -e MENDIX_VERSION=${mendixVersion} --entrypoint /bin/bash ` +
            `mendix/runtime-base:${mendixVersion}-rhel /shared/runtime.sh`
    )
        .toString()
        .trim();

    // Spin up the standalone selenium firefox
    const freePortFirefox = await findFreePort(4444);
    const firefoxContainerId = execSync(
        `docker run -d -p ${freePortFirefox}:4444 -v /dev/shm:/dev/shm selenium/standalone-firefox`
    )
        .toString()
        .trim();

    let attempts = 60;
    for (; attempts > 0; --attempts) {
        try {
            const response = await fetch(`http://${ip}:${freePort}`);
            if (response.ok) {
                break;
            }
        } catch (e) {
            console.log(`Could not reach http://${ip}:${freePort}, trying again...`);
        }
        await new Promise(resolve => setTimeout(resolve, 3000));
    }

    try {
        if (attempts === 0) {
            throw new Error("Runtime didn't start in time, existing now...");
        }
        execSync(`wdio ${join(__dirname, "../test-config/wdio.conf.js")}`, {
            stdio: "inherit",
            env: {
                ...process.env,
                URL: `http://${ip}:${freePort}`,
                SERVER_IP: ip,
                SERVER_PORT: freePortFirefox
            }
        });
    } catch (e) {
        try {
            execSync(`docker logs ${runtimeContainerId}`, { stdio: "inherit" });
        } catch (_) {}
        console.log(cat("results/runtime.log").toString());
        throw e;
    } finally {
        execSync(`docker rm -f ${runtimeContainerId}`);
        execSync(`docker rm -f ${firefoxContainerId}`);
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

async function getMendixVersion() {
    const targetMendixVersion = process.argv[process.argv.indexOf("--mx-version") + 1];
    let mendixVersion;

    if (process.env.MENDIX_VERSION) {
        return process.env.MENDIX_VERSION;
    }
    try {
        const dockerTagsResponse = await fetch(
            "https://registry.hub.docker.com/v1/repositories/mendix/runtime-base/tags"
        );

        let dockerTagsJson = await dockerTagsResponse.json();

        if (targetMendixVersion) {
            dockerTagsJson = dockerTagsJson.filter(r => r.name.startsWith(targetMendixVersion));
        }

        const runtimeVersions = dockerTagsJson.map(r => r.name.split("-").shift());
        runtimeVersions.sort((a, b) =>
            semverCompare(a.replace(/^(\d+\.\d+\.\d+).*/, "$1"), b.replace(/^(\d+\.\d+\.\d+).*/, "$1"))
        );
        mendixVersion = runtimeVersions[0];
    } catch (e) {
        throw new Error("Couldn't reach hub.docker.com. Make sure you are connected to internet.");
    }
    if (!mendixVersion) {
        throw new Error("Couldn't retrieve Mendix version from hub.docker.com. Try again later.");
    }

    return mendixVersion;
}
