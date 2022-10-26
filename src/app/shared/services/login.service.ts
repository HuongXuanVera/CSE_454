import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RouterLink } from '../shared/rout.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private url: RouterLink) {}
  apiUrl = this.url.urlAuth + '/Auth/Login';
  async loadLink(UserCred: any) {
    return await this.http.post(this.apiUrl, UserCred).toPromise();
  }
  async getLogin(UserCred: any) {
    const res = await this.loadLink(UserCred).catch((err) => {
      return err;
    });
    return res;
  }
  IsLoggedIn() {
    return localStorage.getItem('token') != '';
  }
  IsNotLogin() {
    return localStorage.getItem('is_login') != 'invalid';
  }
  GetToken() {
    const token = localStorage.getItem('token') || '';
    return token;
  }
}
