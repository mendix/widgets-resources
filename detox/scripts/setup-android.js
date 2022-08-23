const { ANDROID_SDK_VERSION, ANDROID_DEVICE_TYPE } = require("../detox.config");
const { downloadFile, execCommand } = require("./helpers");

main().catch(e => {
    console.error(e);
    process.exit(-1);
});

async function main() {
    console.log(`Installing Android SDK version ${ANDROID_SDK_VERSION}...`);
    execCommand(`sdkmanager 'system-images;android-${ANDROID_SDK_VERSION};aosp_atd;x86'`);
    execCommand("sdkmanager --licenses");

    console.log("Creating Android emulator...");
    execCommand(
        `avdmanager -s create avd -n NATIVE_${ANDROID_DEVICE_TYPE}_${ANDROID_SDK_VERSION} -k 'system-images;android-${ANDROID_SDK_VERSION};aosp_atd;x86' -f -d '${ANDROID_DEVICE_TYPE}' -c 1000M`
    );

    console.log("Done!");
}
