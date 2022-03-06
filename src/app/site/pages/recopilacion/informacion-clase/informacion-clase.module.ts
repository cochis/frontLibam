import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformacionClasePageRoutingModule } from './informacion-clase-routing.module';

import { InformacionClasePage } from './informacion-clase.page';
import { ComponentsSiteModule } from 'src/app/site/components/components.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InformacionClasePageRoutingModule,
    ReactiveFormsModule,
    ComponentsSiteModule,
    PipesModule
  ],
  declarations: [InformacionClasePage]
})
export class InformacionClasePageModule {}
