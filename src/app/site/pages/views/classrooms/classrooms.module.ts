import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClassroomsPageRoutingModule } from './classrooms-routing.module';

import { ClassroomsPage } from './classrooms.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClassroomsPageRoutingModule
  ],
  declarations: [ClassroomsPage]
})
export class ClassroomsPageModule {}
