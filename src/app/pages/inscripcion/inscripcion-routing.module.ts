import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InscripciónPage } from './inscripcion.page';

const routes: Routes = [
  {
    path: '',
    component: InscripciónPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InscripciónPageRoutingModule {}
