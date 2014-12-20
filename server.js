var WSS = require("ws").Server;
var server = new WSS({port: 3000});

var userDb = [];
var userDbObj = userDb;
var chatHistory = [];
var banned_words = ["unctious", "dollop"];

server.on("connection", function(connection){
	var user = new User(connection);
	user.client.on("message", function(j_message_obj){
		var message_obj = JSON.parse(j_message_obj);
		var message = message_obj.message;
		var url = message_obj.url;

		if (!user.bannedWords(user, message, banned_words)){
			// sets the user names
			if(user.hasName === false){
				user.comeOnline(userDb, message, chatHistory, user, url);
			// accepts and sends messenges
			}else {
				// if(message_obj.type === "color"){
				// 	user.color = message;
				// 	var server_msg = {type:"server", msg: "You have changed your font color to " + message};
				// 	var j_server_msg = JSON.stringify(server_msg);
				// 	user.client.send(j_server_msg);
				// }else{
				console.log(url);
					user.sendMsg(userDb, message_obj, user, url);
				// }
			}
		}
	});
	connection.on("close", function(){
		user.goOffline(userDbObj, user);
	});
});

//
var jsonifyMsg = function(name1, msg1, wh, name2, color,url){
	var obj = {type:"msg", name:name1, msg:msg1, whisper: wh, sender:name2, color:color, url:url};
	var j_obj = JSON.stringify(obj);
	console.log(obj);
	return j_obj;

}


var User = function(connObj){
	this.name = "";
	this.hasName = false;
	this.currentChatRoom = 'main';
	this.color = "white";
	this.client = connObj;
	this.bannedCount = 0;
	this.url = "";
	this.hasUrl = false;

	this.bannedWords = function(user, message, banned_list){
		var split = message.split(" ");
		var word_check = false;
		var words = []
		banned_list.forEach(function(banned_word){
			split.forEach(function(word){
				if(banned_word === word.trim()){
					// console.log("in if");
					word_check = true;
				}
			})
		})
		if(word_check){
			this.bannedCount+= 1;
		}
		if(this.bannedCount === 3){
			var outgoing_msg = {type:"ban", msg:"Disconnected for using banned words too many times"};
			var j_outgoing_msg = JSON.stringify(outgoing_msg);
			user.client.send(j_outgoing_msg);
			user.client.close();
		}else if(word_check){
			var outgoing_msg = {type:"ban", msg:"Warning: Strike " + this.bannedCount +
			", 3 and your out!"};
			var j_outgoing_msg = JSON.stringify(outgoing_msg);
			user.client.send(j_outgoing_msg);
		}
		// console.log(word_check);
		return word_check;
	};

	this.comeOnline = function(userDb, name, chatHistory, user, url){
		this.name = name.trim();
		this.url = url;
		// console.log(this.url);
		userDb.forEach(function(users){
			var add = {type:"add_chat", name:users.name};
			var j_add = JSON.stringify(add);
			user.client.send(j_add);
		});
		userDb.push(this);
		var add_msg = {type:"add_msg", name:this.name, url:this.url};
		var j_add_msg = JSON.stringify(add_msg);
		var add = {type:"add_chat", name:this.name, url:this.url};
		var j_add = JSON.stringify(add);
		userDb.forEach(function(users){
			users.client.send(j_add);
			users.client.send(j_add_msg);
		});
		chatHistory.forEach( function(history){
				user.client.send(history);
			});
		this.hasName = true;
		this.hasUrl = true;
	}

	this.goOffline = function(userDb, user){
		userDb.forEach(function(users){
			if(users === user){
				index = userDb.indexOf(users);
				userDb.splice(index, 1);
			}
		});
		userDb.forEach(function(users){
			var del = {type:"delete", name:user.name};
			var j_del = JSON.stringify(del);
			users.client.send(j_del);
			var add_msg = {type:"off_msg", name:user.name};
			var j_add_msg = JSON.stringify(add_msg);
			users.client.send(j_add_msg);
		});
	}

	this.sendMsg = function(userDb, message_obj, user,url){
		var message = message_obj.message;
		if(message_obj.whisper){
			var j_w_msg = jsonifyMsg(user.name, message_obj.message, true, "", this.color, url);

			// console.log(userDb);
			// console.log(message_obj.sendTo);
			userDb.forEach(function(other_users){
				if(other_users.name === message_obj.sendTo ||
					other_users.name === user.name){
					// console.log(other_users.name);
					other_users.client.send(j_w_msg);
				}
			});
		}else{
			var reg_msg = jsonifyMsg(user.name, message, false, "", this.color, url);
			console.log("here  " + reg_msg)
			userDb.forEach(function(other_users){
				//if(other_users.name != user.name){
					other_users.client.send(reg_msg);
				//}
			});
			chatHistory.push(reg_msg);
		}
	};
};
