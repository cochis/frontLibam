import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformacionComunicadoPageRoutingModule } from './informacion-comunicado-routing.module';

import { InformacionComunicadoPage } from './informacion-comunicado.page';
import { ComponentsSiteModule } from 'src/app/site/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    InformacionComunicadoPageRoutingModule,
    ComponentsSiteModule
  ],
  declarations: [InformacionComunicadoPage]
})
export class InformacionComunicadoPageModule {}
