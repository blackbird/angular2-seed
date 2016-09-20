import { Component }	from '@angular/core';

@Component({
	selector: 'app',
	templateUrl: 'app/core/app.component.html'
})
export class AppComponent {
	title: string = 'Page Title';
	message: string = 'Hello World!';

	constructor() {

	}
}
