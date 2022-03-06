import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeSitePageRoutingModule } from './home-site-routing.module';

import { HomeSitePage } from './home-site.page';
import { ComponentsSiteModule } from '../../components/components.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeSitePageRoutingModule,
    ComponentsSiteModule,
    PipesModule
  ],
  declarations: [HomeSitePage]
})
export class HomeSitePageModule {}
