import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReinscripcionPage } from './reinscripcion.page';

const routes: Routes = [
  {
    path: '',
    component: ReinscripcionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReinscripcionPageRoutingModule {}
