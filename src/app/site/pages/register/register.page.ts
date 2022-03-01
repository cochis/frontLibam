import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import * as SecureLS from 'secure-ls';
import { UsuarioModel } from '../../models/usuario.model';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { FirebaseService } from '../../services/firebase.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public flagScreen: boolean = false;
  usuario: UsuarioModel;
  formRegistration: FormGroup;

  constructor(public fb: FormBuilder,
    private fb_service: FirebaseService) {
    this.crearFormulario();
    this.cargarDataAlFormulario();
    // this.crearListeners();
  }

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


  onResize(event) {
    var widthScreen = event.target.innerWidth;
    if (widthScreen > 780) {
      this.flagScreen = true;
    } else {
      this.flagScreen = false;
    }
  }
  crearFormulario() {

    this.formRegistration = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', Validators.required],
    }
    );

  }
  cargarDataAlFormulario() {

    // this.forma.setValue({
    this.formRegistration.reset({
      correo: 'fernando@gmail.com',
      password: '123',
    });

  }
  onSubmit() {

    console.log('this.formRegistration.value  ==>', this.formRegistration.value);
    console.log('this.formRegistration.invalid', this.formRegistration.invalid)
    if (!this.formRegistration.invalid) {

      console.log('this.formRegistration.value  ==>', this.formRegistration.value);

    }

    // Posteo de información
    this.formRegistration.reset({
      correo: '',
      password: '',
    });

  }

  get correoNoValido() {
    return this.formRegistration.get('email').invalid && this.formRegistration.get('email').touched
  }
  get passwordNoValido() {
    return this.formRegistration.get('password').invalid && this.formRegistration.get('password').touched;
  }

}
