export class Debug {
	private static KEYWORD = 'enabled';

	static enable(enabled: boolean) {
		if(enabled) {
			localStorage.setItem('debug', this.KEYWORD);
		}
		else {
			localStorage.removeItem('debug');
		}
	}

	static isEnabled(): boolean {
		return localStorage.getItem('debug') === this.KEYWORD;
	}

	@debugOnly
	static log(message: any) {
		console.log(message);
	}
}

function debugOnly(target: Function, key: string, value: any) {
	return {
		value: function (...args: any[]) {
			if(Debug.isEnabled()) {
				var result = value.value.apply(this, args);
				return result;
			}
			else {
				return function() {};
			}
		}
	}
}
