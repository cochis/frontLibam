import { Component, HostListener, Input, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Componente } from '../../interfaces/interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() titulo: string = '';
  flagScreen: boolean = false;
  componentes: Componente[];
  constructor(private dataService:DataService) { 
    if (screen.width > 780) {
      this.flagScreen = true;
    }

  }
  
  ngOnInit() {
    
    this.dataService.getMenuOpts().subscribe(response => {
      console.log(response);
      this.componentes = response;
      console.log(this.componentes);
    }, error => {
      console.log(error);
    });

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
    console.log(this.flagScreen);
  }

}
