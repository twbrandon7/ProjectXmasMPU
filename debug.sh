#!/bin/bash
if [[ $EUID -ne 0 ]]; then
  echo "You must be a root user" 2>&1
  exit 1
else
  mkdir -p ./env/home/clx/mpu
  mount --bind ../mpu ./env/home/clx/mpu
  makerboard run ./env
  echo "umount"
  umount ./env/home/clx/mpu
fi