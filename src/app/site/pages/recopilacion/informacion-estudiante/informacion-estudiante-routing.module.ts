import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformacionEstudiantePage } from './informacion-estudiante.page';

const routes: Routes = [
  {
    path: '',
    component: InformacionEstudiantePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformacionEstudiantePageRoutingModule {}
