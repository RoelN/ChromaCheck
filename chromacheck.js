/**
 * ChromaCheck 1.13
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

    if(context.getImageData(10, 90, 1, 1).data[1] === 255) {
      clearInterval(loop);
      colorGlyphTest();
      return true;
    } else if(--runs <= 0) {
      clearInterval(loop);
      checkFailed();
    }
  }

  // Canvas has been drawn, check for which color glyphs we see
  function colorGlyphTest() {
    var res = {};
    res.cbdt = context.getImageData(10, 10, 1, 1).data[0] === 100; // CBDT/CBLC
    res.colr = context.getImageData(10, 30, 1, 1).data[0] === 200; // COLR/CPAL
    res.sbix = context.getImageData(10, 50, 1, 1).data[0] === 150; // SBIX
    res.svg  = context.getImageData(10, 70, 1, 1).data[0] === 50;  // SVG-in-OpenType

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

  // Draw color glyphs to a canvas through SVG
  try {
    var canvas = document.createElement('canvas'),
        context = canvas.getContext('2d'),
        img = new Image(),
        fontCBDT = 'd09GRgABAAAAAALkAAwAAAAAAxgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABDQkRUAAACVAAAAGAAAABlKWauy0NCTEMAAAK0AAAALQAAAFDwVcDTT1MvMgAAAYAAAAA6AAAAYBf0J01jbWFwAAABxAAAACcAAAAsAAzpNmdseWYAAAH0AAAAGgAAABoNIh0kaGVhZAAAARwAAAAvAAAANgxLx0hoaGVhAAABTAAAABUAAAAkCAEEAmhtdHgAAAG8AAAABgAAAAYEAAAAbG9jYQAAAewAAAAGAAAABgANAABtYXhwAAABZAAAABsAAAAgAg4AHW5hbWUAAAIQAAAAOAAAAD4C3AsWcG9zdAAAAkgAAAAMAAAAIAADAAB4AWNgZGAA4bSjsh/j+W2+MkizMIDApQVMAiD6Wm2DNYhmYQCLczAwgSgAAJIHngB4AWNgZGBgYQACOAkUQQWMAAGRABAAAAB4AWNgZGBgYGJgAdMMUJILJMQgAWICAAH3AC4AeAFjYGFhYJzAwMrAwDST6QwDA0M/hGZ8zWDMyMmAChgFkDgKQMBw4CXzS2YWMB9IogMFBgYAAI4IegAABAAAAAAAAAB4AWNgYGBkYAZiBgYeBhYGBSDNAoRA/kvm//8hpNg/sDwDAFyDBygAAAAAAAANAAAAAQAAAAAEAAQAAAMAABEhESEEAPwABAD8AAAAeAFjYGBgYpBjYGZgZOFkYGRQAPIhbCYw25khg6GIIZ8hlyERzE5lSGbIZlAAsp0YXBhCAHWIBft4AWNgZsALAAB9AAR4AWNgYmAICAAhBoaIzgA/d14uKS4gm9fTwyUISAeAMCMzkNxyP+EdkGIO8AlxTWFgeLEkTg3IFfB0cQypYExeIC3BujhBBChfwMB4Z+L7yQxA4Onq57LOKaEJAK3VFft4AWNgYgABRiC2AGIJKJshAAhhAMEGyzIGBCgASbA6DiApCKRZoLKJAGrOAtkAAAA=',
        fontCOLR = 'd09GRgABAAAAAAKAAAwAAAAAAowAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABDT0xSAAACVAAAABYAAAAYAAIAJUNQQUwAAAJsAAAAEgAAABLJAAAQT1MvMgAAAYAAAAA6AAAAYBfxJ0pjbWFwAAABxAAAACcAAAAsAAzpM2dseWYAAAH0AAAAGgAAABoNIh0kaGVhZAAAARwAAAAvAAAANgxLumdoaGVhAAABTAAAABUAAAAkCAEEAmhtdHgAAAG8AAAABgAAAAYEAAAAbG9jYQAAAewAAAAGAAAABgANAABtYXhwAAABZAAAABsAAAAgAg4AHW5hbWUAAAIQAAAAOAAAAD4C5wsecG9zdAAAAkgAAAAMAAAAIAADAAB4AWNgZGAAYQ5+qdB4fpuvDNIsDCBwaQGTAIi+VlscBaJZGMDiHAxMIAoAtjIF/QB4AWNgZGBgYQACOAkUQQWMAAGRABAAAAB4AWNgZGBgYGJgAdMMUJILJMQgAWICAAH3AC4AeAFjYGFhYJzAwMrAwDST6QwDA0M/hGZ8zWDMyMmAChgFkDgKQMBw4CXDSwYWEBdIYgAFBgYA/8sIdAAABAAAAAAAAAB4AWNgYGBkYAZiBgYeBhYGBSDNAoRA/kuG//8hpDgjWJ4BAFVMBiYAAAAAAAANAAAAAQAAAAAEAAQAAAMAABEhESEEAPwABAD8AAAAeAEtxgUNgAAAAMHHIQTShTlOAty9/4bf7AARCwlBNhBw4L/43qXjYGUmf19TMuLcj/BJL3XfBg54AWNgZsALAAB9AAR4AWNgYGAEYj4gFgGygGwICQACOwAoAAAAAAABAAEAAQAAAA4AAAAAyP8AAA==',
        fontSBIX = 'd09GRgABAAAAAALoAAsAAAAAA2QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABPUy8yAAABbAAAADoAAABgF/InS2NtYXAAAAGwAAAAJwAAACwADOk0Z2x5ZgAAAeAAAAAaAAAAGg0iHSRoZWFkAAABCAAAAC8AAAA2DEvHU2hoZWEAAAE4AAAAFQAAACQIAQQCaG10eAAAAagAAAAGAAAABgQAAABsb2NhAAAB2AAAAAYAAAAGAA0AAG1heHAAAAFQAAAAGwAAACACDgAdbmFtZQAAAfwAAABDAAAATgSgDQdwb3N0AAACQAAAAAwAAAAgAAMAAHNiaXgAAAJMAAAAnAAAAQQlRrDFeAFjYGRgAOF4/4O34/ltvjJIszCAwKUFTAIg+lptgxuIZmEAi3MwMIEoAAPhB7oAeAFjYGRgYGEAAjgJFEEFjAABkQAQAAAAeAFjYGRgYGBiYAHTDFCSCyTEIAFiAgAB9wAuAHgBY2BhYWCcwMDKwMA0k+kMAwNDP4RmfM1gzMjJgAoYBZA4CkDAcOAl40tGFjAfSKIDBQYGAAAWCHYAAAQAAAAAAAAAeAFjYGBgZGAGYgYGHgYWBgUgzQKEQP5Lxv//IaQ4SA0QAABVYQYnAAAAAAAADQAAAAEAAAAABAAEAAADAAARIREhBAD8AAQA/AAAAHgBLcZVAYMAAEDBN0NCIBGIgBQgAu7u7dF93QFvVD68vjIvDPj/fd8lZyOmwqImwCckY0LHOR1oqfHvx4SUBwCGCbAAeAFjYGbACwAAfQAEeAFjYARCBjDmYdRh8ADSAlD8gwEICvLSFToD/Nx5uaS4gFxeTw+XIKByHRDmYAaK+C2ucwdSkiWuESXB+Wkl5YlFqQyOKflJqQqeuYnpqUGpiSmVhSdTbYCK2AJ8QlynMYBAXoTPRJDxni6OIRW33hxkBLmgSeH/+jwPByCTFuBDHhMPQ8JpBkaLaVUiIAFPVz+XdU4JTQA7YCbF',
        fontSVG  = 'd09GRgABAAAAAAMMAAsAAAAAA3wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABPUy8yAAABcAAAADoAAABgF/MnTlNWRyAAAAJQAAAAvAAAAQ/LNyCYY21hcAAAAbQAAAAtAAAANOkY6T1nbHlmAAAB7AAAAB4AAAA0KkgqRmhlYWQAAAEIAAAALwAAADYMS8staGhlYQAAATgAAAAVAAAAJAgBBAJobXR4AAABrAAAAAgAAAAIBAAAAGxvY2EAAAHkAAAACAAAAAgADQAabWF4cAAAAVAAAAAdAAAAIAIPAB1uYW1lAAACDAAAADcAAAA8ApwLJXBvc3QAAAJEAAAADAAAACAAAwAAeAFjYGRgAGFtqafL4vltvjJIszCAwKUFTAIg+lptiwKIZmEAi3MwMIEoAOvwBx4AeAFjYGRgYGEAAjgJFEEFjAABkQAQAAAAeAFjYGRgYGBmYAHTDFCSi4GBiYFBAsQEAAISAC8AAAB4AWNgYWFgnMDAysDANJPpDAMDQz+EZnzNYMzIyYAKGAWQOApAwHDgJdNLoAkgACTRgQIDAwAAjAh6AAAEAAAAAAAAAHgBJcU5AYBADACw3NeJuRrw76oi+MkSNEPDZtoRpqZXr3ld/OeVpwbcs+wKIQAAAAAAAAAADQAaeAFjYGQAAhYgZGBmYBBUFFRkYfjDAMK4ZQBZhAThAAB4AWNgYGBikGNgZmBk4WRgBLIYoGwmMNuZIYOhiCGfIZchEcxOZUhmyGZQYAhmCGNwBwBp2QXKAHgBY2BmwAsAAH0ABHgBTQ81VgNBFEr0DP/FfUdwmKSjChVOlWTd3U5Oywj23WVPwKGU+wK5PuX8ebdqwgAqM8vdOGIdvEAdMCM9NtzIZp3np/v5VWe1PAQJd3llA6+PctZxiiK50bS6rhc1XcSZrRGEkMYrOuAarGMHbeLgzk8rb7ahyLZRbsVZyDq5vg3MEZ7N8fhfDa9KtoUDlhsErNOlBHHoAB/3gAAjcgZrIf+bCNZICeH+6o8OaP92a/bvD+LE5RfyYz6O',
        svg = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="100" style="background:#fff;fill:#0f0;">'+
              '<style type="text/css">'+
              '@font-face{font-family:"chromacheck-cbdt";src:url(data:application/x-font-woff;base64,'+fontCBDT+') format("woff");}'+
              '@font-face{font-family:"chromacheck-colr";src:url(data:application/x-font-woff;base64,'+fontCOLR+') format("woff");}'+
              '@font-face{font-family:"chromacheck-sbix";src:url(data:application/x-font-woff;base64,'+fontSBIX+') format("woff");}'+
              '@font-face{font-family:"chromacheck-svg";src:url(data:application/x-font-woff;base64,'+fontSVG+') format("woff");}'+
              '</style>'+
              '<text x="0" y="0" font-size="20">'+
              '<tspan font-family="chromacheck-cbdt" x="0" dy="20">&#xe903;</tspan>'+ // CBDT/CBLC
              '<tspan font-family="chromacheck-colr" x="0" dy="20">&#xe900;</tspan>'+ // COLR
              '<tspan font-family="chromacheck-sbix" x="0" dy="20">&#xe901;</tspan>'+ // SBIX
              '<tspan font-family="chromacheck-svg" x="0" dy="20">&#xe902;</tspan>'+ // SVG
              '<tspan font-family="chromacheck-svg" x="0" dy="20">&#xe904;</tspan>'+ // Control
              '</text>'+
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

    img.src = 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);
  }
  catch (ex) {
    checkFailed();
  }
})();
