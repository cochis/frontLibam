import { Component, OnInit } from '@angular/core';
import { FunctionService } from '../../services/functions';
import { SeoService } from '../../services/seo.service';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-conocenos',
  templateUrl: './conocenos.page.html',
  styleUrls: ['./conocenos.page.scss'],
})
export class ConocenosPage implements OnInit {

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

    document.body.scrollTop = 0;
    window.scrollTo(0, 0);
    this.functionService.createLinkForCanonicalURL();
    let t: string = 'Colegio Libertadores de América | Conócenos';
    this.title.setTitle(t);

    this.seo.generateTags({
      title: 'Colegio Libertadores de América | Conócenos',
      description:
        'Toda nuestro amplia variedad de conocimientos y apoyo estamos dispuestos a ofrecerlos a nuestros alumno',
      keywords:
        'Colegio Libertadores de América, Conócenos, Misíon , Visíon, confiable',
      slug: 'Contacto',
      colorBar: '#019342',
      image:
        window.location.origin + '/assets/img/logo/l_100.png',
    });
  }
  
  onResize(event) {
    this.flagScreen = this.functionService.onResize(event);
  }

}
