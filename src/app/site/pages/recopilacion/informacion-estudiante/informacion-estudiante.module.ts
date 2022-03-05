import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformacionEstudiantePageRoutingModule } from './informacion-estudiante-routing.module';

import { InformacionEstudiantePage } from './informacion-estudiante.page';
import { ComponentsSiteModule } from 'src/app/site/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    InformacionEstudiantePageRoutingModule,
    ComponentsSiteModule
  ],
  declarations: [InformacionEstudiantePage]
})
export class InformacionEstudiantePageModule {}
