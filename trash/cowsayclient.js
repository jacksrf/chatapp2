var cowsay = require("cowsay");
var Websocket = require("ws");
var ws = new Websocket("ws://localhost:3000");

ws.on("open", function(){
  console.log("connected to the server");

  ws.on("message",function(message){
    var moo = cowsay.say({text: message});
      ws.send(moo);
  });
  
});
