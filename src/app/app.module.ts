import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppMaterialModule } from './app-material/app-material.module';
import { HarrowReadingModule } from './harrow-reading/harrow-reading.module';

import { AppComponent } from './app.component';
import { HelpDialogComponent } from './help-dialog/help-dialog.component';
import { CardPreviewComponent } from './card-preview/card-preview.component';

@NgModule({
  declarations: [
    AppComponent,
    HelpDialogComponent,
    CardPreviewComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    HarrowReadingModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
