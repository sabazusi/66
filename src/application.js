import app from 'app'
import Authenticater from './authenticater'
import BrowserWindow from 'browser-window'

export default class Application
{
	constructor()
	{
		this.mainWindow = null;
	}

	run()
	{
		app.on('window-all-closed', () => {});
		app.on('ready', this.onReady.bind(this));
	}


	onReady()
	{
		this.authentication();
	}

	authentication()
	{
		new Authenticater(
			"VH7q2bCsqvp3Jf66JofLFR2wn",
			"w4zkY8kukBNAHEOuxqDAaXdXFXmfEDiqIg5N4ZE9PYDhl664yL"
		).on(
			'authentication-complete',
			this.onAuthenticationCompleteHadnler.bind(this)
		);
	}

	onAuthenticationCompleteHadnler({accessToken, accessTokenSecret}) {
		this.window = new BrowserWindow({
			width: 640,
			height: 480,
			'node-integration' : false
		});
		this.window.loadUrl(`file://${__dirname}/view/main.html`);
	}
}
