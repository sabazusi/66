import app from 'app'
import Authenticater from './authenticater'

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
			"UOJquAqK3rJJXV60fui0vxN0r",
			"T9n25FPMKx1Z7IXsV0z6Wdp4ulZTHvPgqKi2fc7dFaVQc6V126"
		);
	}
}
