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

    avatarPic.style.backgroundImage = "url('" + avatar.value + "')";
    nameProf.innerHTML = userName.value;
    nameHolder.appendChild(nameProf);


    login.style.visibility = "hidden";
    chat.style.visibility = "visible";




});

// ws.addEventListener("open", function(evt){
// 	console.log("Connected to server");
// });
//
// ws.addEventListener("message", function(evt){
//
// });
