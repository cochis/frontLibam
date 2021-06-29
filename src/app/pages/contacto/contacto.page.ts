import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { FunctionService } from '../../services/functions';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { AlertController } from '@ionic/angular';
import { SeoService } from '../../services/seo.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
})

export class ContactoPage implements OnInit {
  public contactoForm: FormGroup;
  contact = {
    user_name: '',
    user_email: '',
    // phone: '',
    message: '',
  }

  flagScreen: boolean = false;
  constructor(
    private functionService: FunctionService,
    private alertCtrl: AlertController,
    private seo: SeoService,
    private title: Title,
  ) {
    if (screen.width > 780) {
      this.flagScreen = true;
    }
  }
  slider = [
    {
      page:"contacto",
      img: '/assets/img/img5.jpg',
      titulo: '1er. Lugar en olimpiada del conocimiento',
      desc: '  Somos el PRIMER LUGAR en APROVECHAMIENTO de la Zona 28, Sector IX y Ciudad Nezahualcóyotl. Ganamos el Concurso de Olimpiadas de Conocimiento Infantil 2019 - 2020 en su última etapa, a nivel NACIONAL. Siendo el alumno Manuel Arturo Ramírez Mercado ganador de una beca por tres años de parte de la Fundación BANCOMER.',
       
    },
    {
      page:"contacto",
      img: '/assets/img/ninos2.png',
      titulo: 'Inscripción',
      desc: 'Sumate a nuestra fila de campeones',
      link: '/inscripcion',
      btnTxt: 'Inscripciónes'
    },
    {
      page:"contacto",
      img: '/assets/img/tocho.png',
      titulo: 'Deporte',
      desc: 'Tenemos en cuenta que para una educación integral es necesaría la actividad fisica.'
    },
    {
      page:"contacto",
      img: '/assets/img/olimpiadas.jpeg',
      titulo: 'Olimpiadas',
      desc: 'Cada año realizamos activades al aire libre en conjunto con los padres de familia en un deportivo local.'
    },
    {
      page:"contacto",
      img: '/assets/img/danza.jpg',
      titulo: 'Clase de danza',
      desc: 'La danza escolar es una materia interdisciplinar que se puede desarrollar tanto en el currículo del área de educación artística.'
    },
    {
      page:"contacto",
      img: '/assets/img/artes.png',
      titulo: 'Clase de artes',
      desc: 'Para facilitar el estudio del arte mediante el desarrollo de la competencia artística .'
    },
    {
      page:"contacto",
      img: '/assets/img/primaria.jpg',
      titulo: 'Eventos',
      desc: 'Donde los alumnos aplican sus conocimientos , fisicos , mentales o artisticos'
    }

  ];
  ngOnInit(): void {
    
    document.body.scrollTop = 0;
    window.scrollTo(0, 0);
    this.functionService.createLinkForCanonicalURL();
    let t: string = 'Colegio Libertadores de América | Contacto';
    this.title.setTitle(t);

    this.seo.generateTags({
      title: 'Colegio Libertadores de América | Contacto',
      description:
        'Contamos con nuestra area de contacto la cual nos ayuda con una interacción rapída con nuestros clientes',
      keywords:
        'Colegio Libertadores de América, contacto, rapído , eficas, confiable',
      slug: 'Contacto',
      colorBar: '#019342',
      image:
        window.location.origin + '/assets/img/logo/l_100.png',
    });
  }
  public sendEmail(contactForm: NgForm) {
    // console.log(contactForm.value);
    var user_email = contactForm.value.user_email;
    var user_name = contactForm.value.user_name;
    var message = contactForm.value.message;
    // e.preventDefault();
    // console.log(e.target);
    emailjs.send("service_ccnppwo","template_pe8brxk",{
      to_name: user_name,
      from_name: user_email,
      message: message,
      reply_to: "contacto@colegiolibam.com",
      }, 'user_YNYlPQGjc88Itr8Osrfsf').then((result: EmailJSResponseStatus) => {
        contactForm.resetForm();
        this.presentAlert("El mensaje se ha enviado. ","success");
        // console.log(result);

      }, (error) => {
        this.presentAlert("Por favor intente en otro momento.", "warning");
        // console.log(error );
    });

    // emailjs.sendForm('service_ccnppwo', 'template_pe8brxk', e.target as HTMLFormElement, 'user_YNYlPQGjc88Itr8Osrfsf')
    //   .then((result: EmailJSResponseStatus) => {
    //     console.log(result);
    //   }, (error) => {
    //     console.log(error);
    //   });
  }

  buildForm() {
    this.contactoForm = new FormGroup({
      user_name: new FormControl('', Validators.required),
      user_email: new FormControl('', Validators.required),
      // phone: new FormControl(''),
      message: new FormControl('')
    });
  }

  onResize(event) {
    this.flagScreen = this.functionService.onResize(event);
  }
  async presentAlert(message,type) {
    const alert = await this.alertCtrl.create({
      backdropDismiss: false,
      header: 'Solicitud',
      subHeader: '',
      message: message,
      buttons: ['Salir'],
      cssClass: type
    });

    await alert.present();
  }
  createLinkForCanonicalURL() {
    this.seo.createLinkForCanonicalURL();
  }

}
