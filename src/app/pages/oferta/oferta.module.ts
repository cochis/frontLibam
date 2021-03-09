import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OfertaPageRoutingModule } from './oferta-routing.module';

import { OfertaPage } from './oferta.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OfertaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [OfertaPage]
})
export class OfertaPageModule {}
