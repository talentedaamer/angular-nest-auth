import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {FormsComponentsModule} from "../shared/forms-components/forms-components.module";
// import {AuthService} from "../services/auth.service";


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsComponentsModule,
  ],
  providers: [
    // AuthService
  ]
})
export class AuthModule { }
