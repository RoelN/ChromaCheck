# ChromaCheck

**This stuff is still in progress! :)** Feature test to check if browsers support one of the [color font formats](http://pixelambacht.nl/2014/multicolor-fonts/).

## How it works

We test for color font support by rendering color glyphs to canvas, and then readinh out the pixels to see if we have any color. Due to a bug in the current versions of Firefox (41 till 46, at least, see [here](https://bugzilla.mozilla.org/show_bug.cgi?id=1209480) and [here](https://bugzilla.mozilla.org/show_bug.cgi?id=1237640)), we don't use `fillText()` but stick our font in an SVG image.

## Todo

- Add Google CBDT/CBLC table to test font
- Move back to WOFF for the format of the test font (it's TTF now)
- Optimize font (see Bram Stein's Nanofont and use pyftsubset), and compress to WOFF

## Observations, findings and nuggets of "hey, didn't know that"

TransType was used to create donor fonts where the SVG, COLR/CPAL and SBIX tables have been lifted from.

SBIX will position original glyph over the SBIX color image if they're both present!

Applying font to canvas: we get original fallback glyphs instead of (one of the) color formats. See: http://robert.ocallahan.org/2013/02/svg-in-opentype-new-approach-to-svg.html ("Fallback to regular OpenType glyph rendering for renderers that don't support SVG glyphs, and also if we need to obtain the outline of a glyph as a path (e.g. for <canvas> addText()).") So reading the canvas (like Typehelpers did for anti-aliasing) doesn't work!

Font styles will not be applied to `canvas` when the font is not also used in another element like a `div`. This is because when we draw text with fillText(), the font hasn't loaded yet so it'll use a fallback font.

Both [WordPress](https://core.trac.wordpress.org/browser/trunk/src/wp-includes/js/wp-emoji-loader.js) and [Modernizr](https://github.com/Modernizr/Modernizr/blob/master/feature-detects/emoji.js) check for emoji support, regardless if it's the normal or color variant. They're both broken in Firefox because of [this bug](https://bugzilla.mozilla.org/show_bug.cgi?id=1209480).

## Inspiration, hat-tips or previous work

- https://github.com/bramstein/nanofont
- https://github.com/RoelN/font-face-render-check
- http://www.useragentman.com/blog/2009/11/29/how-to-detect-font-smoothing-using-javascript/