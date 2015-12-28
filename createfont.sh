#!/bin/bash

ttx ./src/colorfontsupport.ttx
mv ./src/colorfontsupport.ttf colorfontsupport.ttf
sfnt2woff-zopfli colorfontsupport.ttf
rm colorfontsupport.ttf
