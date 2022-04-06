const { ANDROID_SDK_VERSION, ANDROID_DEVICE_TYPE } = require("../detox.config");
const { downloadFile, execCommand } = require("./helpers");
const { execSync } = require("child_process");

main().catch(e => {
    console.error(e);
    process.exit(-1);
});

async function main() {
    console.log("Downloading Android apps...");
    await Promise.all([
        downloadFile("https://www.dropbox.com/s/3m4i4tiflncvriw/app-debug-androidTest.apk?dl=1"),
        downloadFile("https://www.dropbox.com/s/wrhcm3ff316itip/app-debug.apk?dl=1")
    ]);

    console.log(`Installing Android SDK version ${ANDROID_SDK_VERSION}...`);
    execCommand(`sdkmanager 'system-images;android-${ANDROID_SDK_VERSION};google_apis;x86_64'`);
    execCommand("sdkmanager --licenses");

    console.log("Creating Android emulator...");
    const emulatorName = `NATIVE_${ANDROID_DEVICE_TYPE}_${ANDROID_SDK_VERSION}`;
    execCommand(
        `avdmanager -s create avd -n ${emulatorName} -k 'system-images;android-${ANDROID_SDK_VERSION};google_apis;x86_64' -f -d '${ANDROID_DEVICE_TYPE}' -c 1000M`
    );

    // inspired by https://github.com/edvinasbartkus/react-native-detox-github-actions/blob/master/.github/workflows/android.yml
    if (process.env.CI) {
        console.log("Attempting to manually start emulator...");
        execSync(
            `nohup $ANDROID_HOME/emulator/emulator -avd ${emulatorName} -no-audio -no-snapshot -no-window &
            $ANDROID_HOME/platform-tools/adb wait-for-device shell 'while [[ -z $(getprop sys.boot_completed | tr -d '\\r') ]]; do sleep 1; done; input keyevent 82' $ANDROID_HOME/platform-tools/adb devices`
        );
        console.log("Started emulator!");
    }

    console.log("Android setup done!");
}
