var input1 = document.getElementById("userName");
var userName = input1.value;
var input2 = document.getElementById("avatar");
var avatar = input2.value;
var input3 = document.getElementById("color");
var color = input3.value;

var button = document.getElementById("enter");

var profile = function(userName, avatar, color) {
  this.name = userName;
  this.avatar = avatar;
  this.color = color;
}

button.addEventListener("keyup", function(evt){
	if (evt.keyCode === 13){
    var user = new Profile(userName, avatar, color);
}});
