import { Component, OnInit, Input } from '@angular/core';
import { FunctionService } from 'src/app/services/functions';
import { PopoverController } from '@ionic/angular'
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-headerSite',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent implements OnInit {
  @Input() titulo: string = '';
  flagScreen: boolean = false;
  constructor(private functionService: FunctionService,
    private popoverCtrl: PopoverController) { }

  ngOnInit() { }
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
  async presentPopover(ev: any) {
    
    const popover = await this.popoverCtrl.create({
      component: MenuComponent,
      event: ev,
      translucent: true,
      backdropDismiss: true
    });

    await popover.present();

    const { data } = await popover.onWillDismiss();
    console.log(data);

  }
}
