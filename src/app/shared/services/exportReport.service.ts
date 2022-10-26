import { RouterLink } from '../shared/rout.service';
import { Observer, Observable } from 'rxjs';
import { ErrorService } from './error.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Options } from '@angular-slider/ngx-slider';

@Injectable({
  providedIn: 'root',
})
export class ExportReportService {
  constructor(
    private http: HttpClient,
    private errorservice: ErrorService,
    private url: RouterLink
  ) {}
  urlExportFile = this.url.urlApi + '/HistoryData/PrintReport?';
  urlExportAllStages = this.url.urlApi + '/HistoryData/PrintReportTwoStation?';
  urlGetAllHistory =
    this.url.urlApi + '/HistoryData/GetLastestHistoryDataOfShift?';
  getData: any;
  getvalue: any;
  async loadLink(url: string) {
    return await this.http.get(url).toPromise();
  }
  async GetFileExel(stationname: string, gateWayID: string, date: string) {
    const link = this.urlExportFile + `GatewayID=${gateWayID}&date=${date}`;
    const response: any = await this.http
      .get<Blob>(link, {
        observe: 'response',
        responseType: 'blob' as 'json',
      })
      .toPromise();
    if (response.status === 200) {
      const getFile = await this.downLoadFile(response, stationname, date);
    }
    return response;
  }
  async GetAllStationFileExel(
    stationname: string,
    gateWayID: [],
    date: string
  ) {
    const body = {
      payload: gateWayID,
    };
    const headOption = {
      observe: 'response',
      responseType: 'blob' as 'json',
    };

    const link = this.urlExportAllStages + `&date=${date}`;
    const response = await this.http
      .post<Blob>(link, gateWayID, {
        observe: 'response',
        responseType: 'blob' as 'json',
      })
      .toPromise();
    const getFile = await this.downLoadFile(response, stationname, date);
  }

  async downLoadFile(response: any, name: string, date: string) {
    let filename: string = `report_${name}_${date}.xlsx`;
    let binaryData: any = [];
    binaryData.push(response.body);
    let downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(
      new Blob(binaryData, { type: 'blob' })
    );
    downloadLink.setAttribute('download', filename);
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }
  async GetDataReport(gatewayId: string, shift: string, date: string) {
    let data: string = '';
    data = gatewayId === '' ? '' : data + `gatewayID=${gatewayId}`;
    data = data === '' ? data + 'date=' + date : data + '&' + 'date=' + date;
    data =
      shift === ''
        ? data
        : data === ''
        ? `shift=${shift}`
        : data + '&' + `shift=${shift}`;

    this.getData = await this.loadLink(this.urlGetAllHistory + data).catch(
      (err) => {
        //this.errorservice.handleError(err);
        return err;
      }
    );
    return this.getData;
  }
}
