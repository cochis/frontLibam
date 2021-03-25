import { Component, OnInit } from '@angular/core';
import { FunctionService } from '../../services/functions';
import { SeoService } from '../../services/seo.service';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.page.html',
  styleUrls: ['./oferta.page.scss'],
})
export class OfertaPage implements OnInit {
  
  flagScreen: boolean = false;
  constructor(
    private functionService: FunctionService,
    private seo: SeoService,
    private title: Title,
  ) {
    if (screen.width > 780) {
      this.flagScreen = true;
    }
   }

  ngOnInit() {
    // Colegio Vasconcelos trabaja especialmente sobre la formación básica y obligatoria que va desde: preescolar, primaria y secundaria
    document.body.scrollTop = 0;
    window.scrollTo(0, 0);
    this.functionService.createLinkForCanonicalURL();
    let t: string = 'Colegio Libertadores de América | Oferta Educativa';
    this.title.setTitle(t);

    this.seo.generateTags({
      title: 'Colegio Libertadores de América | Oferta Educativa',
      description:
        'Colegio Libertadores de América se enfoca en la formación básica y obligatoria que va desde: preescolar y primaria.',
      keywords:
        'Colegio Libertadores de América, preescolar , primaria , educación basica , educacion de calidad',
      slug: 'Oferta Educativa',
      colorBar: '#019342',
      image:
        window.location.origin + '/assets/img/logo/l_100.png',
    });
  }
  onResize(event) {
    this.flagScreen = this.functionService.onResize(event);
  }
}
