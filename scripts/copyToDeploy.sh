#!/bin/bash

cd "$(dirname "$0")"
cd ../../
rm -rf tenebrie.github.io/exether-locmines/
cp -r exether-loc-mines/dist/ tenebrie.github.io/exether-locmines/