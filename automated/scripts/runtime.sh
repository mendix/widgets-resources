#!/bin/sh
set -e

ls /source/mxbuild/

echo "Installing runtime dependencies..."
apt-get -qq update
apt-get -qq install -y wget gnupg
wget -q -O - https://packages.mendix.com/mendix-debian-archive-key.asc | apt-key add -
echo "deb http://packages.mendix.com/platform/debian/ buster main contrib non-free" | tee /etc/apt/sources.list.d/m2ee.list

apt-get -qq update
apt-get -qq install -y m2ee-tools
echo "Installing runtime dependencies done!"

export PROJECT_DIR=/source/mendixProject/nightly

cp /source/m2ee.yml /tmp
sed -i s!\$PROJECT_DIR!$PROJECT_DIR! /tmp/m2ee.yml

rm -rf /source/runtime
mkdir /source/runtime
m2ee -c /tmp/m2ee.yml download_runtime

echo "Starting runtime..."
# printf is needed to issue "create database" command that is not available via CLI
printf "c\nc\n" | m2ee -c /tmp/m2ee.yml --yolo start
echo "Starting runtime done!"

while :; do sleep 15; done
echo "Runtime container exiting now"
