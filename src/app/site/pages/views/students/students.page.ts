import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FunctionService } from 'src/app/services/functions';
import { StudentModel } from 'src/app/site/models/estudent.model';
import { FirebaseService } from 'src/app/site/services/firebase.service';
import { FirebasebdService } from 'src/app/site/services/firebasebd.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.page.html',
  styleUrls: ['./students.page.scss'],
})
export class StudentsPage implements OnInit {
  flagScreen: boolean = false;
  type = '';
  text = '';
  student: any;
  students: any[];
  typeSearch = '';
  textoBuscar: string = '';
  constructor(private activatedRoute: ActivatedRoute,
    public fb: FormBuilder,
    private functionService: FunctionService,
    public authService: FirebaseService,
    public database: FirebasebdService) { }

  ngOnInit() {
    this.database.getAll('students').then(firebaseResponse => {
      firebaseResponse.subscribe(listaDeUsuariosRef => {

        this.students = listaDeUsuariosRef.map(usuarioRef => {
          let usuario = usuarioRef.payload.doc.data();
          usuario['id'] = usuarioRef.payload.doc.id;
          return usuario;
        })
        console.log(this.students);

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
