import { Component, OnInit } from '@angular/core';
import { FunctionService } from '../../services/functions';
import { SeoService } from '../../services/seo.service';
import { Title } from '@angular/platform-browser';
import { AlertController } from '@ionic/angular';
import { ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
export interface Data {
  movies: string;
}
@Component({
  selector: 'app-reinscripcion',
  templateUrl: './reinscripcion.page.html',
  styleUrls: ['./reinscripcion.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ReinscripcionPage implements OnInit {
  public data: Data;
  public columns: any;
  public rows: any;
 
  flagScreen: boolean = false;
  constructor(
    private functionService: FunctionService ,
    private seo: SeoService ,
    private title: Title,
    private alertCtrl: AlertController,
    private http: HttpClient
  ) {
     this.columns = [
      { name: 'Name' },
      { name: 'Company' },
      { name: 'Genre' }
    ];

    this.http.get<Data>('../../assets/movies.json')
      .subscribe((res) => {
        console.log(res)
        this.rows = res.movies;
      });
    if (screen.width > 780) {
      this.flagScreen = true;
    }
  }

 
  slider = [
    {
      page:"reinscripcion",
      img: '/assets/img/img5.jpg',
      titulo: '1er. Lugar en olimpiada del conocimiento',
      desc: '  Somos el PRIMER LUGAR en APROVECHAMIENTO de la Zona 28, Sector IX y Ciudad Nezahualcóyotl. Ganamos el Concurso de Olimpiadas de Conocimiento Infantil 2019 - 2020 en su última etapa, a nivel NACIONAL. Siendo el alumno Manuel Arturo Ramírez Mercado ganador de una beca por tres años de parte de la Fundación BANCOMER.',
       
    },
    {
      page:"reinscripcion",
      img: '/assets/img/ninos2.png',
      titulo: 'Reinscripción',
      desc: 'Sumate a nuestra fila de campeones',
      link: '/inscripcion',
      btnTxt: 'Inscripciónes'
    },
    {
      page:"reinscripcion",
      img: '/assets/img/ninos2.png',
      titulo: 'Reinscripción',
      desc: 'Sumate a nuestra fila de campeones',
      link: '/reinscripcion',
      btnTxt: 'Reinscripciones'
    },
    {
      page:"reinscripcion",
      img: '/assets/img/ninos2.png',
      titulo: 'Deporte',
      desc: 'Tenemos en cuenta que para una educación integral es necesaría la actividad fisica'
    },
    {
      page:"reinscripcion",
      img: '/assets/img/ninos2.png',
      titulo: 'Eventos',
      desc: 'Donde los alumnos aplican sus conocimientos , fisicos , mentales o artisticos'
    }

  ];
  ngOnInit() {
    document.body.scrollTop = 0;
    window.scrollTo(0, 0);
    this.functionService.createLinkForCanonicalURL();
    let t: string = 'Colegio Libertadores de América | Reinscripción';
    this.title.setTitle(t);

    this.seo.generateTags({
      title: 'Colegio Libertadores de América | Reinscripción',
      description:
        'Unete a nuestros campeones',
      keywords:
        'Colegio Libertadores de América, Reinscripción, rapído , eficas, confiable',
      slug: 'Reinscripción',
      colorBar: '#019342',
      image:
        window.location.origin + '/assets/img/logo/l_100.png',
    });
  }
 onResize(event) {
    this.flagScreen = this.functionService.onResize(event);
  }
}
