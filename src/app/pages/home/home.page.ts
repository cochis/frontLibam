import { Component, OnInit } from '@angular/core';
import { LoadingController, MenuController, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import * as SecureLS from 'secure-ls';
import { Componente } from 'src/app/interfaces/interfaces';
import { DataService } from '../../services/data.service';
import { FunctionService } from '../../services/functions';
import { SeoService } from '../../services/seo.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  ls = new SecureLS({ encodingType: 'aes' });
  flagScreen: boolean = false;

  constructor(
    private menuCtrl: MenuController,
    private navCtrl: NavController,
    private functionService: FunctionService,
    private seo: SeoService,
    private title: Title,
  ) {
    if (screen.width > 780) {
      this.flagScreen = true;
    }

  }
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true,
    speed: 3000
  };
  slider = [
    {
      page:"home",
      img: '/assets/img/img5.jpg',
      titulo: '1er. Lugar en olimpiada del conocimiento',
      desc: '  Somos el PRIMER LUGAR en APROVECHAMIENTO de la Zona 28, Sector IX y Ciudad Nezahualcóyotl. Ganamos el Concurso de Olimpiadas de Conocimiento Infantil 2019 - 2020 en su última etapa, a nivel NACIONAL. Siendo el alumno Manuel Arturo Ramírez Mercado ganador de una beca por tres años de parte de la Fundación BANCOMER.',
       
    },
    {
      page:"home",
      img: '/assets/img/ninos2.png',
      titulo: 'Inscripción',
      desc: 'Sumate a nuestra fila de campeones',
      link: '/inscripcion',
      btnTxt: 'Inscripciónes'
    },
    {
      page:"home",
      img: '/assets/img/tocho.png',
      titulo: 'Deporte',
      desc: 'Tenemos en cuenta que para una educación integral es necesaría la actividad fisica.'
    },
    {
      page:"home",
      img: '/assets/img/olimpiadas.jpeg',
      titulo: 'Olimpiadas',
      desc: 'Cada año realizamos activades al aire libre en conjunto con los padres de familia en un deportivo local.'
    },
    {
      page:"home",
      img: '/assets/img/danza.jpg',
      titulo: 'Clase de danza',
      desc: 'La danza escolar es una materia interdisciplinar que se puede desarrollar tanto en el currículo del área de educación artística.'
    },
    {
      page:"home",
      img: '/assets/img/artes.png',
      titulo: 'Clase de artes',
      desc: 'Para facilitar el estudio del arte mediante el desarrollo de la competencia artística .'
    },
    {
      page:"home",
      img: '/assets/img/primaria.jpg',
      titulo: 'Eventos',
      desc: 'Donde los alumnos aplican sus conocimientos , fisicos , mentales o artisticos'
    }

  ];
  ngOnInit() {
    document.body.scrollTop = 0;
    window.scrollTo(0, 0);
    this.functionService.createLinkForCanonicalURL();
    let t: string = 'Colegio Libertadores de América | Inicio';
    this.title.setTitle(t);

    this.seo.generateTags({
      title: 'Colegio Libertadores de América | Inicio',
      description:
        'Escuela lider en nezahualcoyotl, preescolar, primaria,de excelencia academica que cuenta con ingles y computacion obligatorios ademas de tae kwon do , futbol, futbol americano danza y artes.',
      keywords:
        'preescolar, guarderia, primaria , excelencia academica, ingles, computacion , futbol, cancha de futbol, basquetbol, futbol americano , educacion de calidad',
      slug: 'Inicio',
      colorBar: '#019342',
      image:
        window.location.origin + '/assets/img/logo/l_100.png',
    });

  }


  mostrarMenu() {
    this.menuCtrl.open('first');
  }

  onClick() {

    this.navCtrl.navigateBack('/');

  }

  onResize(event) {
    this.flagScreen = this.functionService.onResize(event);
  }

}
