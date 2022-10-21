import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
  ) {}

  loginForm = this._formBuilder.group({
    email: ['', [
      Validators.required,
      Validators.email
    ]],
    password: ['', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(40)
    ]],
  });

  isLoginClick() {
    console.log('>> isLoginClick', this.loginForm.value );
    this._authService.login(this.loginForm.value).then( res => {
      console.log('>> res', res);
    }).catch( e => {
      console.log('>> error', e);
    })
  }

  getCurrentUser() {
    this._authService.currentUser().then( res => {
      console.log('>> res', res);
    }).catch( e => {
      console.log('>> error', e);
    })
  }

  get isFormValid(): boolean {
    return this.loginForm.valid;
  }

}
