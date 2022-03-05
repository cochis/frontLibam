import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformacionProfesorPageRoutingModule } from './informacion-profesor-routing.module';

import { InformacionProfesorPage } from './informacion-profesor.page';
import { ComponentsSiteModule } from 'src/app/site/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    InformacionProfesorPageRoutingModule,
    ComponentsSiteModule
  ],
  declarations: [InformacionProfesorPage]
})
export class InformacionProfesorPageModule {}
