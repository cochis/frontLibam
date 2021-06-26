import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InscripcionPageRoutingModule } from './inscripcion-routing.module';

import { InscripcionPage } from './inscripcion.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InscripcionPageRoutingModule,
    ComponentsModule
  ],
  declarations: [InscripcionPage]
})
export class InscripcionPageModule {}
