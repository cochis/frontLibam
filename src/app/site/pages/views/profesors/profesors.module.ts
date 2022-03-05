import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfesorsPageRoutingModule } from './profesors-routing.module';

import { ProfesorsPage } from './profesors.page';
import { ComponentsSiteModule } from 'src/app/site/components/components.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfesorsPageRoutingModule,
    ComponentsSiteModule,
    PipesModule
  ],
  declarations: [ProfesorsPage]
})
export class ProfesorsPageModule {}
