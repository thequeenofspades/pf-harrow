import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HarrowReadingComponent } from './harrow-reading/harrow-reading.component';


const routes: Routes = [
  {
    path: '',
    component: HarrowReadingComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
