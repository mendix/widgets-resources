#!/bin/bash

# pull app repo


echo "Checking iOS prerequisites"
if [[ $OSTYPE != 'darwin'* ]] &> /dev/null
then
    echo "Can only install iOS software on OS X"
fi

if ! command -v brew &> /dev/null
then
    echo "The 'brew' command could not be found. Make sure brew is installed."
    exit
fi

echo "Installing xcode-select"
xcode-select --install

echo "Installing simutils"
brew tap wix/brew && brew install applesimutils