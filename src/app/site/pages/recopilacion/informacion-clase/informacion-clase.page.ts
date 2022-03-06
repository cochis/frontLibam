import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { FunctionService } from 'src/app/services/functions';
import { UsuarioModel } from 'src/app/site/models/usuario.model';
import { FirebaseService } from 'src/app/site/services/firebase.service';
import { FirebasebdService } from 'src/app/site/services/firebasebd.service';
import { ClasesModel } from 'src/app/site/models/clases.model';
@Component({
  selector: 'app-informacion-clase',
  templateUrl: './informacion-clase.page.html',
  styleUrls: ['./informacion-clase.page.scss'],
})
export class InformacionClasePage implements OnInit {
  flagScreen: boolean = false;
  type = '';
  text = '';
  disabled = false;
  readonly = false;
  readEmail = false;
  profesors: any;
  id: '';
  usuario: UsuarioModel;
  clase: ClasesModel;
  formClase: FormGroup;
  dateToday: Date = new Date();
  constructor(private activatedRoute: ActivatedRoute,
    public fb: FormBuilder,
    private functionService: FunctionService,
    public authService: FirebaseService,
    public bdService: FirebasebdService) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.type = params.type;
      this.clase = params.id;
      console.log('this.clase', this.clase)
    });
    this.bdService.getAll('profesors').then(firebaseResponse => {
      firebaseResponse.subscribe(listaDeUsuariosRef => {
        this.profesors = listaDeUsuariosRef.map(usuarioRef => {
          let usuario = usuarioRef.payload.doc.data();
          usuario['id'] = usuarioRef.payload.doc.id;
          return usuario;
        })
        console.log(this.profesors);
      })
    })

    this.crearFormulario();
    this.cargarDataAlFormulario();
    this.resetForm();
    console.log('this.dateToday', this.dateToday)
    console.log('this.dateToday.toISOString()', this.dateToday.toISOString())
    this.functionService.returnTop();
  }

  ngOnInit() {

    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    console.log('this.type', this.type)
    switch (this.type) {
      case 'Register':

        this.text = 'Registro de clase';
        console.log('this.text', this.text);
        this.readonly = false;
        this.disabled = false;
        this.readEmail = false;
        break;
      case 'View':

        this.text = 'Visualización de información de clase';
        console.log('this.text', this.text)
        this.readonly = true;
        this.disabled = true;
        this.readEmail = true;
        console.log('this.clase', this.clase)
        this.bdService.getById('clases', this.clase).then(res => {
          res.subscribe(docRef => {
            let clase = docRef.data();

            console.log('clase', clase)
            this.cargarDataAlFormulario(clase);

          })
        })





        break;

      case 'Edit':
        this.text = 'Edición de información de clase';
        console.log('this.text', this.text)
        this.readonly = false;
        this.disabled = false;
        this.readEmail = true;
        this.bdService.getById('clases', this.clase).then(res => {
          res.subscribe(docRef => {
            let clase = docRef.data();

            console.log('clase', clase)
            this.cargarDataAlFormulario(clase);

          })
        })
        break;
      default:
        //Declaraciones ejecutadas cuando ninguno de los valores coincide con el valor de la expresión
        break;
    }
  }
  crearFormulario() {

    this.formClase = this.fb.group({

      uid: ['', Validators.required],
      subjectMatter: ['', Validators.required],
      profesor: ['', Validators.required],
      grade: ['', Validators.required],
      cycle: ['', Validators.required],
      link: ['', Validators.required],
      idReunion: ['', Validators.required],
      codigoAcceso: ['', Validators.required],
      createDate: ['', Validators.required],
      createdBy: ['', Validators.required],
      actived: ['', Validators.required],
    }
    );

  }
  cargarDataAlFormulario(data?) {

    if (data) {

      this.formClase.reset({
        uid: data.uid,
        subjectMatter: data.subjectMatter,
        profesor: data.profesor,
        grade: data.grade,
        cycle: data.cycle,
        link: data.link,
        idReunion: data.link,
        codigoAcceso: data.link,
        actived: data.actived,
        createdBy: data.createdBy
      });
    } else {
      this.resetForm();
    }
  }

  async onSubmit() {
    console.log('this.formClase.value', this.formClase.value)
    this.functionService.presentLoading('Por favor espere');

    try {
      this.bdService.create('clases', this.formClase.value).then(clase => {
        console.log('clase', clase)
        this.resetForm();
        this.functionService.closeLoading();
        this.functionService.presentToast('Clase Creada');
        this.functionService.navigateTo('site/views/classrooms');
      },
        (err) => {
          this.functionService.closeLoading();
          this.functionService.presentToast('Usuario no Creado');
        });

    } catch (err) {
      this.functionService.closeLoading();
      this.functionService.presentToast(err);
      console.log('err', err)
    }

  }
  updateStudent() {
    this.functionService.presentLoading('Por favor espere');
    console.log('this.formClase.value', this.formClase.value);
    this.bdService.update('clases', this.clase, this.formClase.value).then(res => {
      this.resetForm();
      this.functionService.closeLoading();
      this.functionService.presentToast('Clase editada');
      console.log('res', res);
      this.navigateTo('site/views/classrooms');

    })
  }
  navigateTo(link) {
    this.functionService.navigateTo(link);

  }
  calcularEdad(event) {
    let fecha = event.detail.value;
    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
    }
    console.log('edad', edad);
    console.log('edad', Number(edad));
    console.log('edad', edad.toString());
    this.formClase.reset({
      age: edad

    });

  }
  onResize(event) {
    var widthScreen = event.target.innerWidth;
    if (widthScreen > 780) {
      this.flagScreen = true;
    } else {
      this.flagScreen = false;
    }
  }

  genRand(len) {
    return Math.random().toString(36).substring(2, len + 2);
  }
  getRandomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  resetForm() {
    this.formClase.reset({

      uid: '',
      subjectMatter: "",
      profesor: "",
      grade: "",
      cycle: '',
      link: '',
      idReunion: '',
      codigoAcceso: '',
      actived: false,
      createdBy: 0,
      createDate: this.dateToday.toISOString()
    });
  }
  

}
