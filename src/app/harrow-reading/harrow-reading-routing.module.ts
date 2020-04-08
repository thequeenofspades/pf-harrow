import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HarrowReadingComponent } from './harrow-reading.component';


const routes: Routes = [
  {
    path: 'reading/:c1/:c2/:c3/:c4/:c5/:c6/:c7/:c8/:c9', component: HarrowReadingComponent
  },
  {
    path: 'reading', component: HarrowReadingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HarrowReadingRoutingModule { }
