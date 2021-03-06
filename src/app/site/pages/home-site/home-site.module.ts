import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeSitePageRoutingModule } from './home-site-routing.module';

import { HomeSitePage } from './home-site.page';
import { ComponentsSiteModule } from '../../components/components.module';
 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeSitePageRoutingModule,
    ComponentsSiteModule
  ],
  declarations: [HomeSitePage]
})
export class HomeSitePageModule {}
