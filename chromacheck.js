/**
 * ChromaCheck, a feature test for color font support in browsers
 * Author & copyright (c) 2016 Roel Nieskens, https://pixelambacht.nl
 * Released under the MIT License. http://www.opensource.org/licenses/mit-license.php
 */
(function(){
  var root = document.documentElement,
      cls = 'chromacheck-',
      runs = 20,
      loop;

  try {
    var canvas = document.createElement('canvas');
        context = canvas.getContext('2d'),
        img = new Image()
        font = 'd09GRgABAAAAAAUEABAAAAAABhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABDQkRUAAACzAAAAGAAAABlKWauy0NCTEMAAAMsAAAAMAAAAFDwXcDbQ09MUgAAA1wAAAAXAAAAGAACACZDUEFMAAADdAAAABIAAAASyQAAEE9TLzIAAAHUAAAAOgAAAGAX8SdOU1ZHIAAAA4gAAADaAAABQQ+5oP9jbWFwAAACHAAAACcAAAAsAA3pN2dseWYAAAJUAAAAJgAAADgzUzQ+aGVhZAAAAWwAAAAuAAAANgiOkHRoaGVhAAABnAAAABUAAAAkCAEEAmhtdHgAAAIQAAAACwAAABAEAAAAbG9jYQAAAkQAAAAOAAAAEAAnADZtYXhwAAABtAAAAB0AAAAgAhMAHm5hbWUAAAJ8AAAAQQAAAEoEnAzFcG9zdAAAAsAAAAAMAAAAIAADAABzYml4AAAEZAAAAJ4AAAEYJUa0bXgBY2BkYADhKxsjleL5bb4ySLMwgMClBUwCYPqAZzqIZmEAi3MwMIEoAPxtB5kAAHgBY2BkYGBhAAI4CRRBBYwAAZEAEAAAAHgBY2BkYGBgZ2AF0wxQkouBgYmBQQLEBAAClwA0AAAAeAFjYGFhYJzAwMrAwDST6QwDA0M/hGZ8zWDMyMmAChgFkDgKQMBw4CXDS6AJIAAk0YECAwMAAE4IeAAAeAFjYUAFAABQAAUAeAEFwbEBgAAIA7AAjO6u/v8ZV9QEZRQe68NaxW3CSd5W8ANVlwYrAHgBYwABXjiUAQAB8wBeAAB4AWNgZAACFiBkYGZgEFQUVGRh+MMAwkgyLBAZQagUiA8Aa/ME9wAAeAEthgUBgwAABG8bWoIEtCAAGgB39/boXg/4ovHjI6h80OHP34ctCnYSagIawmsjcmaMa0c6GgI8EibmE+NNCWoAAAB4AWNgZsALAAB9AAR4AWNgYmAICAAhBoaIzgA/d14uKS4gm9fTwyUISAeAMCMzkNxyP+EdkGIO8AlxTWFgeLEkTg3IFfB0cQypYExeIC3BujhBBChfwMB4Z+L7yQxA4Onq57LOKaEJAK3VFft4AWNgYgABRiC2AGIJKJshAAhBAJ3NwMrAGhCgwAiigTwOoGpBIM0ClU0EAGxuAul4AWNgYGAEYj4gFgGymEB8kAgAAkQAKQAAAAABAAEAAQAAAA4AAAAAyP8AAHgBbQ/FVsNAMLjzDfMG1xVctr1xKiecU9I2vnH/eyI4jLsoDSy2ckKZqVFRVmtz57pfehJyPU7swBfIDimC7o+Cse2bAh/ubw7Osd9bvE5yE+pKPxFopWl4SUhRFIfF0WEQm4RTSkldgV3JZSlt3/2vkF1cXJA2i9938manNpT6wVAbuWYcZP5YoK8XQGtklB+3AsGuw6asQusEIY01PzGC2BOYjDSpb7P9A7aD9a2hllpg2FIKXDvitAYEqDtv32cNGvndpDCgnWjcT/0KCKSe17zWewP33lUrAAB4AWNgBEIGMOZh1GHwANIqqJiRBwUDQUFeukJngJ87L5cUF5DL6+nhEgSU0wFhDmagiN/iOncgJVniGlESnJ9WUp5YlMrgmJKflKrgmZuYnhqUmphSWXgy1QaoiC3AJ8R1GgMI5EX4TAQZ7+niGFJx681BRpCrmhT+r8/zcAAyaQE+5DHxMCScZmC0mFYlAhLwdPVzWeeU0AQABiwmcQAA',
        svg = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="100" style="background:#fff">'+
              '<style type="text/css">@font-face{font-family:"chromacheck";src:url(data:application/x-font-woff;base64,'+font+') format("woff");}</style>'+
              '<text x="0" y="20" fill="#000" font-family="chromacheck" font-size="20">&#xe904;<tspan x="0" dy="20">&#xe903;</tspan><tspan x="0" dy="20">&#xe902;</tspan><tspan x="0" dy="20">&#xe901;</tspan><tspan x="0" dy="20">&#xe900;</tspan></text>'+
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
    res.svg  = context.getImageData(10, 30, 1, 1).data[0] === 50;  // SVG-in-OpenType
    res.cbdt = context.getImageData(10, 50, 1, 1).data[0] === 100; // CBDT/CBLC
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
})();
