/**
 * ChromaCheck 1.12
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

    if(context.getImageData(10, 90, 1, 1).data[0] === 0) {
      clearInterval(loop);
      colorGlyphTest();
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
        fontSBIX = 'd09GRgABAAAAAALoAAsAAAAAA2gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABPUy8yAAABbAAAADoAAABgF/InTmNtYXAAAAGwAAAALgAAADTpGek7Z2x5ZgAAAegAAAAUAAAAFAgBOQJoZWFkAAABCAAAADAAAAA2CSi71WhoZWEAAAE4AAAAFQAAACQIAQQCaG10eAAAAagAAAAIAAAACAQAAABsb2NhAAAB4AAAAAgAAAAIAAAACm1heHAAAAFQAAAAHAAAACACDwAbbmFtZQAAAfwAAABDAAAATgSgDQdwb3N0AAACQAAAAAwAAAAgAAMAAHNiaXgAAAJMAAAAnAAAAQglRrHNeAFjYGRgAOG5V+edjee3+cogzcIAApcWMAmA6MtRJSdANAsDWJyDgQlEAQAjygideAFjYGRgYGEAAjgJFEEFjAABkQAQAAAAeAFjYGRgYGBmYALTDFCSiwEowCABYgIAAeAALXgBY2BhYWCcwMDKwMA0k+kMAwNDP4RmfM1gzMjJgAoYBZA4CkDAcOAl40ugCSAAJNGBAgMDAABtCHkAAAQAAAAAAAAAeAElxTkBgEAMALDc007MYAH/riqCnyxBMzQsph1panq1mtfF/2Y9NeAGqNkJIQAAAAAAAAAAAAoAAQAAAAAEAAQAAAEAADEBBAAEAHgBLcZVAYQAAECxd4aEQCIQASlABNzd26P3tQFvVD68vjIvDPj/fd8lZyOmwqImwCckY0LHOR1oqfHvx4SUBwCGCbAAeAFjYGbACwAAfQAEeAFjYARCBjDmYdRh8ADSIlD8B4oZCvLSFToD/Nx5uaS4gFxeTw+XIKAWHRDmYAaK+C2ucwdSkiWuESXB+Wkl5YlFqQyOKflJqQqeuYnpqUGpiSmVhSdTbYCK2AJ8QlynMYBAXoTPRJDxni6OIRW33hxkBLmiSeH/+jwPByCTFuBDHhMPQ8JpBkaLaVUiIAFPVz+XdU4JTQAyiyfN',
        fontCBDT = 'd09GRgABAAAAAAKYAAoAAAAAAtQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABDQkRUAAACCAAAAGAAAABlKWauy0NCTEMAAAJoAAAALQAAAFDwVcDTT1MvMgAAAVgAAAA6AAAAYBf0J01jbWFwAAABnAAAACcAAAAsAAzpNmhlYWQAAAD0AAAALwAAADYJpqZ2aGhlYQAAASQAAAAVAAAAJAgBBAJobXR4AAABlAAAAAYAAAAGBAAAAG1heHAAAAE8AAAAGwAAACACDgAebmFtZQAAAcQAAAA4AAAAPgLcCxZwb3N0AAAB/AAAAAwAAAAgAAMAAHgBY2BkYADhKO+aonh+m68M0iwMIHBpAZMAiL58Iz4TRLMwgMU5GJhAFADr8wddAHgBY2BkYGBhAAI4CRRBBYwAAZEAEAAAAHgBY2BkYGBgYmAF0wxQkgskxCABYgIAAhAALwB4AWNgYWFgnMDAysDANJPpDAMDQz+EZnzNYMzIyYAKGAWQOApAwHDgJfNLZhYwH0iiAwUGBgAAjgh6AAAEAAAAAAAAAHgBY2BgYGRgBmIGBh4GFgYFIM0ChED+S+b//yGk2D+wPAMAXIMHKAB4AWNgYGBikGNgZmBk4WRgZFAA8iFsJjDbmSGDoYghnyGXIRHMTmVIZshmUACynRhcGEIAdYgF+3gBY2BmwAsAAH0ABHgBY2BiYAgIACEGhojOAD93Xi4pLiCb19PDJQhIB4AwIzOQ3HI/4R2QYg7wCXFNYWB4sSRODcgV8HRxDKlgTF4gLcG6OEEEKF/AwHhn4vvJDEDg6ernss4poQkArdUV+3gBY2BiAAFGILYAYgkomyEACGEAwQbLMgYEKABJsDoOICkIpFmgsokAas4C2QAAAA==',
        fontCOLR = 'd09GRgABAAAAAAKEAAwAAAAAAowAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABDT0xSAAACWAAAABcAAAAYAAIAJkNQQUwAAAJwAAAAEgAAABLJAAAQT1MvMgAAAYQAAAA6AAAAYBfxJ0pjbWFwAAAByAAAACcAAAAsAA3pM2dseWYAAAH4AAAAGgAAABoNIh0kaGVhZAAAARwAAAAvAAAANgkou9VoaGVhAAABTAAAABUAAAAkCAEEAmhtdHgAAAHAAAAACAAAAAgEAAAAbG9jYQAAAfAAAAAIAAAACAANAA1tYXhwAAABZAAAAB0AAAAgAg8AHW5hbWUAAAIUAAAAOAAAAD4C5wsecG9zdAAAAkwAAAAMAAAAIAADAAB4AWNgZGAAYb5A8ch4fpuvDNIsDCBwaQGTAIi+HFVyAkSzMIDFORiYQBQAyCUGjwB4AWNgZGBgYQACOAkUQQWMAAGRABAAAAB4AWNgZGBgYGZgAdMMUJKLgYGJgUECxAQAAhIALwAAAHgBY2BhYWCcwMDKwMA0k+kMAwNDP4RmfM1gzMjJgAoYBZA4CkDAcOAlw0sGFhAXSGIABQYGAP/LCHQAAAQAAAAAAAAAeAFjYGBgZGAGYgYGHgYWBgUgzQKEQP5Lhv//IaQ4E1ieAQBVUwYnAAAAAAAADQANAAEAAAAABAAEAAADAAARIREhBAD8AAQA/AAAAHgBLcYFDYAAAADBxyEE0oU5TgLcvf+G3+wAEQsJQTYQcOC/+N6l42BlJn9fUzLi3I/wSS913wYOeAFjYGbACwAAfQAEeAFjYGBgBGI+IBYBsphAfJAIAAJEACkAAAAAAQABAAEAAAAOAAAAAMj/AAA=',
        fontSVG  = 'd09GRgABAAAAAAMcAAsAAAAAA6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABPUy8yAAABcAAAADoAAABgF/MnTlNWRyAAAAJMAAAAzQAAAUj2P3csY21hcAAAAbQAAAAtAAAANOkY6T1nbHlmAAAB7AAAABoAAAAeFxomMWhlYWQAAAEIAAAALwAAADYJKbfRaGhlYQAAATgAAAAVAAAAJAgBBAJobXR4AAABrAAAAAgAAAAIBAAAAGxvY2EAAAHkAAAACAAAAAgAAAAPbWF4cAAAAVAAAAAdAAAAIAIPAB5uYW1lAAACCAAAADcAAAA8ApwLJXBvc3QAAAJAAAAADAAAACAAAwAAeAFjYGRgAGHGI+m98fw2XxmkWRhA4NICJgEQfTm64AiIZmEAi3MwMIEoAO/7B3IAeAFjYGRgYGEAAjgJFEEFjAABkQAQAAAAeAFjYGRgYGBmYAXTDFCSi4GBiYFBAsQEAAIrADAAAAB4AWNgYWFgnMDAysDANJPpDAMDQz+EZnzNYMzIyYAKGAWQOApAwHDgJdNLoAkgACTRgQIDAwAAjAh6AAAEAAAAAAAAAHgBJcU5AYBADACw3NeJuRrw76oi+MkSNEPDZtoRpqZXr3ld/OeVpwbcs+wKIQAAAAAAAAAAAAAPeAFjYGQAAhYgBCFBRSBkYfjDAMEMABXBAocAAHgBY2BgYGKQY2BmYGThZGAEshigbCYw25khg6GIIZ8hlyERzE5lSGbIZlBgCGYIY3AHAGnZBcoAeAFjYGbACwAAfQAEeAFtD4VOQzEQ4ug3XA7XXnHrFiU2YjixeV9D7c3391RwOHeZiTCf5GzEoJeDSVfVidEw6vT6ylmBfJ8QOrbl2spKgfd313tnWK3MQ4Kr/khCqLd9gcVg4C8YG4/H++PDfdeT7ICIWKjAXHIx0cq+/lfIz8/PWcri980cQbUFSj31Bce0M2+VMOg1bL/rekZgv9XQnU2+u8e3vtWEKt8YFNBVWgtcOTygAAhh3A0Bp4MjqCX5zSSoURbJ/dAvCOzbbiY/n4+/Vd4AJ3hQnQAAAA==',
        svg = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="100" style="background:#fff;color:blue">'+
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
