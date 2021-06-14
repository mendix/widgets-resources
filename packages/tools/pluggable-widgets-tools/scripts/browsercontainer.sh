#!/bin/sh
set -e

echo "Starting custom script to forward 8080 port to localhost..."
sudo apt-get -qqy update
sudo apt-get -qqy install ssh openssh-server sshpass
sudo /etc/init.d/ssh start
sshpass -p secret ssh -f -C -N -o "StrictHostKeyChecking no" -L 127.0.0.1:8080:192.168.10.2:8080 localhost
echo "Finished successfully"
