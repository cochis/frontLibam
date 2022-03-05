import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformacionTutorPage } from './informacion-tutor.page';

const routes: Routes = [
  {
    path: '',
    component: InformacionTutorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformacionTutorPageRoutingModule {}
