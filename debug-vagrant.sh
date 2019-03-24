#!/bin/bash
if [[ $EUID -ne 0 ]]; then
  echo "You must be a root user" 2>&1
  exit 1
else
  mkdir -p ../env/home/vagrant/mpu
  mount --bind ../mpu ../env/home/vagrant/mpu
  makerboard run ../env
  echo "umount"
  umount ../env/home/vagrant/mpu
fi