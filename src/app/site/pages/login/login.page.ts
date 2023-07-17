import { Component, OnInit } from '@angular/core';
import { Componente } from 'src/app/interfaces/interfaces';
import * as SecureLS from 'secure-ls';
import { DataService } from '../../../services/data.service';
import { Router } from '@angular/router';
import { FunctionService } from '../../../services/functions';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from "@angular/forms";
import { FirebaseService } from '../../services/firebase.service';
import { UsuarioModel } from '../../models/usuario.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  flagScreen: boolean = false;
  ls = new SecureLS({ encodingType: 'aes' });
  usuario: UsuarioModel;
  formLogin: UntypedFormGroup;

   
  constructor(
    public fb: UntypedFormBuilder,
    public authService: FirebaseService,
    private functionService: FunctionService) {
    if (screen.width > 780) {
      this.flagScreen = true;
    }
    this.crearFormulario();
    this.cargarDataAlFormulario();
  }

  ngOnInit() {
    this.usuario = new UsuarioModel();
  }

  
  onResize(event) {
    var widthScreen = event.target.innerWidth;
    if (widthScreen > 780) {
      this.flagScreen = true;
    } else {
      this.flagScreen = false;
    }
  }
  crearFormulario() {

    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', Validators.required],
    }
    );

  }
  cargarDataAlFormulario() {

    // this.forma.setValue({
    this.formLogin.reset({
      correo: 'fernando@gmail.com',
      password: '123',
    });

  }
  onSubmit() {

    console.log('this.formLogin.value  ==>', this.formLogin.value);
    console.log('this.formLogin.invalid', this.formLogin.invalid)
    let email = this.formLogin.value.email;
    let password = this.formLogin.value.password;
    if (!this.formLogin.invalid) {

      console.log('this.formLogin.value  ==>', this.formLogin.value);
      this.authService.SignIn(email, password);
    }

    // Posteo de información
    this.formLogin.reset({
      correo: '',
      password: '',
    });

  }

  get correoNoValido() {
    return this.formLogin.get('email').invalid && this.formLogin.get('email').touched
  }
  get passwordNoValido() {
    return this.formLogin.get('password').invalid && this.formLogin.get('password').touched;
  }
  navigateTo(link) {
    this.functionService.navigateTo(link);

  }

}
