import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import * as SecureLS from 'secure-ls';
import { Componente } from './interfaces/interfaces';
import { DataService } from './services/data.service';
import { FunctionService } from './services/functions';
import { SwUpdate } from '@angular/service-worker';

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
  constructor(
    private dataService: DataService,
    public loadingCtrl: LoadingController,
    public functionService:FunctionService,
    private swUpdate: SwUpdate
  ) {
    if (screen.width > 780) {
      this.flagScreen = true;
    }

  }


  ngOnInit(): void {


    console.log(this.flagScreen);
    this.presentLoading();

    this.dataService.getMenuOpts().subscribe(response => {

      this.componentes = response;
      this.ls.set("menuItems", this.componentes);

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
    console.log(this.functionService.onResize(event));
    
  }
  updatePWA() {
    this.swUpdate.available.subscribe(() => {
      window.location.reload();
    });
  }
  
}
