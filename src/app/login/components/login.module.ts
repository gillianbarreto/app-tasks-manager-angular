import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@common/components/shared.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    SharedModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [],
  providers: [],
})
export class LoginModule { }
