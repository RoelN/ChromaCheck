# ChromaCheck

ChromaCheck is a feature test to check if browsers support one of the four [color font formats](http://pixelambacht.nl/2014/multicolor-fonts/) when loaded as webfonts through `@font-face`. [See it in action here!](https://pixelambacht.nl/chromacheck)

## How it works

We test for color font support by rendering color glyphs to canvas, and then reading out the pixels to see if we have any color.

Firefox (on OSX?) has a bug that prevents color glyphs from being used on `canvas` with `fillText()`. This has been [fixed for locally installed fonts](https://bugzilla.mozilla.org/show_bug.cgi?id=1209480) but [still needs more fixin'](https://bugzilla.mozilla.org/show_bug.cgi?id=1237640) for fonts loaded through `@font-face`. ChromaCheck works around this by sticking the font in an SVG image, and then drawing that image on canvas.

## How to use

Include `chromacheck-min.js` in your page and it'll add classes to the `html` element for each supported color format:

* `chromacheck-svg` if there's support for SVG-in-OpenType.
* `chromacheck-colr` if there's support for COLR/CPAL.
* `chromacheck-sbix` if there's support for Apple SBIX.
* `chromacheck-cbdt` if there's support for CBDT/CBLC.

Take note that this test is async, so it can take a split millisecond before the classes are added.

## Known issues

* Safari will not load the fonts on first load, only on subsequent pageloads 😱(Working on a fix!)
* IE11 on Windows 8 will report false negatives because of [a bug in drawing SVG to canvas in IE11](https://connect.microsoft.com/IE/feedback/details/809823/draw-svg-image-on-canvas-context).
* IE10 in Windows 8 will report false negatives because of a very strict security measure when [drawing SVG to canvas](https://github.com/RoelN/ChromaCheck/issues/32).
* CBDT/CBLC might be reported as not being supported, because ChromaCheck checks for the implementation as described by the spec. A few implementations in the wild, specifically Chrome on Android, do support CBDT/CBLC, but only when implemented with the specs during the proposal fase instead of the final specs. [More info.](https://github.com/RoelN/ChromaCheck/issues/8)

The SVG-on-canvas method might be replaced or extended with a non-SVG method to address the SVG related issues. Likewise it'd be possible to include two CBDT/CBLC fonts to test with: one on the old specs, one one the new.

## License

ChromaCheck is released under the [MIT license](https://github.com/RoelN/ChromaCheck/blob/master/LICENSE.md).
