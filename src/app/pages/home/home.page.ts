import { Component, OnInit } from '@angular/core';
import { LoadingController, MenuController, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import * as SecureLS from 'secure-ls';
import { Componente } from 'src/app/interfaces/interfaces';
import { DataService } from '../../services/data.service';
import { FunctionService } from '../../services/functions';
 

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  
  ls = new SecureLS({encodingType: 'aes'});
  flagScreen: boolean = false;

  constructor(
    private menuCtrl: MenuController,
    private navCtrl: NavController,
    private functionService: FunctionService,
  ) {
    if (screen.width > 780) {
      this.flagScreen = true;
    }
    
   }
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay:true,
    speed: 3000
   };
  ngOnInit() {

  }


  mostrarMenu() {
    this.menuCtrl.open('first');
  }

  onClick() {

    this.navCtrl.navigateBack('/');

  }

  onResize(event) {
    this.flagScreen = this.functionService.onResize(event);
    console.log(this.functionService.onResize(event));
    
  }
  
}
