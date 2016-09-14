import { NgModule, enableProdMode } from '@angular/core';
import { BrowserModule }            from '@angular/platform-browser';

import { ENV }                      from './env';
import { AppComponent }             from './core/app.component';

if(ENV.NAME === 'production') { enableProdMode(); }

@NgModule({
	imports:      [BrowserModule],
	declarations: [AppComponent],
	bootstrap:    [AppComponent]
})
export class AppModule {}
