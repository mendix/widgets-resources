#!/bin/bash
set -e

echo "Installing dependencies..."
apt-get -qq update
apt-get -qq install -y wget
wget -q https://download.java.net/java/GA/jdk11/9/GPL/openjdk-11.0.2_linux-x64_bin.tar.gz -O /tmp/openjdk.tar.gz
mkdir /usr/lib/jvm
tar xfz /tmp/openjdk.tar.gz --directory /usr/lib/jvm
echo "Installing dependencies done!"

echo "Downloading and unzipping MX build..."
wget -q https://cdn.mendix.com/runtime/mxbuild-8.9.0.5487.tar.gz -O /tmp/mxbuild.tar.gz
mkdir /source/mxbuild
tar xfz /tmp/mxbuild.tar.gz --directory /source/mxbuild
echo "Downloading and unzipping MX build done!"

# copy latest widget mpk to the mendix project
echo "Spinning up mxbuild..."
mono /source/mxbuild/modeler/mxbuild.exe  --java-home="/usr/lib/jvm/jdk-11.0.2" --java-exe-path="/usr/lib/jvm/jdk-11.0.2/bin/java" --loose-version-check "/source/mendixProject/nightly/Badge.mpr"
echo "Spinning up mxbuild done!"

echo Done!
touch /tmp/deploy.pid
echo pwd

while :; do sleep 15; done
