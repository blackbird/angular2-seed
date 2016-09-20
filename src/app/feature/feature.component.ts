import { Component }	from '@angular/core';

@Component({
	selector: 'feature',
	templateUrl: 'app/feature/feature.component.html'
})
export class FeatureComponent {
	message: string = 'This is a feature!';

	constructor() {

	}
}
