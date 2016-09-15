import { Component } from '@angular/core';

import { ENV }       from '../env';

@Component({
	selector: 'feature',
	templateUrl: 'app/feature/feature.component.html',
	styleUrls: ['app/feature/feature.component.css'],
	providers: []
})
export class FeatureComponent {
	message: string = 'This is a feature!';

	constructor() {

	}
}
