const { execSync } = require("child_process");
const findFreePort = require("find-free-port");
const {
    createWriteStream,
    promises: { access, readFile }
} = require("fs");
const fetch = require("node-fetch");
const { join } = require("path");
const semverCompare = require("semver/functions/rcompare");
const { cat, cp, ls, mkdir, rm, tempdir, touch } = require("shelljs");
const { pipeline } = require("stream");
const { promisify } = require("util");

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

    const nativePlatforms = process.env.TRAVIS === "true" ? "=android" : "";
    execSync(
        `docker run -t -v ${process.cwd()}:/source --rm mxbuild:${latestMendixVersion} bash -c "mx update-widgets --loose-version-check /source/${projectFile} && mxbuild ` +
            (isNativeEnabled
                ? `--native-packager --native-packager-platform${nativePlatforms} --disable-native-animations `
                : "") +
            `-o /tmp/automation.mda /source/${projectFile}"`,
        { stdio: "inherit" }
    );
    console.log("Bundle created and all the widgets are updated");

    let nativeApp;
    let runtimeContainerId;
    try {
        // Spin up the runtime and run testProject
        const runtimePort = await findFreePort(3000);
        runtimeContainerId = execSync(
            `docker run -td -v ${process.cwd()}:/source -v ${__dirname}:/shared:ro -w /source -p ${runtimePort}:8080 ` +
                `-u root -e MENDIX_VERSION=${latestMendixVersion} --entrypoint /bin/bash ` +
                `mendix/runtime-base:${latestMendixVersion}-rhel /shared/runtime.sh`
        ).toString();
        await waitForAvailability(`http://localhost:${runtimePort}`, "runtime");

        if (isNativeEnabled) {
            const nativeAppPaths = await downloadNativeApps();

            // Android starts
            mkdir("-p", "res/raw");
            touch("res/raw/runtime_url");
            execSync(`echo http://10.0.2.2:${runtimePort} > res/raw/runtime_url`);
            execSync(`zip -u ${nativeAppPaths.androidPath} res/raw/runtime_url`);

            mkdir("-p", "assets");
            cp(
                join(
                    process.cwd(),
                    "tests/testProject",
                    "deployment/native/bundle/android/assets/index.android.bundle"
                ),
                "assets"
            );

            execSync(`zip -ur ${nativeAppPaths.androidPath} assets`);
            execSync(`zip -ur ${nativeAppPaths.androidPath} res`);

            execSync(
                `echo android | $ANDROID_HOME/build-tools/$ANDROID_BUILD_TOOLS/apksigner sign --ks ../../tools/pluggable-widgets-tools/src/native/debug.keystore ${nativeAppPaths.androidPath}`
            );

            // Resign the binary because it needs to be signed with the same signer as real apk
            execSync(
                `echo android | $ANDROID_HOME/build-tools/$ANDROID_BUILD_TOOLS/apksigner sign --ks ../../tools/pluggable-widgets-tools/src/native/debug.keystore ${nativeAppPaths.androidTestBinaryPath}`
            );

            console.warn(nativeAppPaths.androidPath);
            execSync(`export TEST_NATIVE_APP_ANDROID=${nativeAppPaths.androidPath}`);
            execSync(`export TEST_NATIVE_APP_ANDROID_TEST_BINARY=${nativeAppPaths.androidTestBinaryPath}`);

            // Android ends

            execSync(`detox test --configuration android`, {
                stdio: "inherit",
                env: {
                    ...process.env,
                    TEST_NATIVE_APP_ANDROID: nativeAppPaths.androidPath,
                    TEST_NATIVE_APP_ANDROID_TEST_BINARY: nativeAppPaths.androidTestBinaryPath
                }
            });

            // Execute ios detox
            if (!process.env.TRAVIS) {
                // IOS jungling starts
                const appBundle = join(nativeAppPaths.iosPath, "Bundle/");
                const bundleSource = join(process.cwd(), "tests/testProject", "deployment/native/bundle/iOS/");

                cp(join(bundleSource, "index.ios.bundle"), appBundle);
                cp("-R", join(bundleSource, "assets"), appBundle);
                execSync(
                    `defaults write ${join(
                        nativeAppPaths.iosPath,
                        "Info"
                    )} "Runtime url" 'http://localhost:${runtimePort}'`
                );
                // IOS jungling ends

                execSync(`detox test --configuration ios.simulator`, {
                    stdio: "inherit",
                    env: { ...process.env, TEST_NATIVE_APP_IOS: nativeAppPaths.iosPath }
                });
            }
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
            // execSync(`docker rm -f ${runtimeContainerId.trim()}`);
        }
        if (nativeApp) {
            // rm("-f", nativeApp);
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

async function downloadArchive(BASE_URL, latestReleaseVersion, destination) {
    const downloadedArchivePath = join(tempdir(), `${Math.round(Math.random() * 10000)}_${destination}`);
    const nativeTemplateUrl = `${BASE_URL}/${latestReleaseVersion}/${destination}`;

    await promisify(pipeline)((await fetch(nativeTemplateUrl)).body, createWriteStream(downloadedArchivePath));

    return downloadedArchivePath;
}

async function downloadNativeApps() {
    const BASE_URL = "https://github.com/mendix/travisNativeTemplateBuilder";
    const DETOX_APK = "app-appstore-debug-androidTest.apk";
    const ANDROID_APK = "app-appstore-debug.apk";
    const IOS_IPA = "NativeTemplate.zip";

    const latestReleaseVersion = execSync(
        `git -c 'versionsort.suffix=-' ls-remote --exit-code --refs --sort='version:refname' --tags ${BASE_URL} '*.*.*'  | tail -n 1 | cut -d "/" -f 3`
    )
        .toString()
        .trim();
    const iosPath = await downloadArchive(BASE_URL + "/releases/download", latestReleaseVersion, IOS_IPA);
    const androidTestBinaryPath = await downloadArchive(
        BASE_URL + "/releases/download",
        latestReleaseVersion,
        DETOX_APK
    );
    const androidPath = await downloadArchive(BASE_URL + "/releases/download", latestReleaseVersion, ANDROID_APK);

    const appSource = join(tempdir(), `nativeApp_${Math.round(Math.random() * 10000)}`);

    // Unzip ios zip to get .app
    execSync(`unzip -q ${iosPath} -d ${appSource}`);

    return { iosPath: join(appSource, "NativeTemplate.app"), androidPath, androidTestBinaryPath };
}
