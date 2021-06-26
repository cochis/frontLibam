import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReinscripcionPageRoutingModule } from './reinscripcion-routing.module';

import { ReinscripcionPage } from './reinscripcion.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReinscripcionPageRoutingModule,
    ComponentsModule,
    NgxDatatableModule
    
  ],
  declarations: [ReinscripcionPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReinscripcionPageModule {}
