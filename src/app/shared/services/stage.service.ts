import { RouterLink } from '../shared/rout.service';
import { ErrorService } from './error.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class StageAPIService {
  constructor(private http: HttpClient, private url: RouterLink) {}
  getData: any;
  allStage: any[] = [];
  urlGetAllStage = this.url.urlApi + '/Stage/GetAllStage';
  async loadLink(url: string) {
    return await this.http.get(url).toPromise();
  }
  async GetAllStage() {
    this.getData = await this.loadLink(this.urlGetAllStage).catch((err) => {
      return err;
    });
    const allButtons = this.getData.result;
    return allButtons;
  }
  changeValueButton(headBreadBtns: any[]) {
    headBreadBtns.forEach((btn) => {
      if (btn.name === 'tollbooth') {
        btn.title = 'Trạm Thu Phí';
      }
      if (btn.name === 'lane') {
        btn.title = 'Làn xe';
      }
    });
    return headBreadBtns;
  }
}
