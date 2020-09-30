const { execSync } = require("child_process");
const findFreePort = require("find-free-port");
const { access, readFile } = require("fs").promises;
const fetch = require("node-fetch");
const { join } = require("path");
const semverCompare = require("semver/functions/rcompare");
const { cat, cp, ls, mkdir, tempdir } = require("shelljs");

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

    const projectFile = ls("tests/testProject/*.mpr").toString();

    execSync(
        `docker run -t -v ${process.cwd()}:/source --rm mxbuild:${latestMendixVersion} ` +
            (isNativeEnabled ? "--native-packager --native-packager-platform=ios --disable-native-animations " : "") +
            `-o /tmp/automation.mda --loose-version-check /source/${projectFile}`,
        { stdio: "inherit" }
    );
    console.log("MxBuild server started!");

    let runtimeContainerId;
    try {
        // Spin up the runtime and run testProject
        const runtimePort = await findFreePort(3000);
        runtimeContainerId = execSync(
            `docker run -td -v ${process.cwd()}:/source -v ${__dirname}:/shared:ro -w /source -p ${runtimePort}:8080 ` +
                `-u root -e MENDIX_VERSION=${latestMendixVersion} --entrypoint /bin/bash ` +
                `mendix/runtime-base:${latestMendixVersion}-bionic /shared/runtime.sh`
        ).toString();
        await waitForAvailability(`http://localhost:${runtimePort}`, "runtime");

        if (isNativeEnabled) {
            // TODO: Clone the already build detoxApp so we can copy over bundles
            const appSource = join(process.cwd(), "tests/detoxApp/ios/nativeTemplate.app");

            // Multiple tests can run parallel, copying will prevent changing the same folder
            const tmpApp = join(tempdir(), `nativeApp_${Math.round(Math.random() * 10000)}.app`);
            const tmpAppBundle = join(tmpApp, "Bundle/");
            const bundleSource = join("tests/testProject", "deployment/native/bundle/iOS/");

            cp("-R", appSource, tmpApp);
            cp(join(bundleSource, "index.ios.bundle"), tmpAppBundle);
            cp("-R", join(bundleSource, "assets"), tmpAppBundle);

            // TODO: The port that nativeTemplate is inside of the binary, and this port is dynamic.
            // Since we might not run tests on parallel maybe set the runtime port to fixed
            execSync(`detox test --configuration ios.simulator`, {
                stdio: "inherit",
                env: { ...process.env, TEST_NATIVE_APP: tmpApp }
            });
        } else {
            execSync(`wdio ${join(__dirname, "../test-config/wdio.conf.js")}`, {
                stdio: "inherit",
                env: { ...process.env, URL: `http://localhost:${runtimePort}` }
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
