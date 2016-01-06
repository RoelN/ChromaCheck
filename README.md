# ChromaCheck

This is a WIP project to find out if we can check for color font support.

## Tried so far:

- Paint on canvas, read color to see which glyph rendered. _Doesn't work, no color font support in canvas_
- Stick text in SVG, read that out somehow by "rasterizing" SVG. _First attemt didn't work_
- Different size color glyph. _Fails because original glyph dimensions are used, so color glyph will just run outside it's box without influencing anything._
- Leave out 'glyf' table so no glyph would be rendered, unless the browser supports it. Then measure the width to determine which of the two happened. (Doesn't work: no `glyf`, no glyph -- color or otherwise)

## Still to try:

- WebGL?
- Explore SVG options further

## Todo

- Optimize font (see Bram Stein's Nanofont and use pyftsubset), and compress to WOFF
- Add Google CBDT/CBLC table to test font
- Do I need a fancy build system for this? E.g. ttx --> ttf --> base64

## Observations, findings and nuggets of "hey, didn't know that"

TransType was used to create donor fonts where the SVG, COLR/CPAL and SBIX tables have been lifted from.

SBIX will position original glyph over the SBIX color image if they're both present!

Applying font to canvas: we get original fallback glyphs instead of (one of the) color formats. See: http://robert.ocallahan.org/2013/02/svg-in-opentype-new-approach-to-svg.html ("Fallback to regular OpenType glyph rendering for renderers that don't support SVG glyphs, and also if we need to obtain the outline of a glyph as a path (e.g. for <canvas> addText()).") So reading the canvas (like Typehelpers did for anti-aliasing) doesn't work!

Font styles will not be applied to `canvas` when the font is not also used in a normal element like a `div`. Also, it seems it only works when this is done with a normal `style` tag instead of the one injected with JavaScript. Note to self: investigate!

## Inspiration, hat-tips or previous work

- https://github.com/bramstein/nanofont
- https://github.com/RoelN/font-face-render-check
- http://www.useragentman.com/blog/2009/11/29/how-to-detect-font-smoothing-using-javascript/