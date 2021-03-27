import { Component, OnInit } from '@angular/core';
import { Componente } from 'src/app/interfaces/interfaces';
import * as SecureLS from 'secure-ls';
import { DataService } from '../../../services/data.service';
import { Router } from '@angular/router';
import { FunctionService } from '../../../services/functions';
import { NgForm } from '@angular/forms';
import { UserLogin } from '../../interfaces/interfaces';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  flagScreen: boolean = false;
  componentes: Componente[];
  ls = new SecureLS({ encodingType: 'aes' });
  menuItems: any;

  public usuario: UserLogin = {
    email: '',
    password: '',
    date: ''
  };

  constructor(
    private dataService: DataService,
    private router: Router,
    private functionService: FunctionService) {
    if (screen.width > 780) {
      this.flagScreen = true;
    }

  }

  ngOnInit() {
    this.usuario.email = "";
    this.usuario.password = "";
    this.usuario.date = '';

    if (screen.width > 780) {
      this.flagScreen = true;
    }
  }

  onSubmit(formulario: NgForm) {
    // console.log('submit');
    
    this.usuario.date = this.functionService.convertBeautifulDate(new Date());
    console.log(this.usuario);
    // console.log(formulario.value);

  }
  onResize(event) {
    var widthScreen = event.target.innerWidth;
    if (widthScreen > 780) {
      this.flagScreen = true;
    } else {
      this.flagScreen = false;
    }
  }
  navigateTo(link) {
    this.functionService.navigateTo(link);

  }

}
