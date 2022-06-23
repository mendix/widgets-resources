const { ANDROID_SDK_VERSION, ANDROID_DEVICE_TYPE } = require("../detox.config");
const { downloadFile, execCommand } = require("./helpers");

main().catch(e => {
    console.error(e);
    process.exit(-1);
});

async function main() {
    console.log("Downloading Android apps...");
    await Promise.all([
        downloadFile("https://www.dropbox.com/s/4hel4yki6vl1et5/app-detox-debug-androidTest.apk?dl=1"),
        downloadFile("https://www.dropbox.com/s/qu4z1kpy8abnyr3/app-detox-debug.apk?dl=1")
    ]);

    console.log(`Installing Android SDK version ${ANDROID_SDK_VERSION}...`);
    execCommand(`sdkmanager 'system-images;android-${ANDROID_SDK_VERSION};google_apis;x86_64'`);
    execCommand("sdkmanager --licenses");

    console.log("Creating Android emulator...");
    execCommand(
        `avdmanager -s create avd -n NATIVE_${ANDROID_DEVICE_TYPE}_${ANDROID_SDK_VERSION} -k 'system-images;android-${ANDROID_SDK_VERSION};google_apis;x86_64' -f -d '${ANDROID_DEVICE_TYPE}' -c 1000M`
    );

    console.log("Done!");
}
