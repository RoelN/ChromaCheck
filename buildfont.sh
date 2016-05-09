#!/bin/bash

ttx -b ./src/chromacheck*.ttx
# sfnt2woff-zopfli compresses slightly better than ttx with zopfli
sfnt2woff-zopfli ./src/chromacheck-cbdt.ttf
sfnt2woff-zopfli ./src/chromacheck-colr.ttf
sfnt2woff-zopfli ./src/chromacheck-sbix.ttf
sfnt2woff-zopfli ./src/chromacheck-svg.ttf
openssl base64 -A -in ./src/chromacheck-cbdt.woff -out chromacheck-cdbt.base64
openssl base64 -A -in ./src/chromacheck-colr.woff -out chromacheck-colr.base64
openssl base64 -A -in ./src/chromacheck-sbix.woff -out chromacheck-sbix.base64
openssl base64 -A -in ./src/chromacheck-svg.woff -out chromacheck-svg.base64
rm ./src/chromacheck*.ttf
rm ./src/chromacheck*.woff
