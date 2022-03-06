import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClassroomsPageRoutingModule } from './classrooms-routing.module';

import { ClassroomsPage } from './classrooms.page';
import { ComponentsSiteModule } from 'src/app/site/components/components.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClassroomsPageRoutingModule,
    ComponentsSiteModule,
    PipesModule
  ],
  declarations: [ClassroomsPage]
})
export class ClassroomsPageModule { }
