import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import * as SecureLS from 'secure-ls';
import { Componente } from './interfaces/interfaces';
import { DataService } from './services/data.service';
import { FunctionService } from './services/functions';
import { SwUpdate } from '@angular/service-worker';
import { PushService } from './services/push.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  loading: HTMLIonLoadingElement;
  flagScreen: boolean = false;
  componentes: Componente[];
  ls = new SecureLS({ encodingType: 'aes' });
  title = 'Libam';
  updateAvailable = false;
  constructor(
    private dataService: DataService,
    public loadingCtrl: LoadingController,
    public functionService: FunctionService,
    private updates: SwUpdate,
    private pushService: PushService,
  ) {
    if (screen.width > 780) {
      this.flagScreen = true;
    }
    this.updates.available.subscribe((event) => {
      this.updateAvailable = true;
    });
  }



  ngOnInit(): void {

    this.initializeApp();


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

    this.dataService.getMenuOpts().subscribe(response => {

      this.componentes = response;
      this.ls.set("menuItems", this.componentes);
      this.pushService.configuracionInicial();

    }, error => {

      console.log(error);
    });

  }

}
