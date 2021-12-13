#!/bin/bash
# If you are getting any errors regarding XMLschemas, check here:
# https://stackoverflow.com/questions/46402772/failed-to-install-android-sdk-java-lang-noclassdeffounderror-javax-xml-bind-a

# pull app repo


ANDROID_VERSION=31

echo "Checking Android prerequisites"
if ! command -v sdkmanager &> /dev/null
then
    echo "The 'sdkmanager' could not be found. Make sure it is availabe in your path."
    exit
fi
if ! command -v avdmanager &> /dev/null
then
    echo "The 'avdmanager' could not be found. Make sure it is availabe in your path."
    exit
fi

echo "Installing Android SDK"
sdkmanager 'system-images;android-'${ANDROID_VERSION}';google_apis;x86_64'
sdkmanager --licenses

echo "Creating Android Device"
avdmanager -s create avd -n NATIVE_CONTENT_EMULATOR -k 'system-images;android-'${ANDROID_VERSION}';google_apis;x86_64' -f -d '5.4in FWVGA' -c 1000M
