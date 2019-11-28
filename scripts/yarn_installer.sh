#!/bin/bash
set -eu

curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -

curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -

echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

apt-get update && apt-get install apt-transport-https && apt-get install -y nodejs && apt-get install yarn -yqq
