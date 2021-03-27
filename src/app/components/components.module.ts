import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FooterMobileComponent } from './footer-mobile/footer-mobile.component';
import { SliderComponent } from './slider/slider.component';
import { OfertaCardsComponent } from './oferta-cards/oferta-cards.component';
import { HeaderMobileComponent } from './header-mobile/header-mobile.component';

@NgModule({
  declarations: [HeaderComponent,
                FooterComponent,
                FooterMobileComponent,
                SliderComponent,
                OfertaCardsComponent,
                HeaderMobileComponent
              ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    FooterMobileComponent,
    SliderComponent,
    OfertaCardsComponent,
    HeaderMobileComponent
  ]
})
export class ComponentsModule { }
