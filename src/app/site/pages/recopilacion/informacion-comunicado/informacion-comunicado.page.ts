import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FunctionService } from 'src/app/services/functions';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from "@angular/forms";
import { ProfesorModel } from 'src/app/site/models/profesor.model';
import { UsuarioModel } from 'src/app/site/models/usuario.model';
import { FirebaseService } from 'src/app/site/services/firebase.service';
import { FirebasebdService } from 'src/app/site/services/firebasebd.service';
import { ComunicateModel } from 'src/app/site/models/comunicate.model';
import { StorageService } from 'src/app/site/services/storage.service';
@Component({
  selector: 'app-informacion-comunicado',
  templateUrl: './informacion-comunicado.page.html',
  styleUrls: ['./informacion-comunicado.page.scss'],
})
export class InformacionComunicadoPage implements OnInit {
  flagScreen: boolean = false;
  type = '';
  text = '';
  disabled = false;
  readonly = false;
  readEmail = false;
  usuario: UsuarioModel;
  comunicate: ComunicateModel;
  formComunicate: UntypedFormGroup;
  dateToday: Date = new Date();
  fileView: any;
  imgView = false;
  pdfView = false;
  constructor(private activatedRoute: ActivatedRoute,
    public fb: UntypedFormBuilder,
    private functionService: FunctionService,
    private authService: FirebaseService,
    private bdService: FirebasebdService,
    private storageService: StorageService) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.type = params.type;
      this.comunicate = params.id;
      console.log('this.comunicate', this.comunicate)
    });
    this.crearFormulario();
    this.cargarDataAlFormulario();
    this.resetForm();
    console.log('this.dateToday', this.dateToday)
    console.log('this.dateToday.toISOString()', this.dateToday.toISOString())
  }

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    console.log('this.type', this.type)
    switch (this.type) {
      case 'Register':

        this.text = 'Registro de comunicado';
        console.log('this.text', this.text);
        this.readonly = false;
        this.disabled = false;
        this.readEmail = false;
        break;
      case 'View':

        this.text = 'Visualización de información de comunicado';
        console.log('this.text', this.text)
        this.readonly = true;
        this.disabled = true;
        this.readEmail = true;
        console.log('this.comunicate', this.comunicate)
        this.bdService.getById('comunicates', this.comunicate).then(res => {
          res.subscribe(docRef => {
            let comunicate = docRef.data();
            console.log('comunicate', comunicate)
            this.cargarDataAlFormulario(comunicate);

          })
        })
        break;
      case 'Edit':
        this.text = 'Edición de información de comunicado';
        console.log('this.text', this.text)
        this.readonly = false;
        this.disabled = false;
        this.readEmail = true;
        this.bdService.getById('comunicates', this.comunicate).then(res => {
          res.subscribe(docRef => {
            let comunicate = docRef.data();
            console.log('comunicate', comunicate)
            this.cargarDataAlFormulario(comunicate);
          })
        })
        break;
      default:
        //Declaraciones ejecutadas cuando ninguno de los valores coincide con el valor de la expresión
        break;
    }
  }

  crearFormulario() {
    this.formComunicate = this.fb.group({
      uid: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      file: ['', Validators.required],
      show: [false, Validators.required],
      cycle: ['', Validators.required],
      role: ['', Validators.required],
      grade: ['', Validators.required],
      actived: [false, Validators.required],
      createDate: [0, Validators.required],

    }
    );
  }
  cargarDataAlFormulario(data?) {

    if (data) {
      this.formComunicate.reset({
        uid: data.uid,
        title: data.title,
        description: data.description,
        file: data.file,
        show: data.show,
        cycle: data.cycle,
        role: data.role,
        grade: data.grade,
        actived: data.actived,
        createDate: data.createDate,
      });
    } else {
      this.resetForm();
    }
  }
  async onSubmit() {
    console.log('this.formComunicate.value', this.formComunicate.value)
    this.functionService.presentLoading('Por favor espere');

    let type = this.formComunicate.value.type;
    console.log('type', type)
    try {

      this.functionService.closeLoading();
      this.bdService.create('comunicates', this.formComunicate.value).then(comunicate => {
        console.log('comunicate', comunicate)
        this.functionService.presentToast('Comunicado Creado');
        this.functionService.navigateTo('site/views/comunicates');
      });
    } catch (err) {
      this.functionService.closeLoading();
      this.functionService.presentToast(err);
      console.log('err', err)
    }

  }
  updateProfesor() {
    console.log('this.formComunicate.value', this.formComunicate.value);
    this.bdService.update('comunicates', this.comunicate, this.formComunicate.value).then(res => {
      console.log('res', res);
      this.resetForm();
      this.navigateTo('site/views/comunicates');

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
    this.formComunicate.reset({
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
  resetForm() {
    this.formComunicate.reset({

      uid: '',
      title: "",
      description: "",
      file: "",
      show: false,
      cycle: "",
      role: 0,
      grade: '',
      actived: false,
      createDate: this.dateToday.toISOString(),
    });
  }
  async uploadFile(event) {

    const type = event.target.files[0].type;
    console.log('type', type)
    if (type == "image/jpeg" || type == "image/png" || type == "image/jpg") {
      this.imgView = true;
      this.pdfView = false;
    } else {
      this.pdfView = true;
      this.imgView = false;

    }
    console.log('this.imgView', this.imgView)
    console.log('this.pdfView', this.pdfView)
    console.log('event.target.files', event.target.files)
    console.log('event.target.files[0]', event.target.files[0])
    await this.toBase64(event.target.files[0]).then(res => {
      console.log(res);
    })

    // reader.onload = await ((file) => {
    //   this.fileView = file.target.result;
    //   console.log('fileView', this.fileView)
    // })


    // let imagenes = [];
    // let reader = new FileReader();
    // const path = 'Comunicado';
    // const name = 'comunicado' + Date.now();
    // const file = event.target.files[0];
    // const res = this.storageService.uploadFile(file, path, name);
    // console.log('res', res);


    // this.onSubmit();
  }

  async toBase64(file) {

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return await reader.onloadend;
    }

    catch (error) {
      console.log('error', error)

    }




  }
}
