import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { StickybitsDirective } from './stickybits.directive';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [StickybitsDirective],
  declarations: [StickybitsDirective],
})
export class StickybitsModule { }
