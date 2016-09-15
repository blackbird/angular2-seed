import { NgModule, enableProdMode } from '@angular/core';
import { BrowserModule }            from '@angular/platform-browser';

import { ENV }                      from './env';
import { AppComponent }             from './core/app.component';
import { FeatureComponent }         from './feature/feature';

if(ENV.NAME === 'production') { enableProdMode(); }

@NgModule({
	imports:      [BrowserModule],
	declarations: [AppComponent, FeatureComponent],
	bootstrap:    [AppComponent]
})
export class AppModule {}
