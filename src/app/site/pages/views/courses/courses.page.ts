import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FunctionService } from 'src/app/services/functions';
import { FirebaseService } from 'src/app/site/services/firebase.service';
import { FirebasebdService } from 'src/app/site/services/firebasebd.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss'],
})
export class CoursesPage implements OnInit {
  flagScreen: boolean = false;
  type = '';
  text = '';
  student: any;
  students: any[];
  course: any;
  courses: any[];
  typeSearch = '';
  textoBuscar: string = '';
  constructor(public fb: FormBuilder,
    private functionService: FunctionService,
    public authService: FirebaseService,
    public database: FirebasebdService) { }

  ngOnInit() {
    this.database.getAll('courses').then(firebaseResponse => {
      firebaseResponse.subscribe(listaDeUsuariosRef => {

        this.courses = listaDeUsuariosRef.map(usuarioRef => {
          let usuario = usuarioRef.payload.doc.data();
          usuario['id'] = usuarioRef.payload.doc.id;
          return usuario;
        })
        console.log(this.courses);

      })
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
  onSearchChange(event) {
    console.log(event);
    this.textoBuscar = event.detail.value;
  }

  tipoBusqueda(event) {
    console.log(event);
    console.log(event.detail.value);
    this.typeSearch = event.detail.value;
  }

}
