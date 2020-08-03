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
wget -q https://cdn.mendix.com/runtime/mxbuild-${MENDIX_VERSION}.tar.gz -O /tmp/mxbuild.tar.gz
mkdir /tmp/mxbuild
tar xfz /tmp/mxbuild.tar.gz --directory /tmp/mxbuild
echo "Downloading and unzipping MX build done!"

# copy latest widget mpk to the mendix project
echo "Spinning up mxbuild..."
mono /tmp/mxbuild/modeler/mxbuild.exe -o /tmp/automation.mda --java-home="/usr/lib/jvm/jdk-11.0.2" --java-exe-path="/usr/lib/jvm/jdk-11.0.2/bin/java" --loose-version-check /source/mendixProject/*.mpr
echo "Spinning up mxbuild done!"
