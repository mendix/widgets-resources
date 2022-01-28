#!/bin/sh
set -e

echo "Starting runtime..."
# printf is needed to issue "create database" command that is not available via CLI
printf "c\nc\n" | m2ee -c /shared/m2ee.yml --yolo start
echo "Starting runtime done!"

# keep docker container alive
while true
do
  tail -f /dev/null & wait ${!}
done
echo "Runtime container exiting now"
