import { EventEmitter } from 'events'
import Twitter from 'node-twitter-api'
import BrowserWindow from 'browser-window'

export default class Authenticater extends EventEmitter
{
	constructor(cKey, cSecret)
	{
		super();
		const twitter = new Twitter({
			callback: undefined,
			consumerKey: cKey,
			consumerSecret: cSecret
		});

		twitter.getRequestToken(
			(error, requestToken, requestTokenSecret, result) => {
				if (error)
				{
					console.log("authentication error");
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
		this.window.loadUrl(url);
	}
}
