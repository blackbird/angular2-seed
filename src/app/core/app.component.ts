import { Component } from '@angular/core';

import { ENV }      from '../env';

@Component({
	selector: 'app',
	templateUrl: 'app/core/app.html',
	styleUrls: ['app/core/app.css'],
	providers: []
})
export class AppComponent {
	message: string = 'Hello World!';

	constructor() {
		
	}
}
