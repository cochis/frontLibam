import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { FunctionService } from 'src/app/services/functions';
import { CursoModel } from 'src/app/site/models/curso.model';
import { StudentModel } from 'src/app/site/models/estudent.model';
import { ProfesorModel } from 'src/app/site/models/profesor.model';
import { UsuarioModel } from 'src/app/site/models/usuario.model';
import { FirebaseService } from 'src/app/site/services/firebase.service';
import { FirebasebdService } from 'src/app/site/services/firebasebd.service';
import { IonDatetime } from '@ionic/angular';
@Component({
  selector: 'app-informacion-curso',
  templateUrl: './informacion-curso.page.html',
  styleUrls: ['./informacion-curso.page.scss'],
})
export class InformacionCursoPage implements OnInit {
  flagScreen: boolean = false;
  type = '';
  text = '';
  disabled = false;
  readonly = false;
  readEmail = false;
  id: '';
  usuario: UsuarioModel;
  students: any;
  curso: any;
  cursoData: any;
  profesors: any;
  formCourse: FormGroup;
  dateToday: Date = new Date();
  inStudents: false;
  typeSearch = '';
  textoBuscar: string = '';
  addStudent = [];
  @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;

  constructor(private activatedRoute: ActivatedRoute,
    public fb: FormBuilder,
    private functionService: FunctionService,
    public authService: FirebaseService,
    public bdService: FirebasebdService,
    public database: FirebasebdService) {

    this.database.getAll('profesors').then(firebaseResponse => {
      firebaseResponse.subscribe(listaDeUsuariosRef => {
        this.profesors = listaDeUsuariosRef.map(usuarioRef => {
          let usuario = usuarioRef.payload.doc.data();
          usuario['id'] = usuarioRef.payload.doc.id;
          return usuario;
        })
        console.log(this.profesors);
      })
    })

    this.database.getAll('students').then(firebaseResponse => {
      firebaseResponse.subscribe(listaDeUsuariosRef => {
        this.students = listaDeUsuariosRef.map(usuarioRef => {
          let usuario = usuarioRef.payload.doc.data();
          usuario['id'] = usuarioRef.payload.doc.id;
          return usuario;
        })
        console.log("aqui estan ", this.students);
        for (let i; i < this.students.length; i++) {
          this.students[i].isSelected = false;
        }
        console.log('this.students', this.students)
        this.addStudent = this.formCourse.value.students;
        console.log('this.addStudent', this.addStudent)



      })
    })
    this.activatedRoute.queryParams.subscribe(params => {
      this.type = params.type;
      this.curso = params.id;
      console.log('this.curso', this.curso)
    });
    this.crearFormulario();
    this.cargarDataAlFormulario();

  }

  ngOnInit() {

    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    console.log('this.type', this.type)
    switch (this.type) {
      case 'Register':

        this.text = 'Registro de curso';
        console.log('this.text', this.text);
        this.readonly = false;
        this.disabled = false;
        this.readEmail = false;
        break;
      case 'View':

        this.text = 'Visualización de información de curso';
        console.log('this.text', this.text)
        this.readonly = true;
        this.disabled = true;
        this.readEmail = true;
        console.log('this.curso', this.curso)
        this.bdService.getById('courses', this.curso).then(res => {
          res.subscribe(docRef => {
            this.cursoData = docRef.data();

            console.log('cursoData', this.cursoData)
            this.cargarDataAlFormulario(this.cursoData);

          })
        })





        break;

      case 'Edit':
        this.text = 'Edición de información de curso';
        console.log('this.text', this.text)
        this.readonly = false;
        this.disabled = false;
        this.readEmail = true;
        this.bdService.getById('courses', this.curso).then(res => {
          res.subscribe(docRef => {
            let usuario = docRef.data();

            console.log('usuario', usuario)
            this.cursoData = usuario
            console.log('this.cursoData', this.cursoData)
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

    this.formCourse = this.fb.group({
      uid: ['', Validators.required],
      name: ['', Validators.required],
      grade: ['', Validators.required],
      cycle: ['', Validators.required],
      start: ['', Validators.required],
      finish: ['', Validators.required],
      profesorBase: ['', Validators.required],
      porfesorsCocutitulares: [[''], Validators.required],
      students: [[''], Validators.required],
      createDate: ['', Validators.required],
      createdBy: ['', Validators.required],
      actived: ['', Validators.required],
    }
    );
  }
  cargarDataAlFormulario(data?) {

    if (data) {
      this.formCourse.reset({
        uid: data.uid,
        name: data.name,
        grade: data.grade,
        cycle: data.cycle,
        start: data.cycle,
        finish: data.cycle,
        profesorBase: data.profesorBase,
        porfesorsCocutitulares: data.porfesorsCocutitulares,
        students: data.students,
        createDate: data.createDate,
        createdBy: data.createdBy,
        actived: data.actived,
      });
    } else {
     this.resetForm();
    }
  }

  async onSubmit() {
    this.functionService.presentLoading('Por favor espere');
    try {

      console.log('this.formCourse.value', this.formCourse.value)
      this.bdService.create('courses', this.formCourse.value).then(course => {
        console.log('course', course)
        this.functionService.closeLoading();
        this.functionService.presentToast('Curso Creado');
        this.functionService.navigateTo('site/views/courses');
      });


    } catch (err) {
      this.functionService.closeLoading();
      this.functionService.presentToast(err);
      console.log('err', err)
    }

  }
  updateCourse() {
    this.formCourse.value.students = this.addStudent;
    console.log('this.formCourse.value', this.formCourse.value);
    this.bdService.update('courses', this.curso, this.formCourse.value).then(res => {
      this.navigateTo('site/views/courses');

    })
  }
  navigateTo(link) {
    this.functionService.navigateTo(link);

  }

  onResize(event) {
    var widthScreen = event.target.innerWidth;
    if (widthScreen > 780) {
      this.flagScreen = true;
    } else {
      this.flagScreen = false;
    }
  }
  checkStudent(event) {

    if (event.target.checked) {
      this.addStudent.push(event.target.value);
      console.log('this.addStudent', this.addStudent)
    } else {
      let student = this.addStudent.indexOf(event.target.value);
      this.addStudent.splice(student, 1);
      console.log('this.addStudent', this.addStudent)

    }

  }
  resetForm(){
    this.formCourse.reset({
      uid: '',
      name: "",
      grade: '',
      cycle: '',
      start: '',
      finish: '',
      profesorBase: 0,
      porfesorsCocutitulares: [],
      students: [],
      createDate: this.dateToday.toISOString(),
      actived: false,
      createdBy: '',
    });
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
