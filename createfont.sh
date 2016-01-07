#!/bin/bash

ttx ./src/colorfontsupport.ttx
mv ./src/colorfontsupport.ttf .
# sfnt2woff-zopfli colorfontsupport.ttf
openssl base64 -A -in colorfontsupport.ttf -out colorfontsupport.base64
rm *.ttf
