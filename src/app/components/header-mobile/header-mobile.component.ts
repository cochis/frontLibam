import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as SecureLS from 'secure-ls';
import { Componente } from '../../interfaces/interfaces';
import { DataService } from '../../services/data.service';
import { FunctionService } from '../../services/functions';

@Component({
  selector: 'app-header-mobile',
  templateUrl: './header-mobile.component.html',
  styleUrls: ['./header-mobile.component.scss'],
})
export class HeaderMobileComponent implements OnInit {
  @Input() titulo: string = '';
  flagScreen: boolean = false;
  componentes: Componente[];
  ls = new SecureLS({ encodingType: 'aes' });
  menuItems: any;
  currentUrl:string;
  typeMenu:string;
  constructor(
    private dataService: DataService,
    private functionService: FunctionService,
    private router: Router) {
    if (screen.width > 780) {
      this.flagScreen = true;
    }

  }

  ngOnInit() {
    this.currentUrl = this.functionService.getCurrentUrl();
    if(this.currentUrl.includes("site")){
      this.typeMenu = 'site';
    }else {
      this.typeMenu = 'general';
    }
    this.ls.set("typeM",this.typeMenu);
    this.menuItems = this.ls.get("menuItems");
    
    if (this.menuItems != null && this.menuItems != undefined) {
      this.componentes = this.menuItems;
    } else {
      this.dataService.getMenuOpts().subscribe(response => {
        this.componentes = response;
      }, error => {
        console.log(error);
      });
    }


    if (screen.width > 780) {
      this.flagScreen = true;
    }
  }
  onResize(event) {
    var widthScreen = event.target.innerWidth;
    if (widthScreen > 780) {
      this.flagScreen = true;
    } else {
      this.flagScreen = false;
    }
  }
  navigateTo(link) {
    this.functionService.navigateTo(link);
   
  }

}
