function clrtest() {

   try {
      var canvas = document.getElementById('svgCanvas');

      var ctx = canvas.getContext('2d');

      var data = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="100" style="background:#fff">' +
                 '<style type="text/css">@font-face{font-family:"colorfontsupport";src:url(data:application/x-font-woff;base64,d09GRgABAAAAAAZQABAAAAAAC5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABDT0xSAAAERAAAACUAAAAsABUAPENQQUwAAARsAAAAEgAAABLJAAAQT1MvMgAAAdQAAAA6AAAAYC7xJ05TVkcgAAAEgAAAAQkAAANoxnIoKWNtYXAAAAIgAAAAPQAAAI7SPhgDY3Z0IAAAAmAAAAAGAAAABgAVAABnYXNwAAAENAAAABAAAAAQABYAIWdseWYAAAJ8AAAALAAAAGgzVsfUaGVhZAAAAWwAAAAvAAAANgiLoP9oaGVhAAABnAAAABUAAAAkCAEECGhtdHgAAAIQAAAADQAAACYIAAAAbG9jYQAAAmgAAAAUAAAAGgCeAH9tYXhwAAABtAAAAB0AAAAgAhgAHm5hbWUAAAKoAAABQgAAAmLfLpCOcG9zdAAAA+wAAABIAAAAfvMNjGpzYml4AAAFjAAAAMQAAAHIrJZD03gBY2BkYADhC8cuz4znt/nKIM3CAAKXFjAJgOm9kZ9ANAsDWJyDgQlEAQAzvAkzAHgBY2BkYGBhAAI4CRRBBewAAZcAFgAAAHgBY2BkYGDgYWAF0wxQkouBgYmBQQLEBAADHgA5AAAAeAFjYGFhYJzAwMrAwDST6QwDA0M/hGZ8zWDMyMmAChgFkDgKQMBwgIHhJdAEEACS6ECBgQEA4x8HjwAAeAFjYcAOUMUBAPYACQAAAHgBY2BgYIZiGQZGBhBwAfIYwXwWBg0gzQakGRmYGBhfsvz/D1LwkgFIM4qzQ9SDVXiBaQWwOgoAAJ1tBycAAAAAFQAAAAAAAHgBY4ABDgYBBgkGVTg0AQAIDQEeeAFjYGSAAhDL0JA4PgsQMjAzMAgqCiqyMPxhAGEkGRaIjCBUCsQHAMJ4BiN4AUyKtaECMRyHv9xFcHe3lpYFkBpaWqaAx2MIRmACpmAtNLnkrz8DSjwQAO9bAYsjDBWLY+a0LZZBRpFlY7Gmws7iDF0OxAiZRjDjYnFEgZvFMXvuFssgo2iIjMWamRhZnGEhVhaXaImTxWUy4rp9NT5VyQ3DUHCP8i5gzVPK1U/5t9zvxIkZZBlmcvxumcG8PC7WSX3YxItlPsqxr31/lWRTveitUVXn3uvRo+5marfczdVmtGnUWLOle1t3ST8UvhWGvgbOfDvK6GVMhlGWD4wMU9f5fjS4QIE1EtQ4RIMYCyyRY4TgGB417x5X1DNMRAsiCwN9PB3Pn/LRu7zDjG6LLX7d4AqbVDfBFt5sI6/Y4/MOCd0DCqZayKOm/1o4AxPkhLd/fCYYHvHy1SNkJnQ8iai9//fF++a33nu3YGTTAAB4AX1ItQGAAAxrgssvuB3AJV3wjftxGEmjFco/QhEQBlx48BHAhAUbDkJnXfr4wJPJmW1z7Cu/nT6ZURNqSj1K/vzyHYuREesAAQADAAgACgAOAAX//wAPeAFjYGBgBmI+IFYAshgZGICYiYERCNlBNFiWBYjZGBgACKcAUgAAAAAAAAEAAQABAAAADgAAAADI/wAAeAHlEoVu6zDQY/gK68YQTrluhRN1or29gShUjMP89wuNUTw40zEaFbBd3itoKV8I7SO0tIG20HL+MiW+XWgsyzl+3B+mFsXx2A/mjk1AYHnAY1t3jLk9JXD574xpw3Cw3Q/iKc417YDALAzdLsclScImEuv4U07keZ7LNaBS6aZ0bptvKQqdTocrpfA0pljEVDU6ZjRVN6e+E9kGAXucYL5agOc5Y0ozdyYADn3VDiaObxEIdJWOD4VTRjiCPEtXDWd4MqeUwI7caLbaHcA4tzwvvIyeX7cYMJfbFIkPflwbxL/aBoEX5fJ6+if4r3ZDKpLj627UzkbF/RR9aE/FrN/nnboDK3by1AAAAHgBY2AEQgYw5mHUYfAA0hZQ3AbEV7Bjxj0oGAgK8tIVOgP83Hm5pLiAXF5PD5cgqLmMHGxAUl70SCdYwsUxhGNmcgIQALmsDIztC/1ApjJ4uvq5rHNKaKKXaYw6IMzBDBTxW1znDqQkS1wjSoLz00rKE4tSGRxT8pNSFTxzE9NTg1ITUyoLT6baABWxBfiEuE5jAIG8CJ+JIONBjqi49eYgI8h9TQr/1+d5OACZtAAf8ph4GBJOMzBaTKsSQfYnAALJTB8=) format("woff");}</style>'+
                 '<text x="0" y="20" fill="black" font-family="colorfontsupport" font-size="20">&#xe904;<tspan x="0" dy="20">&#xe903;</tspan><tspan x="0" dy="20">&#xe902;</tspan><tspan x="0" dy="20">&#xe901;</tspan><tspan x="0" dy="20">&#xe900;</tspan></text>'+
                 '</svg>';

      var img = new Image();

      img.src = 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(data);

      img.onload = function () {
        ctx.drawImage(img, 0, 0);

        console.log(ctx.getImageData( 10, 10, 1, 1).data[0]); // Normal
        console.log(ctx.getImageData( 10, 30, 1, 1).data[0]); // SVG
        console.log(ctx.getImageData( 10, 50, 1, 1).data[0]); // ---Google---
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


