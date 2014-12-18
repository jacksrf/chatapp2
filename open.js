// var ws = new WebSocket("ws://localhost:3000");

var userName = document.getElementById("userName");
var avatar = document.getElementById("avatar");
var color = document.getElementById("color");
var enter = document.getElementById("enter");

var user = {type: "profile", name: userName, img: avatar, color: color};

enter.addEventListener("click", function(){
    var login = document.getElementById("container");
    var chat = document.getElementById("chatBody");

    var avatarHolder = document.getElementById("avatarHolder");
    var avatarPic = document.getElementById("avatarPic");
    var nameProf = document.getElementById("nameProf");
    var nameHolder = document.getElementById("nameHolder");

    if (avatar.value === ""){
      avatarPic.style.backgroundImage = "url(htmltag.png)";
      avatarPic.style.backgroundColor = "#F4D03F";
    } else {
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
    msg.innerHTML = "Welcom to the chat " + userName.value + " !";
    msgHolder.appendChild(msg);



    login.style.visibility = "hidden";
    chat.style.visibility = "visible";
});





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
