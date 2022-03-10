


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SeoService } from './seo.service';
import { Router } from '@angular/router';
import * as SecureLS from 'secure-ls';
import { LoadingController, ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class FunctionService {
  ls = new SecureLS({ encodingType: 'aes' });
  loading: HTMLIonLoadingElement;
  constructor(private http: HttpClient,
    private seo: SeoService,
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController) { }

  onResize(event) {
    var flagScreen;
    var widthScreen = event.target.innerWidth;
    if (widthScreen > 780) {
      flagScreen = true;
    } else {
      flagScreen = false;
    }
    return flagScreen;
  }
  createLinkForCanonicalURL() {
    this.seo.createLinkForCanonicalURL();
  }


  getCurrentUrl() {
    var currentUrl = this.router.url;
    return currentUrl;
  }

  navigateTo(link) {

    var typeMenu = '';
    if (link.includes("site")) {
      typeMenu = 'site';
    } else {
      typeMenu = 'general';
    }
    this.ls.set("typeM", typeMenu);
    this.router.navigate([link]);

  }
  navParams(type, params,value) {
    console.log('type', type)
    console.log('params', params)
    console.log('value', value)
    this.router.navigate([type], { state: { example: 'bar' } });

  }
  convertBeautifulDate(uglyDate) {
    var date = new Date(uglyDate),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    var hrs = date.getHours();
    var mins = date.getMinutes();
    var hrs1 = '';
    var mins1 = '';
    if (hrs <= 9)
      hrs1 = '0' + hrs
    else hrs1 = '' + hrs
    if (mins < 10)
      mins1 = '0' + mins
    else mins1 = '' + mins
    const postTime = hrs1 + ':' + mins1;
    let timeDate = [day, mnth, date.getFullYear()].join("/") + " - " + postTime;
    return timeDate;

  }
  deleteLocal() {
    if (localStorage.getItem('user')) {
      localStorage.removeItem('user');

    }
    if (localStorage.getItem('usuario')) {
      localStorage.removeItem('usuario');

    }
    if (localStorage.getItem('Role')) {
      localStorage.removeItem('Role');

    }


  }
  async presentToast(text: string) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 2000
    });
    toast.present();
  }
  async presentLoading(message: string) {
    this.loading = await this.loadingCtrl.create({
      message,
    });
    await this.loading.present();
  }
  async closeLoading() {
    this.loading.dismiss();
  }
  returnTop(){
    window.scrollTo(0, 0);
  }

}
