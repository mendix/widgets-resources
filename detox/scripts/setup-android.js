const { ANDROID_SDK_VERSION, ANDROID_DEVICE_TYPE } = require("../detox.config");
const { execSync } = require("child_process");

main().catch(e => {
    console.error(e);
    process.exit(-1);
});

async function main() {
    console.log(`Installing Android SDK version ${ANDROID_SDK_VERSION}...`);
    execSync(`sdkmanager 'system-images;android-${ANDROID_SDK_VERSION};default;x86_64'`);
    execSync("sdkmanager --licenses");

    console.log("Creating Android emulator...");
    execSync(
        `avdmanager -s create avd -n NATIVE_${ANDROID_DEVICE_TYPE}_${ANDROID_SDK_VERSION} -k 'system-images;android-${ANDROID_SDK_VERSION};default;x86_64' -f -d '${ANDROID_DEVICE_TYPE}' -c 1000M`
    );

    console.log("Done!");
}
