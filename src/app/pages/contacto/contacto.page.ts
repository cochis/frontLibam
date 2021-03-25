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
