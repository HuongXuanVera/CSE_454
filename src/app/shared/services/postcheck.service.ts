import { RouterLink } from '../shared/rout.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorService } from './error.service';
@Injectable({
  providedIn: 'root',
})
export class PostcheckService {
  constructor(private http: HttpClient, private errorservice: ErrorService,private url:RouterLink) {}
  getData: any = '';
  urlPost: string =this.url.urlApi+'/Vtt/GetURLandGenerateVttFile?';
  async loadLink(url: string) {
    return await this.http.get(url).toPromise();
  }
  async getFileVideo(station: string, lane: string, date: string) {
    let data: string = '';
    data = station === '' ? '' : data + `channel=${station}`;
    data = data === '' ? data + 'date=' + date : data + '&' + 'date=' + date;
    console.log('input data ' + data);
    data = `channel=channel1&date=${date}&lane=${lane}`;
    this.getData = await this.loadLink( this.urlPost + data).catch((err) => {
      return err;
    });
    return this.getData;
  }
}
