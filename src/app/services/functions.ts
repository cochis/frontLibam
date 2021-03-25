


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SeoService } from './seo.service';
@Injectable({
  providedIn: 'root'
})
export class FunctionService {

  constructor( private http: HttpClient,
    private seo: SeoService ) { }
 
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

  

}
