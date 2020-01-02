#!/bin/bash -e

if [[ "$TRAVIS" != "true" ]]; then
    # Approve unapproved SDK licenses
    yes | $ANDROID_HOME/tools/bin/sdkmanager --licenses
fi

### Wait for emulator
if [[ "$TRAVIS" == "true" ]]; then
    $(dirname "$0")/ci.android-waitforemulator.sh
fi

npm run test:android
