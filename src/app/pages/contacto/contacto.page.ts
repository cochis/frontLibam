import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { FunctionService } from '../../services/functions';
@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
})

export class ContactoPage implements OnInit {
  public contactoForm: FormGroup;
  contact = {
    name: '',
    email: '',
    phone:'',
    message: '',
  }

  flagScreen: boolean = false;
  constructor(
    private functionService: FunctionService,
  ) {
    if (screen.width > 780) {
      this.flagScreen = true;
    }
  }
  ngOnInit() {
  }
  onSubmit(formulario: NgForm) {
    console.log('submit');

    console.log(formulario.form.value);
  }
  buildForm() {
    this.contactoForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl(''),
      message: new FormControl('')
    });
  }

  onResize(event) {
    this.flagScreen = this.functionService.onResize(event);
    console.log(this.functionService.onResize(event));

  }

}
