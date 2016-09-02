///<reference path="../../typings/index.d.ts"/>

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule }              from './core/app.module';

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);