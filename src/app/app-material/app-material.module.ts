import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClipboardModule } from '@angular/cdk/clipboard';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ClipboardModule,
    FlexLayoutModule,
    MatButtonModule,
    MatGridListModule,
    MatSidenavModule,
    MatSnackBarModule,
  ],
  exports: [
    ClipboardModule,
    FlexLayoutModule,
    MatButtonModule,
    MatGridListModule,
    MatSidenavModule,
    MatSnackBarModule,
  ]
})
export class AppMaterialModule { }
