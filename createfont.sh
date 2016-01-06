#!/bin/bash

ttx ./src/*.ttx
mv ./src/*.ttf .
# sfnt2woff-zopfli doesn't take wildcards, so stick with ttf for testing
# sfnt2woff-zopfli *.ttf
# rm *.ttf
