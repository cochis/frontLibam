import { Component, OnInit } from '@angular/core';
import { FunctionService } from 'src/app/services/functions';
import { SeoService } from 'src/app/services/seo.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.page.html',
  styleUrls: ['./blog.page.scss'],
})
export class BlogPage implements OnInit {
  flagScreen: boolean = false;
  
  slider = [
    {
      page:"incripcion",
      img: '/assets/img/img5.jpg',
      titulo: '1er. Lugar en olimpiada del conocimiento',
      desc: '  Somos el PRIMER LUGAR en APROVECHAMIENTO de la Zona 28, Sector IX y Ciudad Nezahualcóyotl. Ganamos el Concurso de Olimpiadas de Conocimiento Infantil 2019 - 2020 en su última etapa, a nivel NACIONAL. Siendo el alumno Manuel Arturo Ramírez Mercado ganador de una beca por tres años de parte de la Fundación BANCOMER.',
       
    },
    {
      page:"incripcion",
      img: '/assets/img/ninos2.png',
      titulo: 'Inscripción',
      desc: 'Sumate a nuestra fila de campeones',
      link: '/inscripcion',
      btnTxt: 'Inscripciónes'
    },
    {
      page:"incripcion",
      img: '/assets/img/tocho.png',
      titulo: 'Deporte',
      desc: 'Tenemos en cuenta que para una educación integral es necesaría la actividad fisica.'
    },
    {
      page:"incripcion",
      img: '/assets/img/olimpiadas.jpeg',
      titulo: 'Olimpiadas',
      desc: 'Cada año realizamos activades al aire libre en conjunto con los padres de familia en un deportivo local.'
    },
    {
      page:"incripcion",
      img: '/assets/img/danza.jpg',
      titulo: 'Clase de danza',
      desc: 'La danza escolar es una materia interdisciplinar que se puede desarrollar tanto en el currículo del área de educación artística.'
    },
    {
      page:"incripcion",
      img: '/assets/img/artes.png',
      titulo: 'Clase de artes',
      desc: 'Para facilitar el estudio del arte mediante el desarrollo de la competencia artística .'
    },
    {
      page:"incripcion",
      img: '/assets/img/primaria.jpg',
      titulo: 'Eventos',
      desc: 'Donde los alumnos aplican sus conocimientos , fisicos , mentales o artisticos'
    }

  ];
  constructor(private functionService: FunctionService ,
    private seo: SeoService,
    private title: Title) { 
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
      title: 'Colegio Libertadores de América | Blog',
      description:
        'FORMANDO LIDERES QUE CAMBIARAN AL MUNDO',
      keywords:
        'Colegio Libertadores de América, Nezahualcoyotl,Blog, Comunicados a la comunidad ',
      slug: 'Inscripción',
      colorBar: '#019342',
      image:
        window.location.origin + '/assets/img/logo/l_100.png',
    });
  }
  onResize(event) {
    this.flagScreen = this.functionService.onResize(event);
  }
}

