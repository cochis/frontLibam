import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import * as SecureLS from 'secure-ls';
import { Componente } from './interfaces/interfaces';
import { DataService } from './services/data.service';
import { FunctionService } from './services/functions';
import { SwUpdate } from '@angular/service-worker';
import { PushService } from './services/push.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  loading: HTMLIonLoadingElement;
  flagScreen: boolean = false;
  componentes: Componente[] = [];
  ls = new SecureLS({ encodingType: 'aes' });
  title = 'Libam';
  updateAvailable = false;
  public currentUrl = '';
  public typeMenu = '';
  constructor(
    private dataService: DataService,
    public loadingCtrl: LoadingController,
    public functionService: FunctionService,
    private updates: SwUpdate,
    private pushService: PushService,
    private router: Router

  ) {





  }



  ngOnInit(): void {
    console.log(this.componentes);
    if (this.componentes === undefined) {
      console.log("entro");
      this.componentes = [
        {
          "icon": "school",
          "name": "Inicio",
          "redirectTo": "/home",
          "type": "general",
          "activated": true
        },
        {
          "icon": "school",
          "name": "Inicio",
          "redirectTo": "/home",
          "type": "site",
          "activated": true
        },
        {
          "icon": "ribbon",
          "name": "Conocenos",
          "redirectTo": "/conocenos",
          "type": "general",
          "activated": true
        },
        {
          "icon": "book",
          "name": "Oferta",
          "redirectTo": "/oferta",
          "type": "general",
          "activated": true
        },
        {
          "icon": "mail",
          "name": "Contacto",
          "redirectTo": "/contacto",
          "type": "general",
          "activated": true
        },
        {
          "icon": "accessibility",
          "name": "Site",
          "redirectTo": "/site/loginSite",
          "type": "general",
          "activated": true
        }
      ]
    }
    console.log(this.componentes);
    this.dataService.getMenuOpts().subscribe(response => {

      this.componentes = response;
      console.log(this.componentes);
      this.ls.set("menuItems", this.componentes);
      this.typeMenu = this.ls.get("typeM");
      if (screen.width > 780) {
        this.flagScreen = true;
      }
      this.initializeApp();
      this.updates.available.subscribe((event) => {
        this.updateAvailable = true;
      });

    }, error => {

      console.log(error);
    });



  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({

      message: 'Cargando por favor espere...',
      duration: 500


    });
    await this.loading.present();
  }


  onResize(event) {
    this.flagScreen = this.functionService.onResize(event);

  }

  doAppUpdate() {
    this.updates.activateUpdate().then(() => document.location.reload());
  }

  initializeApp() {
    this.presentLoading();
    // this.currentUrl = this.functionService.getCurrentUrl();
    // console.log(this.currentUrl);
    // console.log(this.ls.get("typeM") );
    // if (this.ls.get("typeM")) {
    //   console.log("con localstorage");
    //   this.typeMenu = this.ls.get("typeM");
    // } else {
    //   console.log("sin localstorage");
    //   if (this.currentUrl.includes("site")) {
    //     this.typeMenu = 'site';
    //   } else {
    //     this.typeMenu = 'general';
    //   }
    //   console.log(this.typeMenu);
    // }

    this.pushService.configuracionInicial();

  }
  navigateTo(link) {
    if (link.includes("site")) {
      this.typeMenu = 'site';
    } else {
      this.typeMenu = 'general';
    }
    this.functionService.navigateTo(link);

  }

}
