import { Component } from '@angular/core';

import { ENV }       from '../env';

@Component({
	selector: 'app',
	templateUrl: 'app/core/app.component.html',
	styleUrls: ['app/core/app.component.css'],
	providers: []
})
export class AppComponent {
	title: string = 'Page Title';
	message: string = 'Hello World!';

	constructor() {

	}
}
