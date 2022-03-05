import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerifyEmailPageRoutingModule } from './verify-email-routing.module';

import { VerifyEmailPage } from './verify-email.page';
import { ComponentsSiteModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerifyEmailPageRoutingModule,
    ComponentsSiteModule
  ],
  declarations: [VerifyEmailPage]
})
export class VerifyEmailPageModule {}
