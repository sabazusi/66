"use strict";

function Twitter() {}
Twitter.prototype = {
		consumerKey:	"vh0cEe2hg4xGoVKMd9R6Lv1MZ",
		consumerSecret: "gkOokWds3lgQftoFIMhvC80j7oyHzUIkahLiukWBW4FYRywLGU",
		accessToken:	"31421767-QnR8bQQpNyMaDve2wNOCVZPu23WqZd3pNtrJ0NkfB",
		tokenSecret:	"8wIpRmi0xuS7VjzKKAxHc2YuujKTalZVGRd8lW4zUjo6Q"
};
Twitter.prototype.get = function(api, content) {
	var accessor = {
		consumerSecret: this.consumerSecret,
		tokenSecret: this.tokenSecret
	};
 
	var message = {
		method: "GET",
		action: api,
		parameters: {
			oauth_version: "1.0",
			oauth_signature_method: "HMAC-SHA1",
			oauth_consumer_key: this.consumerKey,
			oauth_token: this.accessToken
		}
	};
	for (var key in content) {
		message.parameters[key] = content[key];
	}
	OAuth.setTimestampAndNonce(message);
	OAuth.SignatureMethod.sign(message, accessor);
	var target = OAuth.addToURL(message.action, message.parameters);
 
	var options = {
		type: message.method,
		url: target,
		dataType: "jsonp",  //ここでjsonpを指定する
		jsonp: false,	   //jQueryによるcallback関数名の埋め込みはしない
		cache: true		 //リクエストパラメータに時刻を埋め込まない
	};
	$.ajax(options);
}
 
var twitter = new Twitter();
 
function update(data){
	for( var i = 0; i < data.length; i++ ) {
		$("#timeline").append("<p>"+data[i].user.name + ' : ' + data[i].text+"</p>");
	}
}
 
$(function(){
	//オプションとコールバック関数の指定
	var content = {count: "50", callback: "update"};
	//Twitter APIの呼び出し
	twitter.get("https://api.twitter.com/1.1/statuses/home_timeline.json", content)
});
