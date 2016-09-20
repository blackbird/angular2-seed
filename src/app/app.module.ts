import { NgModule, enableProdMode }	from '@angular/core';
import { BrowserModule }			from '@angular/platform-browser';

import { Debug }					from './utils/utils';
import { Environment }				from './shared/environment';

import { AppComponent }				from './core/app.component';
import { FeatureComponent }			from './feature/feature';

Debug.enable(true);

// Get configuration JSON
let request = new XMLHttpRequest();
request.open('get', 'app/env.json', false);
request.send();

// Configure Environment object to be injected with values from JSON
let environment = new Environment(JSON.parse(request.responseText));
Debug.log(environment);
if(environment.NAME === 'production') { enableProdMode(); }

@NgModule({
	imports:      [BrowserModule],
	declarations: [AppComponent, FeatureComponent],
	bootstrap:    [AppComponent],
	providers:		[
		{provide: Environment, useValue: environment}
	]
})
export class AppModule {}
