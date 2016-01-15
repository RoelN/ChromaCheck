function clrtest() {

   try {
      var canvas = document.getElementById('svgCanvas');

      var ctx = canvas.getContext('2d');

      var data = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="100" style="background:#fff">' +
                 '<style type="text/css">@font-face{font-family:"colorfontsupport";src:url(data:application/x-font-woff;base64,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) format("woff");}</style>'+
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


