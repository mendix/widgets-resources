#!/bin/sh
set -e

echo "Starting runtime..."
# printf is needed to issue "create database" command that is not available via CLI
printf "c\nc\n" | m2ee -c /shared/m2ee.yml --yolo start
echo "Starting runtime done!"

while :; do sleep 15; done
echo "Runtime container exiting now"
