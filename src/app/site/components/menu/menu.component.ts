import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { FunctionService } from 'src/app/services/functions';
import { FirebaseService } from '../../services/firebase.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  items = Array(7);
  role = '';
  constructor(private popoverCtrl: PopoverController,
    private afs: FirebaseService,
    private functionService: FunctionService,
    private router: ActivatedRoute) { }

  ngOnInit() {

    setTimeout(function(){
      this.role = localStorage.getItem('Role');
   }, 2000);//wait 2 seconds
   }


  onClick(valor: number) {
     
    this.popoverCtrl.dismiss({
      item: valor
    });

  }

  SignOut() {
    this.afs.SignOut();
    this.navigateTo('/home')
    this.popoverCtrl.dismiss();
  }
  navTo(type, params, value) {
    this.functionService.navParams(type, params, value);


  }
  close() {
    this.popoverCtrl.dismiss();
  }
  navigateTo(link) {
    this.functionService.navigateTo(link);
    this.popoverCtrl.dismiss();
  }
}
