import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RouterLink } from '../shared/rout.service';

@Injectable({
  providedIn: 'root',
})
export class LicensePlateService {
  constructor(private http: HttpClient, private url: RouterLink) {}
  apiUrl = this.url.urlApi + '/LicensePlates/FindLicensePlates?';
  getData: any;
  async loadLink(url: string) {
    return await this.http.get(url).toPromise();
  }
  async GetAllLicensePlates(
    station: any,
    license_plate: string,
    start: string,
    end: string
  ) {
    let inputState: string = station.length === 1 ? `stageID=${station}&` : '';
    this.getData = await this.loadLink(
      this.apiUrl +
        `${inputState}licensePlatesName=${license_plate}&startTime=${start}&endTime=${end}`
    ).catch((err) => {
      return err;
    });
    return this.getData;
  }
}
