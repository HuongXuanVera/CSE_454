import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LicensePlateService } from 'src/app/shared/services/license_plates';
import { SignoutService } from 'src/app/shared/services/signout.service';
import { ErrorService } from 'src/app/shared/services/error.service';
import { BUTTON, Vehicle_Buttons } from 'src/app/shared/data/buttons';
import { InputTollbooth } from 'src/app/shared/modals/inputTollbooth.modal';
import { LicensePlate } from 'src/app/shared/modals/license-plate.modal';
import { VehicleData } from 'src/app/shared/modals/vehicle_data.modal';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { StageAPIService } from 'src/app/shared/services/stage.service';

export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = {
  asc: 'desc',
  desc: '',
  '': 'asc',
};
export const compare = (v1, v2) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);
export interface SortEvent {
  column: string;
  direction: SortDirection;
}
@Component({
  selector: 'app-vehicle-info',
  templateUrl: './vehicle-info.component.html',
  styleUrls: ['./vehicle-info.component.scss'],
})
export class VehicleInfoComponent implements OnInit {
  listStage: any;
  object: any;
  license_plates: LicensePlate[] = [];
  licenses: VehicleData[] = [];
  dataSource: VehicleData[] = [];
  columns = [
    { prop: 'date', name: 'Ngày' },
    { prop: 'hour', name: 'Giờ' },
    { prop: 'station', name: 'Trạm Thu Phí' },
    { prop: 'lane', name: 'Làn Xe' },
    { prop: 'img', name: 'Hình Ảnh', sortable: false },
  ];
  totalCount: Number = 0;
  closeResult: string = '';
  dataParams: any = {
    page_num: '',
    page_size: '',
  };
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  listHeadButtons: BUTTON[] = Vehicle_Buttons;
  loader: boolean = false;
  inputData!: InputTollbooth;
  hasValue: boolean = false;
  constructor(
    private modalService: NgbModal,
    private licensePlateService: LicensePlateService,
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
    this.setTableClass();
  }
  async getSearchData(inputValue: InputTollbooth) {
    this.loader = true;
    this.hasValue = false;
    this.inputData = inputValue;
    await this.getLicensePlate();
    this.licenses = await this.getData();
    this.totalCount = this.licenses.length;
    this.dataSource = this.licenses;
    console.log('UPDATE VEHICLE_INFO' + localStorage);
  }
  setTableClass() {
    const table: any = document.getElementById('dtBasicExample');
    if (table === null) {
      return;
    } else {
      table.DataTable();
      const tableData: any =
        document.getElementsByClassName('dataTables_length')[0];
      let tableClass = tableData.getAttribute('class').toString();
      tableData.setAttribute('class', tableClass + ' bs-select');
    }
  }
  async getLicensePlate() {
    let stages: string[] = [];
    let station: string =
      this.inputData.tollbooth === undefined
        ? stages
        : this.inputData.tollbooth.title === 'Tất Cả Trạm'
        ? this.inputData.tollbooth.value
        : stages.push(this.inputData.tollbooth.value);
    let license: string = this.inputData.license_plates;
    let start: string =
      this.inputData.date_range === undefined
        ? ''
        : this.inputData.date_range.startTime;
    let end: string =
      this.inputData.date_range === undefined
        ? ''
        : this.inputData.date_range.endTime;
    const data = await this.licensePlateService.GetAllLicensePlates(
      stages,
      license,
      start,
      end
    );
    this.loader = false;
    if (data['error'] === undefined) {
      this.hasValue = true;
      this.license_plates = data.result;
    } else {
      if (this.router.url === this.routCurrent) {
        this.errorservice.getError(data);
      }
    }

    this.setTableClass();
  }
  async getData() {
    let listLicenses: VehicleData[] = [];
    this.license_plates.forEach((l) => {
      const license: VehicleData = {
        hour: l.createdTime.substring(11, 19).toString(),
        date: l.createdTime.substring(0, 10),
        station: l.stageName === null ? 'Trạm Vĩnh Phú' : l.stageName,
        lane: l.laneName === null ? 'Làn 201' : l.laneName,
        img: 'https://becamex.com.vn/wp-content/uploads/2021/12/A9-Tower-10-scaled.jpg',
      };
      listLicenses.push(license);
    });
    return listLicenses;
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
  openImg(index: number, warningmodal) {
    this.object = this.licenses[index];
    this.modalService.open(warningmodal);
  }
  sort(item: any, sortInc: boolean) {
    if (sortInc) {
    }
  }
}
