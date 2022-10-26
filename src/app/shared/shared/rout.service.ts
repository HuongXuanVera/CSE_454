import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class RouterLink {
  urlAuth: string = 'http://128.199.124.231:8084';
  urlApi: string = 'https://localhost:7121';
  urlVtt: string = 'http://192.168.105.200:8082/Files/';
  getUrlAuth() {
    return this.urlAuth;
  }
  getUrlApi() {
    return this.urlApi;
  }
}
