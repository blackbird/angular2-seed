export class Environment {
    NAME: string;
    DEBUG: boolean;
    OVERRIDE: boolean;

    constructor(configJSON) {
        for (var key in configJSON) {
            this[key] = configJSON[key];
        }

		if(this.NAME === 'staging' || this.NAME === 'production') {
			if (this.OVERRIDE === true) {
				console.error('"Override.json" should not be included in staging and production environments.');
			}
		}
    }
}
