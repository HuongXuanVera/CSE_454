import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/shared/services/error.service';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  public Login: any;
  fieldTextType: boolean = false;
  stageOption: any[] = [];
  username: string = '';
  password: string = '';
  responseData: any;
  token: any;
  active: any;
  constructor(
    private router: Router,
    private loginservice: LoginService,
    private errorservice: ErrorService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('is_login') === 'valid') {
      this.router.navigate(['/postcheck']);
    }
    else{
      (localStorage.getItem('is_login') === 'invalid')
    }
  }
  errorMessage = '';

  clearErrorMessage() {
    this.errorMessage = '';
  }

  async login() {
    this.clearErrorMessage();
    if (this.validateForm(this.username, this.password)) {
      this.Login = {
        userName: this.username,

        pwd: this.password,
      };
      const responseData = await this.loginservice.getLogin(this.Login);
      if (responseData.error === undefined) {
        if (responseData.isValid) {
          console.log(responseData);
          this.token = responseData.token;
          localStorage.setItem('token', responseData.token);
          localStorage.setItem('username', this.username);
          localStorage.setItem('is_login', 'valid');
          this.router.navigate(['/postcheck']);
          console.log(localStorage);
        } else {
          this.errorMessage = 'Sai tên đăng nhập hoặc mật khẩu';
        }
      } else {
        this.errorservice.getError(responseData);
      }
    }
  }
  validateForm(username: string, password: string) {
    if (username.length === 0) {
      this.errorMessage = 'Vui lòng điền tên đăng nhập';
      return false;
    }

    if (password.length === 0) {
      this.errorMessage = 'Vui lòng nhập mật khẩu';
      return false;
    }

    if (password.length < 6) {
      this.errorMessage = 'mật khẩu phải có ít nhất 6 chữ cái';
      return false;
    }

    this.errorMessage = '';
    return true;
  }

  //angular
  public loginForm!: FormGroup;
  public error: any = '';

  get form() {
    return this.loginForm.controls;
  }

  Submit() {
    console.log('Submit');
    this.router.navigate(['/postcheck']);
    if (
      this.loginForm.controls['username'].value === 'admin@demo.com' &&
      this.loginForm.controls['password'].value === 'admindemo'
    ) {
      this.router.navigate(['/postcheck']);
    } else {
      this.error = 'Please check email and passowrd';
    }
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
