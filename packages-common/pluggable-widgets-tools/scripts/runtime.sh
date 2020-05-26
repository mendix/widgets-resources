#!/bin/sh
set -e

echo "Installing runtime dependencies..."
apt-get -qq update
apt-get -qq install -y wget gnupg
wget -q -O - https://packages.mendix.com/mendix-debian-archive-key.asc | apt-key add -
echo "deb http://packages.mendix.com/platform/debian/ buster main contrib non-free" | tee /etc/apt/sources.list.d/m2ee.list

apt-get -qq update
apt-get -qq install -y m2ee-tools
mkdir /opt/mendix/${MENDIX_VERSION}
mv /opt/mendix/runtime /opt/mendix/${MENDIX_VERSION}/
echo "Installing runtime dependencies done!"

echo "Starting runtime..."
# printf is needed to issue "create database" command that is not available via CLI
printf "c\nc\n" | m2ee -c /shared/m2ee.yml --yolo start
echo "Starting runtime done!"

while :; do sleep 15; done
echo "Runtime container exiting now"
