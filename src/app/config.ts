export class Config {
	OVERRIDE: boolean = false;
	ENV: string;
	DEBUG: boolean;

	constructor() {
		let request = new XMLHttpRequest();
		if(request != null) {
			let that = this;

			request.open('GET', 'app/config.json', true);
			request.onreadystatechange = function() {
				if (request.readyState == 4) {
			        if (request.status == 200) {
						let configJSON = JSON.parse(request.responseText);
						for (let key in configJSON) {
							that[key] = configJSON[key];
						}

						if(that.ENV === 'development') {
							console.log(that);
						}

						if(that.ENV === 'staging' || that.ENV === 'production') {
							if (that.OVERRIDE === true) {
								console.error('Remove "override.json" in staging and production!!!');
							}
						}
					}
			    }
			}
			request.send();
		}
		else {
			console.error('AJAX (XMLHTTP) not supported.');
		}
	}
}
