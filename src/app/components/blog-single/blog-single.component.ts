import { Component, OnInit } from '@angular/core';
import { FunctionService } from '../../services/functions';
import { AlertController } from '@ionic/angular';
import { SeoService } from '../../services/seo.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-blog-single',
  templateUrl: './blog-single.component.html',
  styleUrls: ['./blog-single.component.scss'],
})
export class BlogSingleComponent implements OnInit {
  onConstruction:boolean = false;
  flagScreen: boolean = false;
  constructor(private functionService: FunctionService,
              private alertCtrl: AlertController,
              private seo: SeoService,
              private title: Title,
              private router: Router,
              private modalCtrl: ModalController) { 
                if (screen.width > 780) {
                  this.flagScreen = true;
                }
              }

  ngOnInit() {
    document.body.scrollTop = 0;
    window.scrollTo(0, 0);
    this.functionService.createLinkForCanonicalURL();
    let t: string = 'Colegio Libertadores de América | Blog';
    this.title.setTitle(t);

    this.seo.generateTags({
      title: 'Colegio Libertadores de América | Protocolo Covid',
      description:
        'FORMANDO LIDERES QUE CAMBIARAN AL MUNDO',
      keywords:
        'Colegio Libertadores de América, Nezahualcoyotl,Inscripción, cuotas accesibles , excelente nivel académico, confiable',
      slug: 'Inscripción',
      colorBar: '#019342',
      image:
        window.location.origin + '/assets/img/logo/l_100.png',
    });

  }
  onResize(event) {
    this.flagScreen = this.functionService.onResize(event);
  }
  navigateTo(link) {
    this.router.navigate([link]);
  }
  cerrarModal() {
    this.modalCtrl.dismiss();
  }

}
