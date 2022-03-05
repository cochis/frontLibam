import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformacionProfesorPage } from './informacion-profesor.page';

const routes: Routes = [
  {
    path: '',
    component: InformacionProfesorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformacionProfesorPageRoutingModule {}
