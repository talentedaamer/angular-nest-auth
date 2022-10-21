import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import {ConfigLoader} from "./core/config-loader";

export function configLoaderFactory(
  configLoader: ConfigLoader,
) {
  return () => configLoader.load();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    ConfigLoader,
    {
      provide: APP_INITIALIZER,
      useFactory: configLoaderFactory,
      deps: [ConfigLoader],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
