/**
 * ChromaCheck 1.16
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

    if(redAt(90) === 0) {
      clearInterval(loop);
      colorGlyphTest();
      return true;
    } else if(--runs <= 0) {
      clearInterval(loop);
      checkFailed();
    }
  }
  
  function redAt(context, y) {
    return imgData(context.getImageData(10, y, 1, 1).data[0];
  }

  // Canvas has been drawn, check for which color glyphs we see
  function colorGlyphTest() {
    var res = {
      cbdt: redAt(10) === 100, // CBDT/CBLC
      colr: redAt(30) === 200, // COLR
      sbix: redAt(50) === 150, // SBIX
      svg: redAt(70) === 50 // OpenType-SVG
    };

    // Add class to HTML tag for each supported color format
    for (var key in Object.keys(res)) {
      root.classList.add(res[key] ? cls + key : '');
    }
  }

  // Font, SVG, or canvas failed
  function checkFailed() {
    root.classList.add(cls + 'failed');
  }

  // Draw color glyphs to a canvas through SVG
  try {
    var canvas = document.createElement('canvas'),
        context = canvas.getContext('2d', { alpha: false }),
        img = new Image(),
        fontCBDT = 'd09GRgABAAAAAALkAAwAAAAAAxgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABDQkRUAAACVAAAAGAAAABlKWauy0NCTEMAAAK0AAAALQAAAFDwVcDTT1MvMgAAAYAAAAA6AAAAYBf0J01jbWFwAAABxAAAACcAAAAsAAzpNmdseWYAAAH0AAAAGgAAABoNIh0kaGVhZAAAARwAAAAvAAAANgxLx0hoaGVhAAABTAAAABUAAAAkCAEEAmhtdHgAAAG8AAAABgAAAAYEAAAAbG9jYQAAAewAAAAGAAAABgANAABtYXhwAAABZAAAABsAAAAgAg4AHW5hbWUAAAIQAAAAOAAAAD4C3AsWcG9zdAAAAkgAAAAMAAAAIAADAAB4AWNgZGAA4bSjsh/j+W2+MkizMIDApQVMAiD6Wm2DNYhmYQCLczAwgSgAAJIHngB4AWNgZGBgYQACOAkUQQWMAAGRABAAAAB4AWNgZGBgYGJgAdMMUJILJMQgAWICAAH3AC4AeAFjYGFhYJzAwMrAwDST6QwDA0M/hGZ8zWDMyMmAChgFkDgKQMBw4CXzS2YWMB9IogMFBgYAAI4IegAABAAAAAAAAAB4AWNgYGBkYAZiBgYeBhYGBSDNAoRA/kvm//8hpNg/sDwDAFyDBygAAAAAAAANAAAAAQAAAAAEAAQAAAMAABEhESEEAPwABAD8AAAAeAFjYGBgYpBjYGZgZOFkYGRQAPIhbCYw25khg6GIIZ8hlyERzE5lSGbIZlAAsp0YXBhCAHWIBft4AWNgZsALAAB9AAR4AWNgYmAICAAhBoaIzgA/d14uKS4gm9fTwyUISAeAMCMzkNxyP+EdkGIO8AlxTWFgeLEkTg3IFfB0cQypYExeIC3BujhBBChfwMB4Z+L7yQxA4Onq57LOKaEJAK3VFft4AWNgYgABRiC2AGIJKJshAAhhAMEGyzIGBCgASbA6DiApCKRZoLKJAGrOAtkAAAA=',
        fontCOLR = 'd09GRgABAAAAAAKAAAwAAAAAAowAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABDT0xSAAACVAAAABYAAAAYAAIAJUNQQUwAAAJsAAAAEgAAABLJAAAQT1MvMgAAAYAAAAA6AAAAYBfxJ0pjbWFwAAABxAAAACcAAAAsAAzpM2dseWYAAAH0AAAAGgAAABoNIh0kaGVhZAAAARwAAAAvAAAANgxLumdoaGVhAAABTAAAABUAAAAkCAEEAmhtdHgAAAG8AAAABgAAAAYEAAAAbG9jYQAAAewAAAAGAAAABgANAABtYXhwAAABZAAAABsAAAAgAg4AHW5hbWUAAAIQAAAAOAAAAD4C5wsecG9zdAAAAkgAAAAMAAAAIAADAAB4AWNgZGAAYQ5+qdB4fpuvDNIsDCBwaQGTAIi+VlscBaJZGMDiHAxMIAoAtjIF/QB4AWNgZGBgYQACOAkUQQWMAAGRABAAAAB4AWNgZGBgYGJgAdMMUJILJMQgAWICAAH3AC4AeAFjYGFhYJzAwMrAwDST6QwDA0M/hGZ8zWDMyMmAChgFkDgKQMBw4CXDSwYWEBdIYgAFBgYA/8sIdAAABAAAAAAAAAB4AWNgYGBkYAZiBgYeBhYGBSDNAoRA/kuG//8hpDgjWJ4BAFVMBiYAAAAAAAANAAAAAQAAAAAEAAQAAAMAABEhESEEAPwABAD8AAAAeAEtxgUNgAAAAMHHIQTShTlOAty9/4bf7AARCwlBNhBw4L/43qXjYGUmf19TMuLcj/BJL3XfBg54AWNgZsALAAB9AAR4AWNgYGAEYj4gFgGygGwICQACOwAoAAAAAAABAAEAAQAAAA4AAAAAyP8AAA==',
        fontSBIX = 'd09GRgABAAAAAALkAAsAAAAAA2AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABPUy8yAAABbAAAADoAAABgFxIli2NtYXAAAAGwAAAAJwAAACwADOk0Z2x5ZgAAAeAAAAAWAAAAFjdEBkBoZWFkAAABCAAAADAAAAA2C6KlkGhoZWEAAAE4AAAAFgAAACQGQQMiaG10eAAAAagAAAAGAAAABgMgAABsb2NhAAAB2AAAAAYAAAAGAAsAAG1heHAAAAFQAAAAGgAAACACDwAbbmFtZQAAAfgAAABDAAAATgSgDQdwb3N0AAACPAAAAAwAAAAgAAMAAHNiaXgAAAJIAAAAnAAAAQQlRrDFeAFjYGRgAGHhBIvaeH6brwzSzAoMQHBpAZMAiL62JcEZRDMrgMU5GJhAPADavQcJeAFjYGRgYFZgYECQQBFUwAgACqMAbQAAeAFjYGRgYGACQxBgBJNcDCCuBIgJAAHcAC0AAHgBY2BhVmCcwMDKwMA0k+kMAwNDP4RmfM1gzMjJgAoYBZA4CkDAcOAl40tGZgUQH0iiA6AIABEmCNMAAAMgAAAAAAAAeAFjYGBgZGAGYgYGHgYWBgUgzQKEQP5Lxv//IaQ4SA0QAABVYQYnAAAAAAAACwAAAAIAAAAAAyADIAAAAAEAADEBAyADIAAAeAEtxlUBgwAAQME3Q0IgEYiAFCAC7u7t0X3dAW9UPry+Mi8M+P993yVnI6bCoibAJyRjQsc5HWip8e/HhJQHAIYJsAB4AWNgZsALAAB9AAR4AWNgBEIGMOZh1GHwANICUPyDAQgK8tIVOgP83Hm5pLiAXF5PD5cgoHIdEOZgBor4La5zB1KSJa4RJcH5aSXliUWpDI4p+UmpCp65iempQamJKZWFJ1NtgIrYAnxCXKcxgEBehM9EkPGeLo4hFbfeHGQEuaBJ4f/6PA8HIJMW4EMeEw9DwmkGRotpVSIgAU9XP5d1TglNADtgJsU=',
        fontSVG  = 'd09GRgABAAAAAALoAAsAAAAAAxgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABPUy8yAAABcAAAADoAAABgF/MnTlNWRyAAAAJQAAAAlwAAAKrSQDCHY21hcAAAAbQAAAAtAAAANOkY6T1nbHlmAAAB7AAAAB4AAAA0KkgqRmhlYWQAAAEIAAAALwAAADYMS9SPaGhlYQAAATgAAAAVAAAAJAgBBAJobXR4AAABrAAAAAgAAAAIBAAAAGxvY2EAAAHkAAAACAAAAAgADQAabWF4cAAAAVAAAAAdAAAAIAIPAB1uYW1lAAACDAAAADcAAAA8ApwLJXBvc3QAAAJEAAAADAAAACAAAwAAeAFjYGRgAGFZjs2Z8fw2XxmkWRhA4NICJgEQfa22twlEszCAxTkYmEAUANtlBvoAeAFjYGRgYGEAAjgJFEEFjAABkQAQAAAAeAFjYGRgYGBmYAHTDFCSi4GBiYFBAsQEAAISAC8AAAB4AWNgYWFgnMDAysDANJPpDAMDQz+EZnzNYMzIyYAKGAWQOApAwHDgJdNLoAkgACTRgQIDAwAAjAh6AAAEAAAAAAAAAHgBJcU5AYBADACw3NeJuRrw76oi+MkSNEPDZtoRpqZXr3ld/OeVpwbcs+wKIQAAAAAAAAAADQAaeAFjYGQAAhYgZGBmYBBUFFRkYfjDAMK4ZQBZhAThAAB4AWNgYGBikGNgZmBk4WRgBLIYoGwmMNuZIYOhiCGfIZchEcxOZUhmyGZQYAhmCGNwBwBp2QXKAHgBY2BmwAsAAH0ABHgBHUw1dsRQDHTK4Bn+U1qzHdwP1WaDVaA2M7N9jFzYNGJpRtyGiz2f7cZxN2v8YzakCercqg7zjIAiyoDczM6dMPMJ/P68CI/AKK47H63ErCYQNE3xLEl934u9JuaVL6myLEsrA1DoEPCTsQgUoLgwmwB5YZIQuNU2zvp6vX/JgiKrerClP/lV7vZxAoni7QldAG/3K6oA',
        svg = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="100" style="background:#fff" font-size="20">'+
              '<style>'+
              '@font-face{font-family:chromacheck-cbdt;src:url(data:font/woff;base64,'+fontCBDT+')}'+
              '@font-face{font-family:chromacheck-colr;src:url(data:font/woff;base64,'+fontCOLR+')}'+
              '@font-face{font-family:chromacheck-sbix;src:url(data:font/woff;base64,'+fontSBIX+')}'+
              '@font-face{font-family:chromacheck-svg;src:url(data:font/woff;base64,'+fontSVG+')}'+
              '</style>'+
              '<text font-family="chromacheck-cbdt" dy="20">&#xe903;</text>'+ // CBDT/CBLC
              '<text font-family="chromacheck-colr" dy="20">&#xe900;</text>'+ // COLR
              '<text font-family="chromacheck-sbix" dy="20">&#xe901;</text>'+ // SBIX
              '<text font-family="chromacheck-svg" dy="20">&#xe902;</text>'+ // SVG
              '<text font-family="chromacheck-svg" dy="20">&#xe904;</text>'+ // Control
              '</svg>';
    canvas.width  = 20;
    canvas.height = 100;

    img.onload = function() {
      if(!checkFontLoad())
      {
        // Repeat the test to give Safari time to load the font
        loop = window.setInterval(checkFontLoad, 1);
      }
    }

    img.src = 'data:image/svg+xml,'+encodeURIComponent(svg);
  }
  catch (ex) {
    checkFailed();
  }
})();
