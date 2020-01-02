#!/bin/bash -e

if [[ "$TRAVIS" != "true" ]]; then
    # Approve unapproved SDK licenses
    yes | $ANDROID_HOME/tools/bin/sdkmanager --licenses
fi

### Wait for emulator
if [[ "$TRAVIS" == "true" ]]; then
    run_f "$(dirname "$0")/ci.android-waitforemulator.sh"
fi

### Run e2e's
pushd detox/test
run_f "npm run test:android"
# run_f "npm run verify-artifacts:android"
popd
