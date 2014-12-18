var WSS = require("ws").Server;
var server = new WSS({port: 3000});

var clients = [];
var history = [];
var userNames = [];

server.on("connection", function(connected) {

  clients.push(connected);
  console.log(clients.length);

  if (history.length > 0) {
    history.forEach(function(msg){
      connected.send(msg);
    })
  }

  connected.on("message", function(message) {

    history.push(message);
    clients.forEach(function(client) {
        client.send(message);
      })
  });

  connected.on('close', function () {
    var x = clients.indexOf(connected);
    console.log(x);
    clients.splice(x, 1);
    console.log('User ' + x + ' has disconnected');
    console.log(clients.length);


    });
});
