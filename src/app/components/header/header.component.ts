import { Component, HostListener, Input, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Componente } from '../../interfaces/interfaces';
import { Router } from '@angular/router';
import * as SecureLS from 'secure-ls';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() titulo: string = '';
  flagScreen: boolean = false;
  componentes: Componente[];
  ls = new SecureLS({ encodingType: 'aes' });
  menuItems: any;
  constructor(
    private dataService: DataService,
    private router: Router) {
    if (screen.width > 780) {
      this.flagScreen = true;
    }

  }

  ngOnInit() {

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
    this.router.navigate([link]);
  }

}
