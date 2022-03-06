import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformacionCursoPageRoutingModule } from './informacion-curso-routing.module';

import { InformacionCursoPage } from './informacion-curso.page';
import { ComponentsSiteModule } from 'src/app/site/components/components.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    InformacionCursoPageRoutingModule,
    ComponentsSiteModule,
    PipesModule
  ],
  declarations: [InformacionCursoPage]
})
export class InformacionCursoPageModule {}
