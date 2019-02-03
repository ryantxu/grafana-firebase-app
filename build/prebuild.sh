#!/bin/bash

# install npm modules
echo "Installing NPM modules with yarn"
yarn install
echo "Ensure Grafana source available"

TARGETDIR='node_modules/grafana_master'

if [ ! -d $TARGETDIR ]; then
  echo "Cloning Grafana source into $TARGETDIR"
  git clone https://github.com/grafana/grafana.git --depth 1 $TARGETDIR
else
  echo "Source for Grafana already present, skipping..."
fi
