import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeSitePage } from './home-site.page';

const routes: Routes = [
  {
    path: '',
    component: HomeSitePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeSitePageRoutingModule {}
