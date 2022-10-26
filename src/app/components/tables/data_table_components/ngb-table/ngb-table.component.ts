import { DecimalPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { BUTTON } from 'src/app/shared/data/buttons';
import { InputTollbooth } from 'src/app/shared/modals/inputTollbooth.modal';
import { LicensePlate } from 'src/app/shared/modals/license-plate.modal';
import { ErrorService } from 'src/app/shared/services/error.service';
import { ExportReportService } from 'src/app/shared/services/exportReport.service';

@Component({
  selector: 'app-ngb-table',
  templateUrl: './ngb-table.component.html',
  styleUrls: ['./ngb-table.component.scss'],
})
export class NgbTableComponent implements OnInit {
  @Input() tableButton!: BUTTON;
  @Input() searchInfo!: InputTollbooth;
  @Input() data!: LicensePlate;
  @Input() dataReport!: any[];
  @Input() totalVehicles!: number;
  @Input() laneNumber!: number;
  @Input() dataReportAll!: any[];
  loader: boolean = false;
  constructor(
    private exportService: ExportReportService,
    private errorservice: ErrorService
  ) {}

  ngOnInit(): void {
    this.loader = false;
    
  }
  async exportFile() {
    this.loader = true;
    let gateWayID = this.searchInfo.tollbooth.value;
    let station = this.searchInfo.tollbooth.title;
    let date = this.searchInfo.date;
    const response =
      station === 'Tất Cả Trạm'
        ? await this.exportService.GetAllStationFileExel(
            station,
            gateWayID,
            date
          )
        : await this.exportService.GetFileExel(station, gateWayID, date);
    if (response.status === 200) {
      this.loader = false;
    } else {
      this.loader = false;
      this.errorservice.getError(response);
    }

    console.log('export file');
  }
}
