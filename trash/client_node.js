var WebSocket = require('ws');
var ws = new WebSocket("ws://localhost:3000");

ws.addEventListener("open", function(evt) {
  console.log('connected');
  //document.write("connected...<br>")
});

ws.addEventListener("message", function(evt) {
  console.log(evt.data);
  //document.write(evt.data + "<br>");
});
