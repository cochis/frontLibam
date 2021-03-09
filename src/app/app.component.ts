import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Componente } from './interfaces/interfaces';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  loading: HTMLIonLoadingElement;
  flagScreen: boolean = false;
  componentes: Componente[];
  constructor(
    private dataService: DataService,
    public loadingCtrl: LoadingController
  ) {
    if (screen.width > 780) {
      this.flagScreen = true;
    }

   }


  ngOnInit(): void {
     

    console.log(this.flagScreen);
    this.presentLoading();

    this.dataService.getMenuOpts().subscribe(response => {
      console.log(this.loading);
      this.loading.dismiss();
      console.log(response);
      this.componentes = response;
      console.log(this.componentes);
    }, error => {
      this.loading.dismiss();
      console.log(error);
    });

  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({

      message: 'Cargando por favor espere...',

    });
    await this.loading.present();
  }
  onResize(event) {
    var widthScreen = event.target.innerWidth;
    if (widthScreen > 780) {
      this.flagScreen = true;
    } else {
      this.flagScreen = false;
    }
    console.log(this.flagScreen);
  }
}
