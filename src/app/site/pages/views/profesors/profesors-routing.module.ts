import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfesorsPage } from './profesors.page';

const routes: Routes = [
  {
    path: '',
    component: ProfesorsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfesorsPageRoutingModule {}
