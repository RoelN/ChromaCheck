# ChromaCheck

This is a WIP project to find out if we can check for color font support. We do this by rendering our color glyphs to canvas, and then read out the pixels to see if we have any color pixels.

## Text on canvas

Use `fillText()` to render text to canvas.

*Safari* on OSX renders color glyphs :)

*Firefox* doesn't render any color glyphs. For Firefox 41 and up this is expected ([there is a bug in Skia that prevents color glyphs from being rendered](https://bugzilla.mozilla.org/show_bug.cgi?id=1209480)). Problem is, in Firefox 46 (current nightly), this is fixed and color fonts installed on OS work fine, but loaded through `@font-face` don't.

*Chrome/Opera* doesn't render any color glyphs. This is not a bug, Chrome doesn't support any color font format.

## Text in SVG, rendered to Canvas

To avoid problems with `fillText()` we can also render an SVG _with the testfont embedded_ to `canvas`.

*Safari* renders nothing at all.

*Firefox* renders color glyphs :)

*Chrome/Opera* doesn't render any color glyphs. This is not a bug, Chrome doesn't support any color font format.

## Todo

- Test IE/EDGE on Windows
- Put HTML with the test font applied in an SVG `foreighObject`
- Add a control character to the test font to make 100% sure the font is rendered
- Avoid the `setTimeout` hack with the `fillText()` method
- Add Google CBDT/CBLC table to test font
- Move back to WOFF for the format of the test font (it's TTF now)
- Color glyph not rendering in Firefox 46 is a bug, report it as such
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