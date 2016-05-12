/**
 * ChromaCheck 1.11
 * @author Roel Nieskens, https://pixelambacht.nl
 * MIT license
 */
(function(){
  var root = document.documentElement,
      cls = 'chromacheck-';

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

  // Draw color glyphs to a canvas through SVG
  try {
    var canvas = document.createElement('canvas'),
        context = canvas.getContext('2d'),
        img = new Image(),
        fontSBIX = 'd09GRgABAAAAAALsAAsAAAAAA2gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABPUy8yAAABcAAAADoAAABgF/InTmNtYXAAAAG0AAAALgAAADTpGek7Z2x5ZgAAAewAAAAUAAAAFAgBOQJoZWFkAAABCAAAAC8AAAA2CShiw2hoZWEAAAE4AAAAFQAAACQIAQQCaG10eAAAAawAAAAIAAAACAQAAABsb2NhAAAB5AAAAAgAAAAIAAAACm1heHAAAAFQAAAAHQAAACACDwAebmFtZQAAAgAAAABDAAAATgSgDQdwb3N0AAACRAAAAAwAAAAgAAMAAHNiaXgAAAJQAAAAnAAAAQglRrHNeAFjYGRgAOG51wJex/PbfGWQZmEAgUsLmARA9OUo6W0gmoUBLM7BwASiABNPCAMAeAFjYGRgYGEAAjgJFEEFjAABkQAQAAAAeAFjYGRgYGBmYAXTDFCSi4GBiYFBAsQEAAIrADAAAAB4AWNgYWFgnMDAysDANJPpDAMDQz+EZnzNYMzIyYAKGAWQOApAwHDgJeNLoAkgACTRgQIDAwAAbQh5AAAEAAAAAAAAAHgBJcU5AYBADACw3NNOzGAB/64qgp8sQTM0LKYdaWp6tZrXxf9mPTXgBqjZCSEAAAAAAAAAAAAKAAEAAAAABAAEAAABAAAxAQQABAB4AS3GVQGEAABAsXeGhEAiEAEpQATc3duj97UBb1Q+vL4yLwz4/33fJWcjpsKiJsAnJGNCxzkdaKnx78eElAcAhgmwAHgBY2BmwAsAAH0ABHgBY2AEQgYw5mHUYfAA0iJQ/AeKGQry0hU6A/zcebmkuIBcXk8PlyCgFh0Q5mAGivgtrnMHUpIlrhElwflpJeWJRakMjin5SakKnrmJ6alBqYkplYUnU22AitgCfEJcpzGAQF6Ez0SQ8Z4ujiEVt94cZAS5oknh//o8DwcgkxbgQx4TD0PCaQZGi2lVIiABT1c/l3VOCU0AMosnzQ==',
        fontCBDT = 'd09GRgABAAAAAALgAAwAAAAAAxAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABDQkRUAAACUAAAAGAAAABlKWauy0NCTEMAAAKwAAAALQAAAFDwVcDTT1MvMgAAAYQAAAA6AAAAYBf0J05jbWFwAAAByAAAACgAAAAsAAzpN2dseWYAAAH4AAAAFAAAABQIATkCaGVhZAAAARwAAAAvAAAANgkoZCloaGVhAAABTAAAABUAAAAkCAEEAmhtdHgAAAHAAAAACAAAAAgEAAAAbG9jYQAAAfAAAAAIAAAACAAAAAptYXhwAAABZAAAAB0AAAAgAg8AHm5hbWUAAAIMAAAAOAAAAD4C3AsWcG9zdAAAAkQAAAAMAAAAIAADAAB4AWNgZGAA4fLUNdXx/DZfGaRZGEDg0gImARB9OUpWBkSzMIDFORiYQBQA6kkGwAB4AWNgZGBgYQACOAkUQQWMAAGRABAAAAB4AWNgZGBgYGZgBdMMUJKLgYGJgUECxAQAAisAMAAAAHgBY2BhYWCcwMDKwMA0k+kMAwNDP4RmfM1gzMjJgAoYBZA4CkDAcOAl80ugCSAAJNGBAgMDAACrCHsAAAQAAAAAAAAAeAEFwbEBwCAIALAAjJ2d+/9nHqGYIJTAp/1oLdg9w66ZdQU8XJQHKQAAAAAAAAAKAAEAAAAABAAEAAABAAAxAQQABAB4AWNgYGBikGNgZmBk4WRgZFAA8iFsJjDbmSGDoYghnyGXIRHMTmVIZshmUACynRhcGEIAdYgF+3gBY2BmwAsAAH0ABHgBY2BiYAgIACEGhojOAD93Xi4pLiCb19PDJQhIB4AwIzOQ3HI/4R2QYg7wCXFNYWB4sSRODcgV8HRxDKlgTF4gLcG6OEEEKF/AwHhn4vvJDEDg6ernss4poQkArdUV+3gBY2BiAAFGILYAYgkomyEACGEAwQbLMgYEKABJsDoOICkIpFmgsokAas4C2QAAAA==',
        fontCOLR = 'd09GRgABAAAAAAKEAAwAAAAAAowAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABDT0xSAAACWAAAABcAAAAYAAIAJkNQQUwAAAJwAAAAEgAAABLJAAAQT1MvMgAAAYQAAAA6AAAAYBfxJ0pjbWFwAAAByAAAACcAAAAsAA3pM2dseWYAAAH4AAAAGgAAABoNIh0kaGVhZAAAARwAAAAvAAAANgkmO6hoaGVhAAABTAAAABUAAAAkCAEEAmhtdHgAAAHAAAAACAAAAAgEAAAAbG9jYQAAAfAAAAAIAAAACAANAA1tYXhwAAABZAAAAB0AAAAgAg8AHW5hbWUAAAIUAAAAOAAAAD4C5wsecG9zdAAAAkwAAAAMAAAAIAADAAB4AWNgZGAAYb4w8c3x/DZfGaRZGEDg0gImARB9OfzLbBDNwgAW52BgAlEA3o4HPgB4AWNgZGBgYQACOAkUQQWMAAGRABAAAAB4AWNgZGBgYGZgAdMMUJKLgYGJgUECxAQAAhIALwAAAHgBY2BhYWCcwMDKwMA0k+kMAwNDP4RmfM1gzMjJgAoYBZA4CkDAcOAlw0sGFhAXSGIABQYGAP/LCHQAAAQAAAAAAAAAeAFjYGBgZGAGYgYGHgYWBgUgzQKEQP5Lhv//IaQ4E1ieAQBVUwYnAAAAAAAADQANAAEAAAAABAAEAAADAAARIREhBAD8AAQA/AAAAHgBLcYFDYAAAADBxyEE0oU5TgLcvf+G3+wAEQsJQTYQcOC/+N6l42BlJn9fUzLi3I/wSS913wYOeAFjYGbACwAAfQAEeAFjYGBgBGI+IBYBsphAfJAIAAJEACkAAAAAAQABAAEAAAAOAAAAAMj/AAA=',
        fontSVG  = 'd09GRgABAAAAAAMMAAsAAAAAA5QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABPUy8yAAABaAAAADoAAABgF/MnTlNWRyAAAAI8AAAAzQAAAUj2P3csY21hcAAAAawAAAAtAAAANOkY6T1nbHlmAAAB5AAAABQAAAAUCAE5AmhlYWQAAAEIAAAALAAAADYFKF8baGhlYQAAATQAAAAXAAAAJAQBBAJobXR4AAABpAAAAAgAAAAIBAAAAGxvY2EAAAHcAAAACAAAAAgAAAAKbWF4cAAAAUwAAAAcAAAAIAIOABluYW1lAAAB+AAAADcAAAA8ApwLJXBvc3QAAAIwAAAADAAAACAAAwAAeAFjYGRgAGH9X59nxvPbfGWQZmEAgUsLmARA9OUoGT4GBOBgYAJRAAdRB1t4AWNgZGBgYQACIAkFjFAazgcAAUEADAB4AWNgZGBgYGaAAUYwycXAwMTAIAFiAgABlwAqeAFjYGFhYJzAwMrAwDST6QwDA0M/hGZ8zWDMyMmAChgFkDgKQMBw4CXTS6AJIAAk0YECAwMAAIwIegAABAAAAAAAAAB4ASXFOQGAQAwAsNzXibka8O+qIvjJEjRDw2baEaamV695XfznlacG3LPsCiEAAAAAAAAAAAAACgABAAAAAAQABAAAAQAAMQEEAAQAeAFjYGBgYpBjYGZgZOFkYASyGKBsJjDbmSGDoYghnyGXIRHMTmVIZshmUGAIZghjcAcAadkFygB4AWNgZsALAAB9AAR4AW0PhU5DMRDi6DdcDtdecesWJTZiOLF5X0Ptzff3VHA4d5mJMJ/kbMSgl4NJV9WJ0TDq9PrKWYF8nxA6tuXaykqB93fXe2dYrcxDgqv+SEKot32BxWDgLxgbj8f748N915PsgIhYqMBccjHRyr7+V8jPz89ZyuL3zRxBtQVKPfUFx7Qzb5Uw6DVsv+t6RmC/1dCdTb67x7e+1YQq3xgU0FVaC1w5PKAACGHcDQGngyOoJfnNJKhRFsn90C8I7NtuJj+fj79V3gAneFCdAAAA',
        svg = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="80" style="background:#fff">'+
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
              '</text>'+
              '</svg>';

    img.onload = function() {
      canvas.width  = 20;
      canvas.height = 80;
      context.drawImage(img, 0, 0);
      colorGlyphTest();
    }

    img.src = 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);
  }
  catch (ex) {
    root.className += ' '+cls+'failed';
  }
})();
