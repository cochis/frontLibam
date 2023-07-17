import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from "@angular/forms";
import * as SecureLS from 'secure-ls';
import { FunctionService } from 'src/app/services/functions';
import { UsuarioModel } from '../../models/usuario.model';
import { FirebaseService } from '../../services/firebase.service';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  flagScreen: boolean = false;
  ls = new SecureLS({ encodingType: 'aes' });
  usuario: UsuarioModel;
  formPassword: UntypedFormGroup;
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

    this.formPassword = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', Validators.required],
    }
    );

  }
  cargarDataAlFormulario() {

    // this.forma.setValue({
    this.formPassword.reset({
      correo: 'fernando@gmail.com',
      password: '123',
    });

  }
  onSubmit() {

    let email = this.formPassword.value.email;
    if (!this.formPassword.invalid) {

      console.log('this.formPassword.value  ==>', this.formPassword.value);
      this.authService.ForgotPassword(email);
      this.navigateTo("/site/login")
    }

    // Posteo de información
    this.formPassword.reset({
      correo: '',
      password: '',
    });

  }

  get correoNoValido() {
    return this.formPassword.get('email').invalid && this.formPassword.get('email').touched
  }
  get passwordNoValido() {
    return this.formPassword.get('password').invalid && this.formPassword.get('password').touched;
  }
  navigateTo(link) {
    this.functionService.navigateTo(link);

  }
}
