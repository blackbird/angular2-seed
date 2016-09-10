import { Component } from '@angular/core';

import { Config }    from '../config';

@Component({
	selector: 'app',
	templateUrl: 'app/core/app.html',
	styleUrls: ['app/core/app.css'],
	providers: [Config]
})
export class AppComponent {
	message: string = 'Hello World!';

	constructor(private config: Config) {

	}
}
