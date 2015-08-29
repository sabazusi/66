var TimeLine = React.createClass({
	getInitialState: function() {
		return {tweets: []};
	},

	componentDidMount: function(){
		this.update();
	},

	callbackFunc: function(data){
		this.setState({tweets:data});
	},

	update: function(){
		var message = {
			method: "GET",
			action: "https://api.twitter.com/1.1/statuses/home_timeline.json",
			parameters: {
				oauth_version: "1.0",
				oauth_signature_method: "HMAC-SHA1",
				oauth_consumer_key: "vh0cEe2hg4xGoVKMd9R6Lv1MZ",
				oauth_token: "31421767-QnR8bQQpNyMaDve2wNOCVZPu23WqZd3pNtrJ0NkfB",
				count: "50"
			},
		};
		var accessor = {
			consumerSecret: "gkOokWds3lgQftoFIMhvC80j7oyHzUIkahLiukWBW4FYRywLGU",
			tokenSecret: "8wIpRmi0xuS7VjzKKAxHc2YuujKTalZVGRd8lW4zUjo6Q"
		};

		OAuth.setTimestampAndNonce(message);
		OAuth.SignatureMethod.sign(message, accessor);
		var target = OAuth.addToURL(message.action, message.parameters);

		var options = {
			type: message.method,
			url: target,
			dataType: "jsonp",
			jsonp: false,
			cache: true,
			success: function(data){
			}
		};
		$.ajax(options);
	},

	render: function() {
		console.log(this.state.tweets);
		return (
			<div className="twitterTimeLine">
				timeline
			</div>
		);
	}
});

var Tweet = React.createClass({
	render: function() {
		return (
			<div className="tweet">
			user: {this.props.user.name}
			tweet: {this.props.tweet}
			</div>
		);
	}
});




React.render(
	<TimeLine/>,
	document.getElementById('timeline')
);
