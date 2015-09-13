import { EventEmitter } from 'events'
import Twitter from 'node-twitter-api'
import BrowserWindow from 'browser-window'

export default class Authenticater extends EventEmitter
{
	constructor(consumerKey, consumerSecret)
	{
		super();
		const twitter = new Twitter({
			callback: 'http://example.com',
			consumerKey: consumerKey,
			consumerSecret: consumerSecret
		});

		twitter.getRequestToken(
			(error, requestToken, requestTokenSecret, result) => {
				this.window = new BrowserWindow({
					width: 640,
					height: 480
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
