
var ws = new WebSocket("ws://localhost:3000");

var userName = prompt("Please Enter A User Name!");
console.log(userName);
var userColor = prompt("What is your favorite color?");
console.log(userColor);

ws.addEventListener("open", function(evt) {


var body = document.querySelector('body');
var chatBox = document.querySelector('ul');
var button = document.querySelector('button');
var yourSent = document.querySelector('input');

    ws.addEventListener("message", function(message) {
      console.log(message.data);
      var msg = JSON.parse(message.data);
      console.log(msg);
      // if (msg.length > 2) {
      //   msg.forEach(function(str){
      //     var li = document.createElement('li');
      //     li.innerText = str;
      //   	chatBox.appendChild(li);
      //   })
      // } else {
        var li = document.createElement('li');
        li.innerText = msg;
      	chatBox.appendChild(li);
      // }
      // var messageReceived = (msg.name + ": " + msg.newMessage);
      // console.log(messageReceived);
      // var li = document.createElement('li');
      // li.innerText = messageReceived;
    	// chatBox.appendChild(li);
   })

    button.addEventListener('click', function(){
    	var sendSent = yourSent.value;
    	ws.send(sendSent);
    	yourSent.value = '';
    });

    yourSent.addEventListener('keydown', function(e){
    	if (e.keyCode === 13){
  	    	var message = yourSent.value;
          var staySent = userName + ": " + message;
          var msg = {name: userName, newMessage: message};
	    	ws.send(JSON.stringify(msg));

        var li = document.createElement('li');
        li.style.color = userColor;
      	li.innerText = staySent;

      	chatBox.appendChild(li);
	    	yourSent.value = '';
    	}
    });
});
