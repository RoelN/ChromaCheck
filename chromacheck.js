/**
 * ChromaCheck 1.0
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

  try {
    var canvas = document.createElement('canvas'),
        context = canvas.getContext('2d'),
        img = new Image()
        font = 'd09GRgABAAAAAAT4ABAAAAAABhwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABDQkRUAAACyAAAAGAAAABlKWauy0NCTEMAAAMoAAAAMAAAAFDwXcDbQ09MUgAAA1gAAAAXAAAAGAACACZDUEFMAAADcAAAABIAAAASyQAAEE9TLzIAAAHUAAAAOgAAAGAX8SdOU1ZHIAAAA4QAAADRAAABSPZDdzRjbWFwAAACHAAAACcAAAAsAA3pN2dseWYAAAJUAAAAJgAAADgzUzQ+aGVhZAAAAWwAAAAvAAAANgjn4wNoaGVhAAABnAAAABUAAAAkCAEEAmhtdHgAAAIQAAAACwAAABAEAAAAbG9jYQAAAkQAAAAOAAAAEAAnADZtYXhwAAABtAAAAB0AAAAgAhMAHm5hbWUAAAJ8AAAAPwAAAEwEbg0VcG9zdAAAArwAAAAMAAAAIAADAABzYml4AAAEWAAAAJ4AAAEYJUa0bXgBY2BkYABhdne2t/H8Nl8ZpFkYQODSAiYBEH1ZcvY3EM3CABbnYGACUQDcMgcVAHgBY2BkYGBhAAI4CRRBBYwAAZEAEAAAAHgBY2BkYGBgZ2AF0wxQkouBgYmBQQLEBAAClwA0AAAAeAFjYGFhYJzAwMrAwDST6QwDA0M/hGZ8zWDMyMmAChgFkDgKQMBw4CXDS6AJIAAk0YECAwMAAE4IeAAAeAFjYUAFAABQAAUAeAEFwbEBgAAIA7AAjO6u/v8ZV9QEZRQe68NaxW3CSd5W8ANVlwYrAHgBYwABXjiUAQAB8wBeAAB4AWNgZAACFiBkYGZgEFQUVGRh+MMAwkgyLBAZQagUiA8Aa/ME9wAAeAEthoUBQAAABE+zhBHMIBYwgu7u7fXnASImEoJsIGDBz+LLPiUHKQ0OLREhMQUL3r0TPS3hyykx9QXyCwmMAHgBY2BmwAsAAH0ABHgBY2BiYAgIACEGhojOAD93Xi4pLiCb19PDJQhIB4AwIzOQ3HI/4R2QYg7wCXFNYWB4sSRODcgV8HRxDKlgTF4gLcG6OEEEKF/AwHhn4vvJDEDg6ernss4poQkArdUV+3gBY2BiAAFGILYAYgkomyEACEEAnc3AysAaEKDACKKBPA6gakEgzQKVTQQAbG4C6XgBY2BgYARiPiAWAbKYQHyQCAACRAApAAAAAAEAAQABAAAADgAAAADI/wAAeAFtD4VuQjGwc983XG6uvc6tEF2MxeaL4X3Najh8Pe5w7sI6sNmVC2yljYzttk16idetgWquWNLeSRSXhJBzGZ/VTkn8/Hi9eMB4bBO68FKqKmjXu5LEqFwOT5zXarXL2vWlLyp+RUS8XYG9kqe60e5/XqF4fHzk3SyObxYIOitRmUaIbrG3s7tVQbmYcqW8L1qJpUzK5I7F+YU4GdZ0q0KqHEFeGyNx7/qK2oDQHvdGIOjqBhIdOW4SJKgnOu5Q/yHwsd1cDZ/v/BZrATOsUKkAAAB4AWNgBEIGMOZh1GHwANIqqJiRBwUDQUFeukJngJ87L5cUF5DL6+nhEgSU0wFhDmagiN/iOncgJVniGlESnJ9WUp5YlMrgmJKflKrgmZuYnhqUmphSWXgy1QaoiC3AJ8R1GgMI5EX4TAQZ7+niGFJx681BRpCrmhT+r8/zcAAyaQE+5DHxMCScZmC0mFYlAhLwdPVzWeeU0AQABiwmcQAA';
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
})();
