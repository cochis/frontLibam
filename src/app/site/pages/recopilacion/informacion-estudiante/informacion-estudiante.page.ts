import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentModel } from 'src/app/site/models/estudent.model';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { FunctionService } from 'src/app/services/functions';
import { UsuarioModel } from 'src/app/site/models/usuario.model';
import { FirebaseService } from 'src/app/site/services/firebase.service';
import { FirebasebdService } from 'src/app/site/services/firebasebd.service';
@Component({
  selector: 'app-informacion-estudiante',
  templateUrl: './informacion-estudiante.page.html',
  styleUrls: ['./informacion-estudiante.page.scss'],
})
export class InformacionEstudiantePage implements OnInit {
  flagScreen: boolean = false;
  type = '';
  text = '';
  disabled = false;
  readonly = false;
  readEmail= false;
  usuario: UsuarioModel;
  estudiante: StudentModel;
  formStudent: FormGroup;
  dateToday: Date = new Date();

  constructor(private activatedRoute: ActivatedRoute,
    public fb: FormBuilder,
    private functionService: FunctionService,
    public authService: FirebaseService,
    public bdService: FirebasebdService
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.type = params.type;
      this.estudiante = params.id;
      console.log('this.estudiante', this.estudiante)
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

        this.text = 'Registro de estudiante';
        console.log('this.text', this.text);
        this.readonly = false;
        this.disabled = false;
        this.readEmail = false;
        break;
      case 'View':

        this.text = 'Visualización de información de estudiante';
        console.log('this.text', this.text)
        this.readonly = true;
        this.disabled = true;
        this.readEmail = true;
        console.log('this.estudiante', this.estudiante)
        this.bdService.getById('students', this.estudiante).then(res => {
          res.subscribe(docRef => {
            let usuario = docRef.data();

            console.log('usuario', usuario)
            this.cargarDataAlFormulario(usuario);

          })
        })





        break;

      case 'Edit':
        this.text = 'Edición de información de estudiante';
        console.log('this.text', this.text)
        this.readonly = false;
        this.disabled = false;
        this.readEmail = true;
        this.bdService.getById('students', this.estudiante).then(res => {
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

    this.formStudent = this.fb.group({

      idUser: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      surName: ['', Validators.required],
      grade: ['', Validators.required],
      cycle: ['', Validators.required],
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
      this.formStudent.reset({
        idUser: data.idUser,
        name: data.name,
        lastName: data.lastName,
        surName: data.surName,
        grade: data.grade,
        cycle: data.cycle,
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
      this.formStudent.reset({
        idUser: '',
        name: "",
        lastName: "",
        surName: "",
        grade: '',
        cycle: '',
        age: 0,
        direction: '',
        phone1: 0,
        namePhone1: '',
        phone2: '',
        namePhone2: '',
        bloodType: '',
        allegies: '',
        bornDate: '',
        createDate: '',
        actived: false,
        createdBy: '',
        email: ''
      });
    }
  }

  async onSubmit() {
    console.log('this.formStudent.value', this.formStudent.value)
    this.functionService.presentLoading('Por favor espere');
    let email = this.formStudent.value.email;
    console.log('email', email)
    let password = 'Libam2022';
    console.log('password', password)
    try {
      await this.authService.SignUp(email, password).then(user => {
        if (user) {
          this.functionService.closeLoading();
          this.functionService.presentToast('Usuario Creado');
          this.bdService.create('students', this.formStudent.value).then(student => {
            console.log('student', student)
            this.functionService.presentToast('Estudiante Creado');
            this.functionService.navigateTo('site/views/students');
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
  updateStudent() {
    console.log('this.formStudent.value', this.formStudent.value);
    this.bdService.update('students', this.formStudent.value.id, this.formStudent.value).then(res => {
      console.log('res', res);
      this.navigateTo('site/views/students');

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
    this.formStudent.reset({
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
}
