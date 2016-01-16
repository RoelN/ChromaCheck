function clrtest() {

   try {
      var canvas = document.getElementById('svgCanvas');

      var ctx = canvas.getContext('2d');

      var data = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="100" style="background:#fff">' +
                 '<style type="text/css">@font-face{font-family:"colorfontsupport";src:url(data:application/x-font-woff;base64,d09GRgABAAAAAAUEABAAAAAABhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABDQkRUAAACzAAAAGAAAABlKWauy0NCTEMAAAMsAAAAMAAAAFDwXcDbQ09MUgAAA1wAAAAXAAAAGAACACZDUEFMAAADdAAAABIAAAASyQAAEE9TLzIAAAHUAAAAOgAAAGAX8SdOU1ZHIAAAA4gAAADaAAABQQ+5oP9jbWFwAAACHAAAACcAAAAsAA3pN2dseWYAAAJUAAAAJgAAADgzUzQ+aGVhZAAAAWwAAAAuAAAANgiOkHRoaGVhAAABnAAAABUAAAAkCAEEAmhtdHgAAAIQAAAACwAAABAEAAAAbG9jYQAAAkQAAAAOAAAAEAAnADZtYXhwAAABtAAAAB0AAAAgAhMAHm5hbWUAAAJ8AAAAQQAAAEoEnAzFcG9zdAAAAsAAAAAMAAAAIAADAABzYml4AAAEZAAAAJ4AAAEYJUa0bXgBY2BkYADhKxsjleL5bb4ySLMwgMClBUwCYPqAZzqIZmEAi3MwMIEoAPxtB5kAAHgBY2BkYGBhAAI4CRRBBYwAAZEAEAAAAHgBY2BkYGBgZ2AF0wxQkouBgYmBQQLEBAAClwA0AAAAeAFjYGFhYJzAwMrAwDST6QwDA0M/hGZ8zWDMyMmAChgFkDgKQMBw4CXDS6AJIAAk0YECAwMAAE4IeAAAeAFjYUAFAABQAAUAeAEFwbEBgAAIA7AAjO6u/v8ZV9QEZRQe68NaxW3CSd5W8ANVlwYrAHgBYwABXjiUAQAB8wBeAAB4AWNgZAACFiBkYGZgEFQUVGRh+MMAwkgyLBAZQagUiA8Aa/ME9wAAeAEthgUBgwAABG8bWoIEtCAAGgB39/boXg/4ovHjI6h80OHP34ctCnYSagIawmsjcmaMa0c6GgI8EibmE+NNCWoAAAB4AWNgZsALAAB9AAR4AWNgYmAICAAhBoaIzgA/d14uKS4gm9fTwyUISAeAMCMzkNxyP+EdkGIO8AlxTWFgeLEkTg3IFfB0cQypYExeIC3BujhBBChfwMB4Z+L7yQxA4Onq57LOKaEJAK3VFft4AWNgYgABRiC2AGIJKJshAAhBAJ3NwMrAGhCgwAiigTwOoGpBIM0ClU0EAGxuAul4AWNgYGAEYj4gFgGymEB8kAgAAkQAKQAAAAABAAEAAQAAAA4AAAAAyP8AAHgBbQ/FVsNAMLjzDfMG1xVctr1xKiecU9I2vnH/eyI4jLsoDSy2ckKZqVFRVmtz57pfehJyPU7swBfIDimC7o+Cse2bAh/ubw7Osd9bvE5yE+pKPxFopWl4SUhRFIfF0WEQm4RTSkldgV3JZSlt3/2vkF1cXJA2i9938manNpT6wVAbuWYcZP5YoK8XQGtklB+3AsGuw6asQusEIY01PzGC2BOYjDSpb7P9A7aD9a2hllpg2FIKXDvitAYEqDtv32cNGvndpDCgnWjcT/0KCKSe17zWewP33lUrAAB4AWNgBEIGMOZh1GHwANIqqJiRBwUDQUFeukJngJ87L5cUF5DL6+nhEgSU0wFhDmagiN/iOncgJVniGlESnJ9WUp5YlMrgmJKflKrgmZuYnhqUmphSWXgy1QaoiC3AJ8R1GgMI5EX4TAQZ7+niGFJx681BRpCrmhT+r8/zcAAyaQE+5DHxMCScZmC0mFYlAhLwdPVzWeeU0AQABiwmcQAA) format("woff");}</style>'+
                 '<text x="0" y="20" fill="black" font-family="colorfontsupport" font-size="20">&#xe904;<tspan x="0" dy="20">&#xe903;</tspan><tspan x="0" dy="20">&#xe902;</tspan><tspan x="0" dy="20">&#xe901;</tspan><tspan x="0" dy="20">&#xe900;</tspan></text>'+
                 '</svg>';

      var img = new Image();

      img.src = 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(data);

      img.onload = function () {
        ctx.drawImage(img, 0, 0);

        console.log(ctx.getImageData( 10, 10, 1, 1).data[0]); // Normal
        console.log(ctx.getImageData( 10, 30, 1, 1).data[0]); // SVG
        console.log(ctx.getImageData( 10, 50, 1, 1).data[0]); // CBDT/CBLC
        console.log(ctx.getImageData( 10, 70, 1, 1).data[0]); // SBIX
        console.log(ctx.getImageData( 10, 90, 1, 1).data[0]); // COLR/CPAL
      }
   }
   catch (ex) {
      console.log(ex);
      return false;
   }
}

window.onload = function() {
  console.log ( clrtest() );
}


