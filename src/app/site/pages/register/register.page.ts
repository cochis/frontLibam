import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import * as SecureLS from 'secure-ls';
import { UsuarioModel } from '../../models/usuario.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
public flagScreen:boolean = false;
usuario: UsuarioModel;
 
  constructor() { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
    // this.usuario.email = 'ing.oarrs@gmail.com';
    // this.usuario.password ='123456';
    // this.usuario.name='Oscar Alejandro';
    // this.usuario.lastName='Ramirez';
    // this.usuario.surName ='Rosas';
    // this.usuario.role= 'Admin';
    // this.usuario.grade='1';
    // this.usuario.createDate = new Date();
  }
  onSubmit(formulario: NgForm) {
    if(formulario.invalid){
      return;
    }
    console.log(this.usuario);
    console.log(formulario);

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
