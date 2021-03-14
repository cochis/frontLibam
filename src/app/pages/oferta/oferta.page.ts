import { Component, OnInit } from '@angular/core';
import { FunctionService } from '../../services/functions';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.page.html',
  styleUrls: ['./oferta.page.scss'],
})
export class OfertaPage implements OnInit {
  
  flagScreen: boolean = false;
  constructor(
    private functionService: FunctionService,
  ) {
    if (screen.width > 780) {
      this.flagScreen = true;
    }
   }

  ngOnInit() {
  }
  onResize(event) {
    this.flagScreen = this.functionService.onResize(event);
  }
}
