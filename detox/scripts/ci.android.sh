#!/bin/bash -e

### Wait for emulator
if [[ "$TRAVIS" == "true" ]]; then
    $(dirname "$0")/ci.android-waitforemulator.sh
fi

npm run test:android
