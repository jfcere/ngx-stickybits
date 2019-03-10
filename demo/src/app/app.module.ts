import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { StickybitsModule } from 'ngx-stickybits';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    FlexLayoutModule,
    StickybitsModule,
  ],
  declarations: [  AppComponent ],
  bootstrap: [AppComponent],
})
export class AppModule { }
