import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { FunctionService } from 'src/app/services/functions';
import { FirebaseService } from 'src/app/site/services/firebase.service';
import { FirebasebdService } from 'src/app/site/services/firebasebd.service';
@Component({
  selector: 'app-classrooms',
  templateUrl: './classrooms.page.html',
  styleUrls: ['./classrooms.page.scss'],
})
export class ClassroomsPage implements OnInit {
  flagScreen: boolean = false;
  type = '';
  text = '';
  clase: any;
  clases: any[];
  typeSearch = '';
  textoBuscar: string = '';
  constructor(
    public fb: UntypedFormBuilder,
    private functionService: FunctionService,
    public authService: FirebaseService,
    public database: FirebasebdService) { }

  ngOnInit() {
    this.database.getAll('clases').then(firebaseResponse => {
      firebaseResponse.subscribe(listaDeUsuariosRef => {

        this.clases = listaDeUsuariosRef.map(usuarioRef => {
          let usuario = usuarioRef.payload.doc.data();
          usuario['id'] = usuarioRef.payload.doc.id;
          return usuario;
        })
        console.log(this.clases);

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
