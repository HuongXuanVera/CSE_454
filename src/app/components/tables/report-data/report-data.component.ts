import { ExportReportService } from './../../../shared/services/exportReport.service';
import { Component, OnInit } from '@angular/core';
import { SignoutService } from 'src/app/shared/services/signout.service';
import { ErrorService } from 'src/app/shared/services/error.service';
import { BUTTON, Report_Buttons } from 'src/app/shared/data/buttons';
import { InputTollbooth } from 'src/app/shared/modals/inputTollbooth.modal';
import { Router } from '@angular/router';
import { StageAPIService } from 'src/app/shared/services/stage.service';

@Component({
  selector: 'app-report-data',
  templateUrl: './report-data.component.html',
  styleUrls: ['./report-data.component.scss'],
})
export class ReportDataComponent implements OnInit {
  listStage: any;

  totalCountVehicles: number = 0;
  laneNumber: number = 0;
  dataExport: any[] = [];
  dataExportAll: any[] = [];
  historyReportAll: any[] = [];
  historyReport: any[] = [];
  listHeadButtons: BUTTON[] = Report_Buttons;
  listTableButtons: BUTTON = {
    title: 'Xuất Báo Cáo',
    icon: 'folder',
    button: 'button',
    action: 'reportFile',
    name: 'report',
    color: 'secondary',
  };
  loader: boolean = false;
  inputData!: InputTollbooth;
  hasValue: boolean = false;
  constructor(
    private exportservice: ExportReportService,
    private signOut: SignoutService,
    private errorservice: ErrorService,
    private router: Router,
    private stageservice: StageAPIService
  ) {}
  routCurrent = this.router.url;

  ngOnInit(): void {
    if (localStorage.getItem('is_login') === 'invalid') {
      this.signOut.signout();
    }
    if (localStorage.getItem('is_login') === 'valid') {
      this.stageservice.changeValueButton(this.listHeadButtons);
    }
    this.hasValue = false;
    const btn = this.listHeadButtons.findIndex((a) => a.name == 'tollbooth');
    this.listHeadButtons[btn].children =
      this.getDataFromLocalStorage('stageBtns');
  }
  async getSearchData(inputValue: InputTollbooth) {
    this.loader = true;
    this.hasValue = false;
    this.inputData = inputValue;
    await this.getExportData();
    console.log(this.historyReport.length);
  }
  async getExportData() {
    let shift: string = '';
    let station: any =
      this.inputData.tollbooth === undefined
        ? ''
        : this.inputData.tollbooth.title === 'Tất Cả Trạm'
        ? ''
        : this.inputData.tollbooth.value;
    let date: string =
      this.inputData.date === undefined ? '' : this.inputData.date;
    const data = await this.exportservice.GetDataReport(station, shift, date);
    this.loader = false;
    if (data['error'] === undefined) {
      this.hasValue = true;
      this.historyReport = [];
      this.historyReportAll = [];
      if (station === '') {
        this.dataExportAll = data.res;
        this.historyReportAll = this.dataProcessAll(this.dataExportAll);
      } else {
        this.dataExport = data.res.historyDatas;
        this.historyReport = this.dataProcess(this.dataExport);
      }
    } else {
      if (this.router.url === this.routCurrent) {
        this.errorservice.getError(data);
      }
    }
  }
  getDataFromLocalStorage(name: string) {
    const temp = localStorage.getItem(name);
    if (temp != null) {
      const buttons = JSON.parse(temp);
      return buttons;
    } else {
      return null;
    }
  }
  dataProcess(array: any[]) {
    this.historyReport = [];
    let historyDatas: any[] = [];
    let laneCounts: any[] = [];
    let stationTotal: number = 0;
    array.forEach((item) => {
      if (item !== null) {
        this.laneNumber = Object.keys(item.count).length;
        let totalLane: number = 0;
        laneCounts = [];
        let OPJECT = item.count;
        Object.entries(OPJECT).forEach(([key, value]) => {
          totalLane += Number(value);
          const dict = {
            key: key.replace('lane_', 'Làn '),
            value: value,
          };
          laneCounts.push(dict);
        });
        stationTotal += totalLane;
        console.log('number ' + stationTotal);
        const temp = {
          shift: item.currentShift,
          lanes: laneCounts,
          total: totalLane,
        };
        console.log('historyDatas:' + historyDatas);
        historyDatas.push(temp);
      }
    });
    this.totalCountVehicles = stationTotal;
    return historyDatas;
  }
  dataProcessAll(array: any) {
    let historyReportAll: any[] = [];
    array.forEach((item) => {
      const history = this.dataProcess(item.historyDatas);
      const name = this.checkNameStation(item.gatewayID);
      historyReportAll.push({ title: name, data: history });
    });
    return historyReportAll;
  }
  checkNameStation(name: string) {
    const station: string = localStorage.getItem('stageBtns') || '';
    const arrStation = JSON.parse(station);
    let nameStation: string = '';
    arrStation.forEach((element) => {
      if (name === element.value) {
        nameStation = element.title;
      }
    });
    return nameStation;
  }
}
