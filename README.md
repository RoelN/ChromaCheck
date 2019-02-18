# ChromaCheck

ChromaCheck is a feature test to check if browsers support one of the four [color font formats](http://pixelambacht.nl/2014/multicolor-fonts/) when loaded as webfonts through `@font-face`. [See it in action here!](https://pixelambacht.nl/chromacheck)

**Please note that ChromaCheck currently [doesn't work for Edge 18+](https://github.com/RoelN/ChromaCheck/issues/40) :-(**

## How it works

We test for color font support by rendering color glyphs to canvas, and then reading out the pixels to see if we have any color.

Older versions of Firefox, the first browser to support color fonts, had [some](https://bugzilla.mozilla.org/show_bug.cgi?id=1209480) [bugs](https://bugzilla.mozilla.org/show_bug.cgi?id=1237640) that needed to be circumvented. This was done by sticking the font in an SVG image, and then drawing that image on canvas. This is how ChromaCheck still works today.

## How to use

Include `chromacheck-min.js` in your page and it'll add classes to the `html` element for each supported color format:

* `chromacheck-svg` if there's support for OpenType-SVG.
* `chromacheck-colr` if there's support for COLR.
* `chromacheck-sbix` if there's support for SBIX.
* `chromacheck-cbdt` if there's support for CBDT/CBLC.

Take note that this test is async, so it can take a split millisecond before the classes are added.

## Known issues

* IE11 on Windows 8 will report false negatives because of [a bug in drawing SVG to canvas in IE11](https://connect.microsoft.com/IE/feedback/details/809823/draw-svg-image-on-canvas-context).
* IE10 in Windows 8 will report false negatives because of a very strict security measure when [drawing SVG to canvas](https://github.com/RoelN/ChromaCheck/issues/32).
* CBDT/CBLC might be reported as not being supported, because ChromaCheck checks for the implementation as described by the spec. A few implementations in the wild, specifically Chrome on Android, do support CBDT/CBLC, but only when implemented with the specs during the _proposal phase_ instead of the final specs. [More info.](https://github.com/RoelN/ChromaCheck/issues/8)

The SVG-on-canvas method might be replaced or extended with a non-SVG method to address the SVG related issues. Likewise it'd be possible to include two CBDT/CBLC fonts to test with: one on the old specs, one one the new. If you have a need for that right now, check out the `feature/regular-test-page` branch.

## License

ChromaCheck is released under the [MIT license](https://github.com/RoelN/ChromaCheck/blob/master/LICENSE.md).
