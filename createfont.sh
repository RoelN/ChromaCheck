#!/bin/bash

ttx ./src/colorfontsupport.ttx
mv ./src/colorfontsupport.ttf .
sfnt2woff-zopfli colorfontsupport.ttf
openssl base64 -A -in colorfontsupport.woff -out colorfontsupport.base64
rm colorfontsupport.ttf
rm colorfontsupport.woff
