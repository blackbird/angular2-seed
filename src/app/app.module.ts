import { NgModule, enableProdMode }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { Config }        from './config';

import { AppComponent }  from './core/app.component';

let config = new Config();
if(config.ENV === 'production') { enableProdMode(); };

@NgModule({
	imports:      [BrowserModule],
	declarations: [AppComponent],
	bootstrap:    [AppComponent]
})
export class AppModule {}
