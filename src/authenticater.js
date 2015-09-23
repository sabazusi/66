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
		this.twitter = twitter;

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
			if (params.oauth_verifier)
			{
				twitter.getAccessToken(requestToken, requestTokenSecret, params.oauth_verifier, 
					(error, accessToken, accessTokenSecret) => {
						event.preventDefault();
						setImmediate(() => {
							this.window.close();
						});

						this.emit(
							'authentication-complete',
							{
								accessToken: params.oauth_token,
								accessTokenSecret: params.oauth_verifier
							}
						);
					}
				);
			}
		});
		this.window.loadUrl(url);
	}
}
