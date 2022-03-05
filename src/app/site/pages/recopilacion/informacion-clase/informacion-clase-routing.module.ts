import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformacionClasePage } from './informacion-clase.page';

const routes: Routes = [
  {
    path: '',
    component: InformacionClasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformacionClasePageRoutingModule {}
