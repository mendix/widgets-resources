#!/bin/bash
set -ex

wget -q "$ANDROID_TOOLS_URL" -O android-sdk-tools.zip
unzip -q android-sdk-tools.zip -d "$ANDROID_HOME"
rm android-sdk-tools.zip
mkdir "$HOME"/.android
touch "$HOME"/.android/repositories.cfg
echo y | sdkmanager --licenses >/dev/null

echo y | sdkmanager --no_https "platform-tools" >/dev/null # adb logcat fastboot
echo y | sdkmanager --no_https "tools" >/dev/null #  avdmanager, sdkmanager
echo y | sdkmanager --no_https "build-tools;${ANDROID_BUILD_TOOLS}" >/dev/null # apksigner is needed
echo y | sdkmanager --no_https "platforms;android-${COMPILE_API}" >/dev/null # actual image

echo Finished installing packages

