import { Component, OnInit } from '@angular/core';
import { LoadingController, MenuController, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import * as SecureLS from 'secure-ls';
import { Componente } from 'src/app/interfaces/interfaces';
import { DataService } from '../../services/data.service';
import { FunctionService } from '../../services/functions';
import { SeoService } from '../../services/seo.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  ls = new SecureLS({ encodingType: 'aes' });
  flagScreen: boolean = false;

  constructor(
    private menuCtrl: MenuController,
    private navCtrl: NavController,
    private functionService: FunctionService,
    private seo: SeoService,
    private title: Title,
  ) {
    if (screen.width > 780) {
      this.flagScreen = true;
    }

  }
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true,
    speed: 3000
  };
  ngOnInit() {
    document.body.scrollTop = 0;
    window.scrollTo(0, 0);
    this.functionService.createLinkForCanonicalURL();
    let t: string = 'Colegio Libertadores de América | Inicio';
    this.title.setTitle(t);

    this.seo.generateTags({
      title: 'Colegio Libertadores de América | Inicio',
      description:
        'Escuela lider en nezahualcoyotl, preescolar, primaria,de excelencia academica que cuenta con ingles y computacion obligatorios ademas de tae kwon do , futbol, futbol americano danza y artes.',
      keywords:
        'preescolar, guarderia, primaria , excelencia academica, ingles, computacion , futbol, cancha de futbol, basquetbol, futbol americano , educacion de calidad',
      slug: 'Inicio',
      colorBar: '#019342',
      image:
        window.location.origin + '/assets/img/logo/l_100.png',
    });

  }


  mostrarMenu() {
    this.menuCtrl.open('first');
  }

  onClick() {

    this.navCtrl.navigateBack('/');

  }

  onResize(event) {
    this.flagScreen = this.functionService.onResize(event);
  }

}
