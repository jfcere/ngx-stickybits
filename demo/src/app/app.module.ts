import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { StickybitsModule } from 'ngx-stickybits';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    StickybitsModule,
  ],
  declarations: [  AppComponent ],
  bootstrap: [AppComponent],
})
export class AppModule { }
