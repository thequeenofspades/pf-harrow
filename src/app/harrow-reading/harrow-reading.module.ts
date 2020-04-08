import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HarrowReadingRoutingModule } from './harrow-reading-routing.module';
import { AppMaterialModule } from '../app-material/app-material.module';
import { HarrowReadingComponent } from './harrow-reading.component';


@NgModule({
  declarations: [
    HarrowReadingComponent
  ],
  imports: [
    CommonModule,
    HarrowReadingRoutingModule,
    AppMaterialModule,
  ]
})
export class HarrowReadingModule { }
