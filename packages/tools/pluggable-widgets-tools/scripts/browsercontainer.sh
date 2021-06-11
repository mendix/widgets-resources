#!/bin/sh
set -e

echo "Starting custom script to forward 8080 port to localhost..."
sudo apt-get -qqy update
sudo apt-get -qqy install iptables
sudo sysctl -w net.ipv4.conf.all.route_localnet=1
sudo iptables -t nat -A OUTPUT -m addrtype --src-type LOCAL --dst-type LOCAL -p tcp --dport 8080 -j DNAT --to-destination 192.168.10.2
sudo iptables -t nat -A POSTROUTING -m addrtype --src-type LOCAL --dst-type UNICAST -j MASQUERADE
echo "Finished successfully"
