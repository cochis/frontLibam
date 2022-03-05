import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformacionCursoPageRoutingModule } from './informacion-curso-routing.module';

import { InformacionCursoPage } from './informacion-curso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InformacionCursoPageRoutingModule
  ],
  declarations: [InformacionCursoPage]
})
export class InformacionCursoPageModule {}
