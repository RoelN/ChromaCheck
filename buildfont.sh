#!/bin/bash

ttx ./src/chromacheck.ttx
ttx ./src/chromacheck-cbdt.ttx
mv ./src/chromacheck.ttf .
mv ./src/chromacheck-cbdt.ttf .
# sfnt2woff-zopfli compresses slightly better than ttx with zopfli
sfnt2woff-zopfli chromacheck.ttf
sfnt2woff-zopfli chromacheck-cbdt.ttf
openssl base64 -A -in chromacheck.woff -out chromacheck.base64
openssl base64 -A -in chromacheck-cbdt.woff -out chromacheck-cdbt.base64
rm chromacheck.ttf
rm chromacheck-cbdt.ttf
rm chromacheck.woff
rm chromacheck-cbdt.woff
