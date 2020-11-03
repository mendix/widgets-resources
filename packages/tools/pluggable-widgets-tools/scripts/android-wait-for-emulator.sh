#!/bin/bash

# Originally written by Ralf Kistner <ralf@embarkmobile.com>, but placed in the public domain

set +e

bootanim=""
keyevent="INIT"
failcounter=0
timeout_in_sec=300 # 5 minutes

until [[ "$keyevent" =~ "done" ]]; do
  keyevent=`adb shell input keyevent 82 &`
  if [[ "$keyevent" =~ "no devices/emulators found" || "$keyevent" =~ "no emulators found" || "$keyevent" =~ "running" || "$keyevent" =~  "error: no emulators found" ]]; then
    let "failcounter += 1"
    bootanim=`adb -e shell getprop init.svc.bootanim 2>&1 &`
    echo "Waiting for emulator to start, device is currently '($bootanim)'"
    if [[ $failcounter -gt timeout_in_sec ]]; then
      echo "Timeout ($timeout_in_sec seconds) reached; failed to start emulator"
      exit 1
    fi
  fi
  echo " "
  sleep 1
done

echo "Emulator is ready '($bootanim)'"
echo "Key event result '(keyevent)'"
