/**
 * ChromaCheck 1.1
 * @author Roel Nieskens, https://pixelambacht.nl
 * MIT license
 */
(function(){
  var root = document.documentElement,
      cls = 'chromacheck-',
      runs = 20,
      loop;

  // Stick SVG on canvas and check control glyph to see if font rendered
  function checkFontLoad() {
    context.drawImage(img, 0, 0);

    if(context.getImageData(10, 10, 1, 1).data[0] === 0) {
      clearInterval(loop);
      colorGlyphTest();
    } else if(--runs <= 0) {
      clearInterval(loop);
      checkFailed();
    }
  }

  // Font loaded, now check for which color glyphs we see
  function colorGlyphTest() {
    var res = {};
    res.cbdt = context.getImageData(10, 30, 1, 1).data[0] === 100; // CBDT/CBLC
    res.svg  = context.getImageData(10, 50, 1, 1).data[0] === 50;  // SVG-in-OpenType
    res.sbix = context.getImageData(10, 70, 1, 1).data[0] === 150; // SBIX
    res.colr = context.getImageData(10, 90, 1, 1).data[0] === 200; // COLR/CPAL

    // Add class to HTML tag for each supported color format
    for (var key in res) {
      if (res.hasOwnProperty(key)) {
        root.className += res[key] ? ' '+cls+key : '';
      }
    }
  }

  // Font, SVG, or canvas failed
  function checkFailed() {
    root.className += ' '+cls+'failed';
  }

  try {
    var canvas = document.createElement('canvas'),
        context = canvas.getContext('2d'),
        img = new Image()
        font = 'd09GRgABAAAAAARMAA4AAAAABUwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABDT0xSAAACrAAAABcAAAAYAAIAJkNQQUwAAALEAAAAEgAAABLJAAAQT1MvMgAAAawAAAA6AAAAYBfxJ05TVkcgAAAC2AAAANEAAAFI9kJ3MmNtYXAAAAH0AAAALgAAADTpG+k+Z2x5ZgAAAjQAAAAmAAAAODNTND5oZWFkAAABRAAAAC8AAAA2CRHx7GhoZWEAAAF0AAAAFQAAACQIAQQCaG10eAAAAegAAAALAAAADgQAAABsb2NhAAACJAAAAA4AAAAOADYAGm1heHAAAAGMAAAAHQAAACACEgAebmFtZQAAAlwAAABDAAAATgSgDQdwb3N0AAACoAAAAAwAAAAgAAMAAHNiaXgAAAOsAAAAngAAARQlRrNFeAFjYGRgAOF3mWnn4/ltvjJIszCAwKUFTAIg+rLzqvsgmoUBLM7BwASiABocCIIAeAFjYGRgYGEAAjgJFEEFjAABkQAQAAAAeAFjYGRgYGBjYAXTDFCSi4GBiYFBAsQEAAJ8ADMAAAB4AWNgYWFgnMDAysDANJPpDAMDQz+EZnzNYMzIyYAKGAWQOApAwHDgJcNLoAkgACTRgQIDAwAATgh4AAB4AWNhQAYAAEYABQB4ARXFsQGAIAwAsABtJ3de8P+v+oSiWYJhGbiEGyUMs2fH+9L+99zDAA6gHAgnAAAAAAAAAA0ADQANAA0AHAAAeAFjYGQAAhYgZGBmYBBUFFRkYfjDAMJIMiwQGUGoFIgPAGvzBPcAAHgBLcZVAYQAAECxd4aEQCIQASlABNzd26P3tQFvVD68vjIvDPj/fd8lZyOmwqImwCckY0LHOR1oqfHvx4SUBwCGCbAAeAFjYGbACwAAfQAEeAFjYGBgBGI+IBYBsphAfJAIAAJEACkAAAAAAQABAAEAAAAOAAAAAMj/AAB4AW0PhU5DMfCREEG/4XK49opbtyixEcOJzfsaKm++9/dUcDh3yQLMRzmTzXrMsmVv0lV1ajSMO/2BclYg3yeEjm25trJS4P3d9d4ZVivzEOFqMJbg6+1AYD4cFheMTSaT/cnhvutLdkBEzFdgKrmYamVf/yvk5+fnLGbx+2aOoNoCpS6L/AjjzrRVwrDfsIOu6xuBg1ZDdzb57h7f+lbjq4rGMIeu0lrgyuEBeUDw424IOB0cQS3KbyZBjZKI7od+QWDfdjP5+Xz4rfIGMJ9QpgAAAHgBY2AEQgYw5mHUYfAA0gqomJEDjoGgIC9doTPAz52XS4oLyOX19HAJAsrpgDAHM1DEb3GdO5CSLHGNKAnOTyspTyxKZXBMyU9KVfDMTUxPDUpNTKksPJlqA1TEFuAT4jqNAQTyInwmgoz3dHEMqbj15iAjyEVNCv/X53k4AJm0AB/ymHgYEk4zMFpMqxIBCXi6+rmsc0poAgDaiyZIAAA=',
        fontCBDT = 'd09GRgABAAAAAAKoAAoAAAAAAuwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABDQkRUAAACGAAAAGAAAABlKWauy0NCTEMAAAJ4AAAALQAAAFDwVcDTT1MvMgAAAVgAAAA6AAAAYBf0J01jbWFwAAABnAAAACcAAAAsAAzpNmhlYWQAAAD0AAAALwAAADYJEe9yaGhlYQAAASQAAAAVAAAAJAgBBAJobXR4AAABlAAAAAYAAAAGBAAAAG1heHAAAAE8AAAAGwAAACACDgAebmFtZQAAAcQAAABHAAAAWAUnDdFwb3N0AAACDAAAAAwAAAAgAAMAAHgBY2BkYADhsHtPFsXz23xlkGZhAIFLC5gEQPRl5xWpIJqFASzOwcAEogAYQAg0AHgBY2BkYGBhAAI4CRRBBYwAAZEAEAAAAHgBY2BkYGBgYmAF0wxQkgskxCABYgIAAhAALwB4AWNgYWFgnMDAysDANJPpDAMDQz+EZnzNYMzIyYAKGAWQOApAwHDgJfNLZhYwH0iiAwUGBgAAjgh6AAAEAAAAAAAAAHgBY2BgYGRgBmIGBh4GFgYFIM0ChED+S+b//yGk2D+wPAMAXIMHKAB4AR3ItQHCABRAwcNhCGQOKqxHB8DdffsEfvUEWTU5mXxFRhPhsuEDO18rR20nczMLW08NXVt3Fyez8JWFQ/yOnkkKbAELAQB4AWNgZsALAAB9AAR4AWNgYmAICAAhBoaIzgA/d14uKS4gm9fTwyUISAeAMCMzkNxyP+EdkGIO8AlxTWFgeLEkTg3IFfB0cQypYExeIC3BujhBBChfwMB4Z+L7yQxA4Onq57LOKaEJAK3VFft4AWNgYgABRiC2AGIJKJshAAhhAMEGyzIGBCgASbA6DiApCKRZoLKJAGrOAtkAAAA=',
        svg = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="100" style="background:#fff">'+
              '<style type="text/css">'+
              '@font-face{font-family:"chromacheck";src:url(data:application/x-font-woff;base64,'+font+') format("woff");}'+
              '@font-face{font-family:"chromacheck-cbdt";src:url(data:application/x-font-woff;base64,'+fontCBDT+') format("woff");}'+
              '</style>'+
              '<text x="0" y="20" fill="#000" font-family="chromacheck" font-size="20">&#xe904;'+ // Control glyph
              '<tspan font-family="chromacheck-cbdt" x="0" dy="20">&#xe903;</tspan>'+ // CBDT/CBLC
              '<tspan x="0" dy="20">&#xe902;</tspan>'+ // SVG
              '<tspan x="0" dy="20">&#xe901;</tspan>'+ // SBIX
              '<tspan x="0" dy="20">&#xe900;</tspan>'+ // COLR
              '</text>'+
              '</svg>';
    canvas.width  = 20;
    canvas.height = 100;

    img.onload = function() {
      checkFontLoad();

      // Repeat the test to give Safari time to load the font
      loop = window.setInterval(checkFontLoad, 1);
    }

    img.src = 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);
  }
  catch (ex) {
    checkFailed();
  }
})();
