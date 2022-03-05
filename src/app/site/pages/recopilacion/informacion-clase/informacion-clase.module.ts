import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformacionClasePageRoutingModule } from './informacion-clase-routing.module';

import { InformacionClasePage } from './informacion-clase.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InformacionClasePageRoutingModule
  ],
  declarations: [InformacionClasePage]
})
export class InformacionClasePageModule {}
