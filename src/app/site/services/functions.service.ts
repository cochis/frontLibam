import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  constructor(private http: HttpClient,
    public toastCtrl: ToastController) { }

  cleanString(txt) {
    var res = txt.trim();
    return res;

  }
  lowerString(txt) {
    var res = txt.toLowerCase();
    return res;
  }
  upperString(txt) {
    var res = txt.toUpperCase();
    return res;
  }

  
}
