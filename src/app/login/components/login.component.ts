import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '@environment';

import { DataResponse, KEYS, SessionService } from '@services';
import { LoginService } from '../services/login.service';
import { validFormat } from '@common/utils';
import { LoginRequest } from '../models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public disabledButton = false;
  public appName = environment.APP_NAME;
  public texts = {
    emailLabel: 'Email',
    passwordLabel: 'Password',
    primaryButtonText: 'Login',
  };

  private formBuilder = inject(FormBuilder);
  private sessionService = inject(SessionService);
  private loginService = inject(LoginService);
  private router = inject(Router);

  ngOnInit(): void {
    this.configForm();
    this.sessionService.initStorage();
  }

  private configForm(): void {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(validFormat.EMAIL),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
        ],
      ],
    });
  }

  public login(): void {
    if (this.disabledButton || !this.loginForm.valid) return;

    this.disabledButton = true;

    const body: LoginRequest = { ...this.loginForm.value };

    this.loginService.login(body).subscribe(
      (response: DataResponse) => {
        if (response.getCode() == 200) {
          this.loginForm.reset();
          this.disabledButton = false;
          const data = response.getPayload();
          this.sessionService.setData(KEYS.user, data.user_id);
          this.sessionService.setData(KEYS.token, data.token);
          this.router.navigate(['/tasks-manager']);
        } else {
          this.resetLoginForm();
        }
      },
      () => {
        this.resetLoginForm();
      },
    );
  }

  private resetLoginForm(): void {
    this.disabledButton = false;
    this.loginForm.reset();
  }
}
