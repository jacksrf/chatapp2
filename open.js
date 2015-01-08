var ws = new WebSocket("ws://104.236.70.216:3000");

var userName = document.getElementById("userName");
var avatar = document.getElementById("avatar");
var color = document.getElementById("color");
var enter = document.getElementById("enter");

var currentUserName = "";

var user = {type: "profile", name: userName, img: avatar, color: color};



ws.addEventListener("open", function(evt){
	console.log("Connected to server");
});

enter.addEventListener("click", function(){
    var login = document.getElementById("container");
    var chat = document.getElementById("chatBody");
		var menu = document.getElementById("menu");
		var menuButton = document.getElementById("menuButton");

    var avatarHolder = document.getElementById("avatarHolder");
    var avatarPic = document.getElementById("avatarPic");
    var nameProf = document.getElementById("nameProf");
    var nameHolder = document.getElementById("nameHolder");

    if (avatar.value === ""){
      avatarPic.style.backgroundImage = "url(htmltag.png)";
      avatarPic.style.backgroundColor = "#05EDFF";
    } else {
			avatarPic.style.backgroundColor = "white";
      avatarPic.style.backgroundImage = "url('" + avatar.value + "')";
    }
    nameProf.innerHTML = userName.value;
    nameHolder.appendChild(nameProf);

    var msgHolder = document.getElementById("msgHolder");
    var msgTime = document.getElementById("msgTime");
    var msg = document.getElementById("msg");

    var timeStamp = moment().format('h:mm a');

    msgTime.innerHTML = timeStamp;
    msgHolder.appendChild(msgTime);
    msg.innerText = "Welcome to the chat " + userName.value + " !";
    msgHolder.appendChild(msg);

     var send_obj = new buildSendObj("msg", userName.value);
	  //  console.log(send_obj);
		  // send_obj.changeColor();
  	 var j_send_obj = JSON.stringify(send_obj);
    //  console.log(j_send_obj);
  	 ws.send(j_send_obj);


     currentUserName = userName.value;
     console.log(currentUserName);


    login.style.visibility = "hidden";
    chat.style.visibility = "visible";

		menuButton.style.visibility = "visible";
		menu.appendChild(menuButton);

    });

var onlineList = [];
// uer list
var liList = [];
//chat list
var ul = document.getElementById("chatMessages");
//textBox
var textBox = document.getElementById("textBox");

ws.addEventListener("open", function(evt){
	console.log("Connected to server");
});

ws.addEventListener("message", function(evt){
	var msg_obj = JSON.parse(evt.data);
	var type = msg_obj.type;
	// console.log(msg_obj);
	if(type === "msg"){
		chatMessages(msg_obj);
	}else if(type === "add_chat"){
		addCurrent(msg_obj);
	}else if(type === "delete"){
		deleteOffline(msg_obj);
	}else if(type === "add_msg" || type === 'off_msg'){
		onlineMsg(msg_obj);
	}else if(type === "ban" || type === "server"){
		serverMsg(msg_obj);
	}

});

//message coming from server (admin,online,offline,ban)
var serverMsg = function(message_obj){
	console.log("ban message");

	var inner = message_obj.msg;

    var timeStamp = moment().format('h:mm a');
    var chatbox = document.getElementById("chatbox");
    var textBox = document.getElementById("textBox")
    var msgHolder = document.createElement("span");
    var msgAvatar = document.createElement("img");
    var msgName = document.createElement("p");
    var msgTime = document.createElement("p");
    var msg = document.createElement("p");
    var userName = document.getElementById("userName");
    var avatar = document.getElementById("avatar");
    var color = document.getElementById("color");

     msgHolder.setAttribute("id","msgHolder");
    chatbox.appendChild(msgHolder);
     msgAvatar.style.backgroundImage = "url('robot.png')";
     msgAvatar.setAttribute("id","msgAvatar");
    msgHolder.appendChild(msgAvatar);
     msgName.innerHTML = "ChatterBot";
     msgName.setAttribute("id","msgName");
    msgHolder.appendChild(msgName);
     msgTime.innerHTML = timeStamp;
     msgTime.setAttribute("id","msgTime");
    msgHolder.appendChild(msgTime);
     msg.innerHTML = inner;
     msg.setAttribute("id","msg");
    msgHolder.appendChild(msg);

    var first = chatbox.firstChild;
    chatbox.insertBefore(msgHolder, first);
}

//online list add
var addCurrent = function(message_obj){
	var ul = document.getElementById("loggedList");
	var li = document.createElement("li");
	li.innerHTML = message_obj.name;
	ul.appendChild(li);
	onlineList.push(li);
	li.addEventListener("click", function(){
		textBox.value = "/w " + message_obj.name + " ";
	})
}

//remove someone from online list
var deleteOffline = function(message_obj){
	onlineList.forEach(function(names){
		if(names.innerHTML === message_obj.name){
			names.remove();
		}
	})
};

var count = 0;

//on or off line chat notice
var onlineMsg = function(message_obj){
	var name = message_obj.name;
  console.log(name);
if (name !== currentUserName) {
	if( message_obj.type === "add_msg"){
		var inner = name + " has entered the chat";
	}else if (message_obj.type === "off_msg"){
		var inner = name + " has left the chat";
	}

    var timeStamp = moment().format('h:mm a');
    var chatbox = document.getElementById("chatbox");
    var textBox = document.getElementById("textBox")
    var msgHolder = document.createElement("span");
    var msgAvatar = document.createElement("img");
    var msgName = document.createElement("p");
    var msgTime = document.createElement("p");
    var msg = document.createElement("p");
    var userName = document.getElementById("userName");
    var avatar = document.getElementById("avatar");
    var color = document.getElementById("color");

     msgHolder.setAttribute("id","msgHolder");
    chatbox.appendChild(msgHolder);
     msgAvatar.style.backgroundImage = "url('robot.png')";
     msgAvatar.setAttribute("id","msgAvatar");
    msgHolder.appendChild(msgAvatar);
     msgName.innerHTML = "ChatterBot";
     msgName.setAttribute("id","msgName");
    msgHolder.appendChild(msgName);
     msgTime.innerHTML = timeStamp;
     msgTime.setAttribute("id","msgTime");
    msgHolder.appendChild(msgTime);
     msg.innerHTML = inner;
     msg.setAttribute("id","msg");
    msgHolder.appendChild(msg);

    var first = chatbox.firstChild;
    chatbox.insertBefore(msgHolder, first);
  }
}
	// if(count % 2 === 0){
	// 	li.setAttribute("class","even");
	// }else{
	// 	li.setAttribute("class","odd");
	// }
	// count++;
	// li.innerHTML = inner;
	// liList.push(li);
	// var first = ul.firstChild;
	// ul.insertBefore(li, first);

//
var chatMessages = function(message_obj){
	var name = message_obj.name
	var incomingMessage = message_obj.msg;
  var url = message_obj.url;
	var artMessage = "";

	var split = incomingMessage.split(" ");
	for (i=0; i<split.length; i++) {
		if (split[i] === "Sniper") {
		 var change = split.splice(i, 1, '︻デ┳═ー');
		 artMessage = change.join(",");
		}
	}

	if (artMessage === "") {
		var message = incomingMessage;
	} else {
		var message = artMessage;
	}


  // var split = message.split(" ");
	// split.forEach(function(elem){
		var l = incomingMessage.length;
		var last3 = incomingMessage.charAt(l-3) + incomingMessage.charAt(l-2) + incomingMessage.charAt(l-1);
		var first4 = incomingMessage.charAt(0) + incomingMessage.charAt(1) + incomingMessage.charAt(2) + incomingMessage.charAt(3);
if (message_obj.whisper) {

			if(last3 === "png" || last3 === "bmp" || last3 === "jpg" || last3 === "gif" || last3 === "peg"){

				var timeStamp = moment().format('h:mm a');
				var chatbox = document.getElementById("chatbox");
				var textBox = document.getElementById("textBox")
				var msgHolder = document.createElement("span");
				var msgAvatar = document.createElement("img");
				var msgName = document.createElement("p");
				var msgTime = document.createElement("p");
				var msg = document.createElement("p");
				var userName = document.getElementById("userName");
				var avatar = document.getElementById("avatar");
				var color = document.getElementById("color");
				var img = document.createElement("img");

				msgHolder.setAttribute("id","msgHolder");
				chatbox.appendChild(msgHolder);
				msgAvatar.style.backgroundImage = "url('" + url + "')";
				msgAvatar.style.backgroundSize = "cover";
				msgAvatar.setAttribute("id","msgAvatar");
				msgHolder.appendChild(msgAvatar);
				msgName.innerHTML = name;
				msgName.setAttribute("id","msgName");
				msgHolder.appendChild(msgName);
				msgTime.innerHTML = timeStamp;
				msgTime.setAttribute("id","msgTime");
				msgHolder.appendChild(msgTime);
				//  msg.innerHTML = message;
				msg.setAttribute("id","msg");
				msgHolder.appendChild(msg);
				img.innerHTML = " Private Message: ";
				img.setAttribute("src", message);
				// img.setAttribute("width", "100%");
				img.setAttribute("width", "300px");
				// img.setAttribute("max-height", "500");
				msg.appendChild(img);

				var first = chatbox.firstChild;
				chatbox.insertBefore(msgHolder, first);

		} else if (first4 === "http") {
			messagePost =" Private Message: " + message;

			var timeStamp = moment().format('h:mm a');
			var chatbox = document.getElementById("chatbox");
			var textBox = document.getElementById("textBox")
			var msgHolder = document.createElement("span");
			var msgAvatar = document.createElement("img");
			var msgName = document.createElement("p");
			var msgTime = document.createElement("p");
			var msg = document.createElement("p");
			var userName = document.getElementById("userName");
			var avatar = document.getElementById("avatar");
			var color = document.getElementById("color");
			var a = document.createElement("a");
			var p = document.createElement("p");

			msgHolder.setAttribute("id","msgHolder");
			chatbox.appendChild(msgHolder);
			msgAvatar.style.backgroundImage = "url('" + url + "')";
			msgAvatar.style.backgroundSize = "cover";
			msgAvatar.setAttribute("id","msgAvatar");
			msgHolder.appendChild(msgAvatar);
			msgName.innerHTML = name;
			msgName.setAttribute("id","msgName");
			msgHolder.appendChild(msgName);
			msgTime.innerHTML = timeStamp;
			msgTime.setAttribute("id","msgTime");
			msgHolder.appendChild(msgTime);
			//  msg.innerHTML = message;
			msg.setAttribute("id","msg");
			msgHolder.appendChild(msg);
			a.innerHTML = messagePost;
			a.setAttribute("href", message);
			msg.appendChild(a);

			var first = chatbox.firstChild;
			chatbox.insertBefore(msgHolder, first);

		} else {

			messagePost =" Private Message: " + message;
			var timeStamp = moment().format('h:mm a');
			var chatbox = document.getElementById("chatbox");
			var textBox = document.getElementById("textBox")
			var msgHolder = document.createElement("span");
			var msgAvatar = document.createElement("img");
			var msgName = document.createElement("p");
			var msgTime = document.createElement("p");
			var msg = document.createElement("p");
			var userName = document.getElementById("userName");
			var avatar = document.getElementById("avatar");
			var color = document.getElementById("color");

			msgHolder.setAttribute("id","msgHolder");
			chatbox.appendChild(msgHolder);
				msgAvatar.style.backgroundImage = "url('" + url + "')";
				msgAvatar.style.backgroundSize = "cover";
				msgAvatar.setAttribute("id","msgAvatar");
			msgHolder.appendChild(msgAvatar);
				msgName.innerHTML = name;
				msgName.setAttribute("id","msgName");
			msgHolder.appendChild(msgName);
				msgTime.innerHTML = timeStamp;
				msgTime.setAttribute("id","msgTime");
			msgHolder.appendChild(msgTime);
				msg.innerHTML = messagePost;
				msg.setAttribute("id","msg");
			msgHolder.appendChild(msg);

			var first = chatbox.firstChild;
			chatbox.insertBefore(msgHolder, first);
		}

} else {
		if(last3 === "png" || last3 === "bmp" || last3 === "jpg" || last3 === "gif" || last3 === "peg"){
			var timeStamp = moment().format('h:mm a');
      var chatbox = document.getElementById("chatbox");
      var textBox = document.getElementById("textBox")
      var msgHolder = document.createElement("span");
      var msgAvatar = document.createElement("img");
      var msgName = document.createElement("p");
      var msgTime = document.createElement("p");
      var msg = document.createElement("p");
      var userName = document.getElementById("userName");
      var avatar = document.getElementById("avatar");
      var color = document.getElementById("color");
      var img = document.createElement("img");

       msgHolder.setAttribute("id","msgHolder");
      chatbox.appendChild(msgHolder);
       msgAvatar.style.backgroundImage = "url('" + url + "')";
			msgAvatar.style.backgroundSize = "cover";
       msgAvatar.setAttribute("id","msgAvatar");
      msgHolder.appendChild(msgAvatar);
       msgName.innerHTML = name;
       msgName.setAttribute("id","msgName");
      msgHolder.appendChild(msgName);
       msgTime.innerHTML = timeStamp;
       msgTime.setAttribute("id","msgTime");
      msgHolder.appendChild(msgTime);
      //  msg.innerHTML = message;
       msg.setAttribute("id","msg");
      msgHolder.appendChild(msg);
      img.setAttribute("src", message);
			// img.setAttribute("width", "100%");
      img.setAttribute("width", "300px");
			// img.setAttribute("max-height", "500");
			msg.appendChild(img);

      var first = chatbox.firstChild;
      chatbox.insertBefore(msgHolder, first);
	} else if (first4 === "http") {
		var timeStamp = moment().format('h:mm a');
		var chatbox = document.getElementById("chatbox");
		var textBox = document.getElementById("textBox")
		var msgHolder = document.createElement("span");
		var msgAvatar = document.createElement("img");
		var msgName = document.createElement("p");
		var msgTime = document.createElement("p");
		var msg = document.createElement("p");
		var userName = document.getElementById("userName");
		var avatar = document.getElementById("avatar");
		var color = document.getElementById("color");
		var a = document.createElement("a");

		msgHolder.setAttribute("id","msgHolder");
		chatbox.appendChild(msgHolder);
		msgAvatar.style.backgroundImage = "url('" + url + "')";
		msgAvatar.style.backgroundSize = "cover";
		msgAvatar.setAttribute("id","msgAvatar");
		msgHolder.appendChild(msgAvatar);
		msgName.innerHTML = name;
		msgName.setAttribute("id","msgName");
		msgHolder.appendChild(msgName);
		msgTime.innerHTML = timeStamp;
		msgTime.setAttribute("id","msgTime");
		msgHolder.appendChild(msgTime);
		//  msg.innerHTML = message;
		msg.setAttribute("id","msg");
		msgHolder.appendChild(msg);
		a.innerHTML = message;
		a.setAttribute("href", message);
		msg.appendChild(a);

		var first = chatbox.firstChild;
		chatbox.insertBefore(msgHolder, first);

	} else {
    var timeStamp = moment().format('h:mm a');
    var chatbox = document.getElementById("chatbox");
    var textBox = document.getElementById("textBox")
    var msgHolder = document.createElement("span");
    var msgAvatar = document.createElement("img");
    var msgName = document.createElement("p");
    var msgTime = document.createElement("p");
    var msg = document.createElement("p");
    var userName = document.getElementById("userName");
    var avatar = document.getElementById("avatar");
    var color = document.getElementById("color");


     msgHolder.setAttribute("id","msgHolder");
    chatbox.appendChild(msgHolder);
     msgAvatar.style.backgroundImage = "url('" + url + "')";
		 msgAvatar.style.backgroundSize = "cover";
     msgAvatar.setAttribute("id","msgAvatar");
    msgHolder.appendChild(msgAvatar);
     msgName.innerHTML = name;
     msgName.setAttribute("id","msgName");
    msgHolder.appendChild(msgName);
     msgTime.innerHTML = timeStamp;
     msgTime.setAttribute("id","msgTime");
    msgHolder.appendChild(msgTime);
     msg.innerHTML = message;
     msg.setAttribute("id","msg");
    msgHolder.appendChild(msg);

    var first = chatbox.firstChild;
    chatbox.insertBefore(msgHolder, first);
  }
  }
}

	// console.log(message_obj.url)
	// console.log(url);
	// li.style.color = message_obj.color;
  // li.style.background = message_obj.url;

	// if(count % 2 === 0){
	// 	li.setAttribute("class","even");
	// }else{
	// 	li.setAttribute("class","odd");
	// }
	// count++;
	// var link_test = message.split(" ");
	// link_test.forEach(function(word){
	// 	var http = word[0] + word[1] + word[2] + word[3] + word[4] +
	// 	word[5] + word[6];
	// 	if( http === "http://"){
	// 		var replacement = "<a href='" + word + "'>" + word + "</a>";
	// 		var index = link_test.indexOf(word);
	// 		link_test[index] = replacement;
	// 	}
	// });
	// console.log(link_test);
	// console.log(message);
	// message = link_test.join(" ");
  //
	// if (message_obj.whisper){
	// 	inner = name + " whisper: " + message;
	// }else{
	// 	inner = name + ": " + message;
	// }
	// li.innerHTML = inner;
	// var split = message.split(" ");
	// split.forEach(function(elem){
	// 	var l = elem.length;
	// 	var last3 = elem.charAt(l-3) + elem.charAt(l-2) + elem.charAt(l-1);
	// 	if(last3 === "png" || last3 === "bmp" || last3 === "jpg" || last3 === "gif"){
	// 		var img = document.createElement("img");
	// 		img.setAttribute("src", elem);
	// 		img.setAttribute("width", "100");
	// 		img.setAttribute("height", "100");
	// 		li.appendChild(img);
	// }
	// });

	// liList.push(li);
	// var first = ul.firstChild;
	// ul.insertBefore(li, first);





  textBox.addEventListener("keypress", function(evt){
	    if (evt.keyCode === 13){
     var send_obj = new buildSendObj("msg", textBox.value, avatar.value);

	   var new_msg = send_obj.isWhisper(textBox.value);
    //  send_obj.isYell(new_msg);
		//   send_obj.tableFlip();
		  // send_obj.changeColor();

  		var j_send_obj = JSON.stringify(send_obj);
    	// console.log(j_send_obj);
  		ws.send(j_send_obj);
  		textBox.value = "";
  }});

  //object being sent
var buildSendObj = function(type, message, url){
	this.type = type;
	this.message = message;
	this.whisper = false;
	this.sendTo = "";
  this.url = url;
	this.isWhisper = function(input){
		var split = input.split(" ");
		if(split[0] === "/w"){
			this.whisper = true;
			this.sendTo = split[1];
			split.splice(0,2);
			new_msg = split.join(" ");
			this.message = new_msg;
			return new_msg;
      // console.log("here   " + new_msg);
			// can handle detection if the person exists here
		};
		return input;
	};

	this.isYell = function(input){
		var split = input.split(" ");
		if(split[0] === "/yell"){
			split.splice(0,1);
			var new_msg = split.join(" ");
			new_msg = new_msg.toUpperCase();
			// console.log(new_msg);
			this.message = new_msg;
		}
	};
	this.tableFlip = function(){
		var check = this.message;
		var checked = check.replace("(table flip)", "(╯°□°）╯︵ ┻━┻");
		this.message = checked;
	};
	this.changeColor = function(){
		var check = this.message;
		var split = check.split(" ");
		if(split[0] === "/color"){
			this.type = "color";
			split.splice(0,1);
		}
		var checked = split.join(" ");
		this.message = checked;
	}
};

var bad_words = ["fuck", "ass", "shit"];

var isValid = function(name){
	name = name.toUpperCase();
	var test1 = name.split(" ");
	if(test1.length != 1){
		return false;
	}
	bad_words.forEach(function(word){
		if (name === word){
			return false;
		}
	});
	return true;
}








// ws.addEventListener("open", function(evt){
// 	console.log("Connected to server");
// });
//
// ws.addEventListener("message", function(evt){
//
//
//
// });
//
//     var chatMessages = function(message_obj){
//     	var name = message_obj.name
//     	var message = message_obj.msg;
//     	console.log(message);
//     	var div = document.createElement("div");
//     	console.log(message_obj.url)
//     	console.log(url);
//     	li.style.color = message_obj.color;
//       li.style.background = message_obj.url;
//
//     	if(count % 2 === 0){
//     		li.setAttribute("class","even");
//     	}else{
//     		li.setAttribute("class","odd");
//     	}
//     	count++;
//     	var link_test = message.split(" ");
//     	link_test.forEach(function(word){
//     		var http = word[0] + word[1] + word[2] + word[3] + word[4] +
//     		word[5] + word[6];
//     		if( http === "http://"){
//     			var replacement = "<a href='" + word + "'>" + word + "</a>";
//     			var index = link_test.indexOf(word);
//     			link_test[index] = replacement;
//     		}
//     	});
//     	console.log(link_test);
//     	console.log(message);
//     	message = link_test.join(" ");
//
//     	if (message_obj.whisper){
//     		inner = name + " whisper: " + message;
//     	}else{
//     		inner = name + ": " + message;
//     	}
//     	li.innerHTML = inner;
//     	var split = message.split(" ");
//     	split.forEach(function(elem){
//     		var l = elem.length;
//     		var last3 = elem.charAt(l-3) + elem.charAt(l-2) + elem.charAt(l-1);
//     		if(last3 === "png" || last3 === "bmp" || last3 === "jpg" || last3 === "gif"){
//     			var img = document.createElement("img");
//     			img.setAttribute("src", elem);
//     			img.setAttribute("width", "100");
//     			img.setAttribute("height", "100");
//     			li.appendChild(img);
//     	}
//     	});
//
