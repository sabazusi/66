import { EventEmitter } from 'events'
import Twitter from 'node-twitter-api'
import BrowserWindow from 'browser-window'
import Query from 'query-string'
import UrlParse from 'url-parse'

export default class Authenticater extends EventEmitter
{
	constructor(cKey, cSecret)
	{
		super();
		const twitter = new Twitter({
			callback: 'http://example.com',
			consumerKey: cKey,
			consumerSecret: cSecret
		});

		twitter.getRequestToken(
			(error, requestToken, requestTokenSecret, result) => {
				if (error)
				{
					console.log("request token require error");
				}
				this.window = new BrowserWindow({
					width: 640,
					height: 480,
					'node-integration' : false
				});

				this.getAccessToken(twitter, requestToken, requestTokenSecret, twitter.getAuthUrl(requestToken));
			}
		);
	}

	getAccessToken(twitter, requestToken, requestTokenSecret, url)
	{
		this.window.webContents.on('will-navigate', (event, url) => {
			var params = Query.parse(UrlParse(url).query);
			if (params.oauth_token && params.oauth_verifier)
			{
				console.log("authentication complete");
				console.log(params.oauth_token);
				console.log(params.oauth_verifier);
			}
		});
		this.window.loadUrl(url);
	}
}
