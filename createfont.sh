#!/bin/bash

ttx ./src/chromacheck.ttx
mv ./src/chromacheck.ttf .
sfnt2woff-zopfli chromacheck.ttf
openssl base64 -A -in chromacheck.woff -out chromacheck.base64
rm chromacheck.ttf
rm chromacheck.woff
