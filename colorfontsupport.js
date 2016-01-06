function clrtest() {

   try {
      // Add @font-face rule to documebt
      var tempStyle = document.createElement("style");
      tempStyle.type = "text/css";
      document.getElementsByTagName("head")[0].appendChild(tempStyle);
      // tempStyle.textContent = "@font-face{font-family:'colorfontsupport';src:url('colorfontsupport.woff?v=8') format('woff');}";
      tempStyle.textContent = "@font-face{font-family:'colorfontsupport';src:url('colorfontsupport-noglyf.ttf?v=9') format('opentype');}";
      // tempStyle.textContent = "@font-face{font-family:'colorfontsupport';src:url('bixa.woff?v=6') format('woff');}";

      // Create a 35x35 Canvas block.
      var canvasNode = document.createElement("canvas"),
          canvasSize = 32;

      // var testchar = 0xe900;
      var testchar = 0x21;

      // Doesn't seem to work, needs to be applied elsewhere in DOM before it works here
      canvasNode.setAttribute("style", "font-family:colorfontsupport !important");

      canvasNode.width = 4 * canvasSize;
      canvasNode.height = canvasSize;



      var canvasContext = canvasNode.getContext("2d");

      canvasContext.font = canvasSize + "px colorfontsupport";
      canvasContext.fillStyle = "black";
      canvasContext.strokeStyle = "black";
      canvasContext.textBaseline = "top";

      // Draw the four color font check chars
      for (var i=0; i<=4; i++) {
         canvasContext.fillText(String.fromCharCode(testchar + i), canvasSize * i, 0);
      }



      var img = new Image();
      img.onload = function() {
          canvasContext.drawImage(img, 10, 10);
      }
      img.src = "http://upload.wikimedia.org/wikipedia/commons/d/d2/Svg_example_square.svg";
      // img.src = "#testimg";




      // TEMP DEV: add canvas to body so we can see what's going on
      document.body.appendChild(canvasNode);


   }
   catch (ex) {
      console.log(ex);
   }
}

window.onload = function() {
  console.log ( clrtest() );
  console.log ( "test done." );
}


