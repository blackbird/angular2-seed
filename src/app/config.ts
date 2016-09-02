export class Config {

	ENV: string;
	DEBUG: boolean;
	override: boolean = false;

	constructor() {
		var request = new XMLHttpRequest();
		request.open('get', 'app/config.json', false);
		request.send();
		var configJSON = JSON.parse(request.responseText);
		for (var key in configJSON) {
			this[key] = configJSON[key];
		}

		if(this.ENV === 'staging' || this.ENV === 'production') {
			if (this.override === true) {
				console.error('Remove override.json in staging and production!!!');
			}
		}
	}
}
