import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal/ngx';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  constructor(private oneSignal: OneSignal) { }


  configuracionInicial() {

    this.oneSignal.startInit('868c4753-7092-41ac-9d61-1b73f6b46da2', '961784147635');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

    this.oneSignal.handleNotificationReceived().subscribe((noti) => {
      // do something when notification is received
      alert("notificacion Recibida");
      console.log("Notificacion recibida", noti);
    });

    this.oneSignal.handleNotificationOpened().subscribe((noti) => {
      // do something when a notification is opened
      alert("notificacion abierta");
      console.log("Notificacion abierta", noti);
    });

    this.oneSignal.endInit();
  }
}
