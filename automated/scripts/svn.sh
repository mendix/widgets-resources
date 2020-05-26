#!/bin/sh
set -e

echo "Checking out sprinter project..."
rm -rf /source/mendixProject
mkdir /source/mendixProject
cd /source/mendixProject

svn checkout --quiet --username "$SPRINTR_USERNAME" --password "$SPRINTR_PASSWORD" https://teamserver.sprintr.com/1403e444-c23e-41c7-ad7f-33ba234fccee/branches/nightly
echo "Checking out sprinter project done!"

touch /tmp/done.pid
while :; do sleep 15; done
