# ChromaCheck

ChromaCheck is a feature test to check if browsers support one of the four [color font formats](http://pixelambacht.nl/2014/multicolor-fonts/) when loaded as webfonts through `@font-face`. [See it in action here!](https://pixelambacht.nl/chromacheck)

## How it works

We test for color font support by rendering color glyphs to canvas, and then reading out the pixels to see if we have any color.

Firefox (on OSX?) has a bug that prevents color glyphs from being used on `canvas` with `fillText()`. This has been [fixed for locally installed fonts](https://bugzilla.mozilla.org/show_bug.cgi?id=1209480) but [still needs more fixin'](https://bugzilla.mozilla.org/show_bug.cgi?id=1237640) for fonts loaded through `@font-face`. ChromaCheck works around this by sticking the font in an SVG image, and then drawing that image on canvas.

## How to use

Include `chromacheck.min.js` in your page and it'll add classes to the `html` element for each supported color format:

* `chromacheck-svg` if there's support for SVG-in-OpenType.
* `chromacheck-colr` if there's support for COLR/CPAL.
* `chromacheck-sbix` if there's support for Apple SBIX.
* `chromacheck-cbdt` if there's support for CBDT/CBLC.

Take note that this test is async, so it can take a split millisecond before the classes are added.

## License

ChromaCheck is released under the [MIT license](https://github.com/RoelN/ChromaCheck/blob/master/LICENSE.md).
