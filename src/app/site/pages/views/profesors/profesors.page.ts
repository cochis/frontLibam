import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FunctionService } from 'src/app/services/functions';
import { FirebaseService } from 'src/app/site/services/firebase.service';
import { FirebasebdService } from 'src/app/site/services/firebasebd.service';

@Component({
  selector: 'app-profesors',
  templateUrl: './profesors.page.html',
  styleUrls: ['./profesors.page.scss'],
})
export class ProfesorsPage implements OnInit {
  flagScreen: boolean = false;
  type = '';
  text = '';
  profesor: any;
  profesors: any[];
  typeSearch = '';
  textoBuscar: string = '';
  constructor(
    public fb: FormBuilder,
    private functionService: FunctionService,
    public authService: FirebaseService,
    public database: FirebasebdService) { }

  ngOnInit() {
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
