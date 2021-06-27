import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InscripciónPageRoutingModule } from './inscripcion-routing.module';

import { InscripciónPage } from './inscripcion.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InscripciónPageRoutingModule,
    ComponentsModule
  ],
  declarations: [InscripciónPage]
})
export class InscripciónPageModule {}
