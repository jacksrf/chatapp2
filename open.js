var input1 = document.getElementById("userName");
var userName = input1.value;
var input2 = document.getElementById("avatar");
var avatar = input2.value;
var input3 = document.getElementById("color");
var color = input3.value;

var enter = document.getElementById("enter");

var profile = function(userName, avatar, color) {
  this.name = userName;
  this.avatar = avatar;
  this.color = color;
}

enter.addEventListener("click", function(){
	// if (evt.keyCode === 13){
    var login = document.getElementById("container");
    var chat = document.getElementById("chatBody");
    // var user = new Profile(userName, avatar, color);
    //   console.log(user);

    login.style.visibility = "hidden";
    chat.style.visibility = "visible";

// }
});
