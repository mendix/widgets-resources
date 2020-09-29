#!/bin/sh
set -e

echo "Installing runtime dependencies..."
microdnf install unzip tar python2 > /dev/null
alternatives --set python /usr/bin/python2
rpm --install --quiet --nodeps https://packages.mendix.com/platform/rpm/m2ee-tools-7.0.1-1.el7.noarch.rpm
pip2 install -q PyYAML httplib2

mkdir /opt/mendix/${MENDIX_VERSION}
mv /opt/mendix/runtime /opt/mendix/${MENDIX_VERSION}/
echo "Installing runtime dependencies done!"

## Do the yml tricks start

if [ "${NATIVE_ENABLED}" = "true" ]; then
  cp shared/m2eeNative.yaml /tmp/m2ee.yaml
  echo "We have native enabled"
  sed -i 's/__PACKAGER_PORT__/'"${PACKAGER_PORT}"'/g' /tmp/m2ee.yaml
  echo /tmp/m2ee.yaml
fi

## Do the yml tricks end

echo "Starting runtime..."
# printf is needed to issue "create database" command that is not available via CLI
printf "c\nc\n" | m2ee -c /tmp/m2ee.yml --yolo start
echo "Starting runtime done!"

while :; do sleep 15; done
echo "Runtime container exiting now"
