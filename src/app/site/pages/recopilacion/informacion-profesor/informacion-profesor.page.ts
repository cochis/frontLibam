import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FunctionService } from 'src/app/services/functions';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ProfesorModel } from 'src/app/site/models/profesor.model';
import { UsuarioModel } from 'src/app/site/models/usuario.model';
import { FirebaseService } from 'src/app/site/services/firebase.service';
import { FirebasebdService } from 'src/app/site/services/firebasebd.service';

@Component({
  selector: 'app-informacion-profesor',
  templateUrl: './informacion-profesor.page.html',
  styleUrls: ['./informacion-profesor.page.scss'],
})
export class InformacionProfesorPage implements OnInit {
  flagScreen: boolean = false;
  type = '';
  text = '';
  disabled = false;
  readonly = false;
  readEmail = false;
  usuario: UsuarioModel;
  profesor: ProfesorModel;
  formProfesor: FormGroup;
  dateToday: Date = new Date();
  constructor(private activatedRoute: ActivatedRoute,
    public fb: FormBuilder,
    private functionService: FunctionService,
    public authService: FirebaseService,
    public bdService: FirebasebdService) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.type = params.type;
      this.profesor = params.id;
      console.log('this.profesor', this.profesor)
    });
    this.crearFormulario();
    this.cargarDataAlFormulario();
    console.log('this.dateToday', this.dateToday)
    console.log('this.dateToday.toISOString()', this.dateToday.toISOString())
  }

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    console.log('this.type', this.type)
    switch (this.type) {
      case 'Register':

        this.text = 'Registro de profesor';
        console.log('this.text', this.text);
        this.readonly = false;
        this.disabled = false;
        this.readEmail = false;
        break;
      case 'View':

        this.text = 'Visualización de información de profesor';
        console.log('this.text', this.text)
        this.readonly = true;
        this.disabled = true;
        this.readEmail = true;
        console.log('this.profesor', this.profesor)
        this.bdService.getById('profesors', this.profesor).then(res => {
          res.subscribe(docRef => {
            let usuario = docRef.data();

            console.log('usuario', usuario)
            this.cargarDataAlFormulario(usuario);

          })
        })





        break;

      case 'Edit':
        this.text = 'Edición de información de profesor';
        console.log('this.text', this.text)
        this.readonly = false;
        this.disabled = false;
        this.readEmail = true;
        this.bdService.getById('profesors', this.profesor).then(res => {
          res.subscribe(docRef => {
            let usuario = docRef.data();

            console.log('usuario', usuario)
            this.cargarDataAlFormulario(usuario);

          })
        })
        break;
      default:
        //Declaraciones ejecutadas cuando ninguno de los valores coincide con el valor de la expresión
        break;
    }
  }

  crearFormulario() {

    this.formProfesor = this.fb.group({
      uid: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      surName: ['', Validators.required],
      type: ['', Validators.required],
      age: ['', Validators.required],
      direction: ['', Validators.required],
      phone1: [0, Validators.required],
      namePhone1: ['', Validators.required],
      phone2: [0, Validators.required],
      namePhone2: ['', Validators.required],
      bloodType: ['', Validators.required],
      allegies: ['', Validators.required],
      bornDate: ['', Validators.required],
      createDate: ['', Validators.required],
      createdBy: ['', Validators.required],
      actived: ['', Validators.required],
      email: ['', Validators.required],
    }
    );
  }
  cargarDataAlFormulario(data?) {

    if (data) {
      this.formProfesor.reset({
        uid: data.uid,
        name: data.name,
        lastName: data.lastName,
        surName: data.surName,
        type: data.type,
        age: data.age,
        direction: data.direction,
        phone1: data.phone1,
        namePhone1: data.namePhone1,
        phone2: data.phone2,
        namePhone2: data.namePhone2,
        bloodType: data.bloodType,
        allegies: data.allegies,
        bornDate: data.bornDate,
        createDate: data.createDate,
        actived: data.actived,
        createdBy: data.createdBy,
        email: data.email,
      });
    } else {
      this.formProfesor.reset({
        uid: '',
        name: "",
        lastName: "",
        surName: "",
        type: "",
        age: 0,
        direction: '',
        phone1: 0,
        namePhone1: '',
        phone2: '',
        namePhone2: '',
        bloodType: '',
        allegies: '',
        bornDate: '',
        createDate: this.dateToday.toISOString(),
        actived: false,
        createdBy: '',
        email: ''
      });
    }
  }
  async onSubmit() {
    console.log('this.formProfesor.value', this.formProfesor.value)
    this.functionService.presentLoading('Por favor espere');
    let email = this.formProfesor.value.email;
    console.log('email', email)
    let password = 'ProfLibam2022';
    console.log('password', password)
    let type = this.formProfesor.value.type;
    try {
      await this.authService.SignUp(email, password, type).then(user => {
        if (user) {
          this.functionService.closeLoading();
          this.functionService.presentToast('Usuario Creado');
          this.bdService.create('profesors', this.formProfesor.value).then(profesor => {
            console.log('profesor', profesor)
            this.functionService.presentToast('Profesor Creado');
            this.functionService.navigateTo('site/views/profesors');
          });
        } else {
          this.functionService.closeLoading();
          this.functionService.presentToast('Usuario no Creado');
        }

      });




    } catch (err) {
      this.functionService.closeLoading();
      this.functionService.presentToast(err);
      console.log('err', err)
    }

  }
  updateProfesor() {
    console.log('this.formProfesor.value', this.formProfesor.value);
    this.bdService.update('profesors', this.profesor, this.formProfesor.value).then(res => {
      console.log('res', res);
      this.navigateTo('site/views/profesors');

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
    this.formProfesor.reset({
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
}
