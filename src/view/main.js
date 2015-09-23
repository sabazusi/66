import remote from 'remote'

try {
	console.log(remote.getGlobal('application').accessToken);
} catch (e) {
	console.log('hai');
}
