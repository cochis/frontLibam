import { Component, OnInit, OnChanges, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LoadingController } from '@ionic/angular';
import { FunctionService } from 'src/app/services/functions';
import { SeoService } from 'src/app/services/seo.service';
import { User, UserGoogle } from '../../interfaces/interfaces';
import { UsuarioModel } from '../../models/usuario.model';
import { FirebasebdService } from '../../services/firebasebd.service';
import { IonAccordionGroup } from '@ionic/angular';
import { ClasesModel } from '../../models/clases.model';

@Component({
  selector: 'app-home-site',
  templateUrl: './home-site.page.html',
  styleUrls: ['./home-site.page.scss'],
})
export class HomeSitePage implements OnInit {
  @ViewChild(IonAccordionGroup, { static: true }) accordionGroup: IonAccordionGroup;
  onConstruction: boolean = false;
  flagScreen: boolean = false;
  userGoogle: UserGoogle;
  user: UsuarioModel;
  clases: any;
  role: string = '';
  typeSearch = '';
  textoBuscar: string = '';
  loading: HTMLIonLoadingElement;
  constructor(
    private functionService: FunctionService,
    private seo: SeoService,
    private title: Title,
    private database: FirebasebdService,
    private loadingCtrl: LoadingController

  ) {
    if (screen.width > 780) {
      this.flagScreen = true;
    }
    if (this.getUsuario !== null) {


      ;
    }

  }
  slider = [
    {
      page: "conocenos",
      img: '/assets/img/img5.jpg',
      titulo: '1er. Lugar en olimpiada del conocimiento',
      desc: '  Somos el PRIMER LUGAR en APROVECHAMIENTO de la Zona 28, Sector IX y Ciudad Nezahualcóyotl. Ganamos el Concurso de Olimpiadas de Conocimiento Infantil 2019 - 2020 en su última etapa, a nivel NACIONAL. Siendo el alumno Manuel Arturo Ramírez Mercado ganador de una beca por tres años de parte de la Fundación BANCOMER.',

    },
    {
      page: "conocenos",
      img: '/assets/img/ninos2.png',
      titulo: 'Inscripción',
      desc: 'Sumate a nuestra fila de campeones',
      link: '/inscripcion',
      btnTxt: 'Inscripciónes'
    },
    {
      page: "conocenos",
      img: '/assets/img/tocho.png',
      titulo: 'Deporte',
      desc: 'Tenemos en cuenta que para una educación integral es necesaría la actividad fisica.'
    },
    {
      page: "conocenos",
      img: '/assets/img/olimpiadas.jpeg',
      titulo: 'Olimpiadas',
      desc: 'Cada año realizamos activades al aire libre en conjunto con los padres de familia en un deportivo local.'
    },
    {
      page: "conocenos",
      img: '/assets/img/danza.jpg',
      titulo: 'Clase de danza',
      desc: 'La danza escolar es una materia interdisciplinar que se puede desarrollar tanto en el currículo del área de educación artística.'
    },
    {
      page: "conocenos",
      img: '/assets/img/artes.png',
      titulo: 'Clase de artes',
      desc: 'Para facilitar el estudio del arte mediante el desarrollo de la competencia artística .'
    },
    {
      page: "conocenos",
      img: '/assets/img/primaria.jpg',
      titulo: 'Eventos',
      desc: 'Donde los alumnos aplican sus conocimientos , fisicos , mentales o artisticos'
    }

  ];
  ngOnInit() {

    this.presentLoading('Por favor espere');

    setTimeout(() => {

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
      this.getRole()
      this.loading.dismiss();
    }, 3000);
    this.database.getAll('clases').then(firebaseResponse => {
      firebaseResponse.subscribe(listaDeUsuariosRef => {
        this.clases = listaDeUsuariosRef.map(usuarioRef => {
          let usuario = usuarioRef.payload.doc.data();
          usuario['id'] = usuarioRef.payload.doc.id;
          return usuario;
        })
        console.log("aqui estan ", this.clases);
      })
    })
    // this.bdService.getById('courses', this.curso).then(res => {
    //   res.subscribe(docRef => {
    //     let usuario = docRef.data();

    //     console.log('usuario', usuario)
    //     this.cursoData = usuario
    //     console.log('this.cursoData', this.cursoData)
    //     this.cargarDataAlFormulario(usuario);

    //   })
    // })


  }
  ngOnChanges() {
    this.getRole();
  }
  onResize(event) {
    this.flagScreen = this.functionService.onResize(event);
  }

  getRole() {
    this.user = this.getUsuario;
    console.log('this.user', this.user)
    this.role = this.user.role ? this.user.role : "";
    console.log('this.role', this.role)
  }
  obtenerPorId(id) {

    this.database.getById('usuarios', id).then(res => {
      res.subscribe(docRef => {
        let usuario = docRef.data();
        usuario['id'] = docRef.id;
        return usuario;

      })
    })
  }
  get getUsuario() {
    if (localStorage.getItem('usuario')) {
      const usuario = JSON.parse(localStorage.getItem('usuario'));
      console.log('usuario', usuario)
      return usuario;
    }
    else {
      return null;
    }

  }
  navigateTo(link) {
    this.functionService.navigateTo(link);

  }

  async presentLoading(message: string) {

    this.loading = await this.loadingCtrl.create({
      message,
    });

    await this.loading.present();

  }
  tipoBusqueda(event) {
    console.log(event);
    console.log(event.detail.value);
    this.typeSearch = event.detail.value;
  }
  onSearchChange(event) {
    console.log(event);
    this.textoBuscar = event.detail.value;
  }
}
