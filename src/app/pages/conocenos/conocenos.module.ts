import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConocenosPageRoutingModule } from './conocenos-routing.module';

import { ConocenosPage } from './conocenos.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConocenosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ConocenosPage]
})
export class ConocenosPageModule {}
