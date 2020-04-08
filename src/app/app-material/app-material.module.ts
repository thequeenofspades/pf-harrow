import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatGridListModule,
    MatSidenavModule,
  ],
  exports: [
    FlexLayoutModule,
    MatButtonModule,
    MatGridListModule,
    MatSidenavModule,
  ]
})
export class AppMaterialModule { }
