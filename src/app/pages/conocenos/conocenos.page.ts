import { Component, OnInit } from '@angular/core';
import { FunctionService } from '../../services/functions';

@Component({
  selector: 'app-conocenos',
  templateUrl: './conocenos.page.html',
  styleUrls: ['./conocenos.page.scss'],
})
export class ConocenosPage implements OnInit {
  
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
    console.log(this.functionService.onResize(event));
    
  }

}
