import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformacionTutorPageRoutingModule } from './informacion-tutor-routing.module';

import { InformacionTutorPage } from './informacion-tutor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InformacionTutorPageRoutingModule
  ],
  declarations: [InformacionTutorPage]
})
export class InformacionTutorPageModule {}
