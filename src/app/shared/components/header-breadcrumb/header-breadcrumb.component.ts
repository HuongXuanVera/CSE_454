import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { BUTTON } from '../../data/buttons';
import { InputTollbooth } from '../../modals/inputTollbooth.modal';

@Component({
  selector: 'app-header-breadcrumb',
  templateUrl: './header-breadcrumb.component.html',
  styleUrls: ['./header-breadcrumb.component.scss'],
})
export class HeaderBreadcrumbComponent implements OnInit {
  model!: NgbDateStruct;
  selected!: { startTime: Date; endTime: Date };
  license_plates: string = '';
  date: any;
  date_range = { startTime: '', endTime: '' };
  tollbooth: any;
  lane: any;
  message: string = '';
  warningmodal: any;
  @Input() title!: string;
  @Input() items!: any[];
  @Input() active_item!: string;
  @Input() loadData: boolean = true;
  @Input() headBreadBtns!: BUTTON[];
  @Output() inputValue = new EventEmitter<InputTollbooth>();

  constructor(private modalService: NgbModal) {}
  checkHasLane: boolean = false;
  ngOnInit(): void {
    this.checkHasLane = false;
  }
  changeValue(btn: BUTTON, child: any) {
    if (
      btn.name === 'tollbooth' &&
      this.headBreadBtns.filter((a) => a.name === 'lane').length > 0
    ) {
      const headBtns = this.headBreadBtns.find((a) => a.name === 'lane');
      if (headBtns) {
        const btnIndex = this.headBreadBtns.indexOf(headBtns);
        this.headBreadBtns[btnIndex].children = [];
        child.children.forEach((child) => {
          const button: any = {
            title: child.laneName,
            value: child.value,
            id: child.laneID,
          };
          this.headBreadBtns[btnIndex].children?.push(button);
          this.checkHasLane = true;
        });
      }
    }
    btn.name === 'tollbooth' ? (this.tollbooth = child) : (this.lane = child);
    btn.title = child.title;
    if (btn.name === 'gravana') {
      window.open(child.value);
    }
  }
  GetValueLane(warningmodal, btn: BUTTON) {
    if (
      (btn.name === 'lane' && !this.checkHasLane) ||
      (btn.name === 'lane' && !btn.children === undefined)
    ) {
      this.message = ' Dữ liệu trạm còn trống';
      this.modalService.open(warningmodal);
    }
  }
  getInputValue(warningmodal) {
    if (!this.checkValidate()) {
      this.modalService.open(warningmodal);
    } else {
      const buttons: InputTollbooth = {
        tollbooth: this.tollbooth,
        lane: this.lane,
        date: this.date,
        date_range: this.date_range,
        license_plates: this.license_plates,
      };
      this.inputValue.emit(buttons);
    }
  }
  selectDateRangeFunc(selectedDate) {
    if (selectedDate === undefined) {
    } else {
      const start = new Date(selectedDate.startDate.$d).toISOString();
      const end = new Date(selectedDate.endDate.$d).toISOString();
      this.date_range.startTime = start.substring(0, 10);
      this.date_range.endTime = end.substring(0, 10);
      console.log(this.date_range);
    }
  }
  selectDateFunc(selectedDate) {
    if (
      selectedDate === undefined ||
      selectedDate === '' ||
      selectedDate === null ||
      selectedDate.day === undefined
    ) {
      this.date = undefined;
    } else {
      let d = selectedDate.day > 9 ? selectedDate.day : '0' + selectedDate.day;
      let m =
        selectedDate.month > 9 ? selectedDate.month : '0' + selectedDate.month;
      this.date = selectedDate.year + '-' + m + '-' + d;
    }
    console.log(this.date);
  }

  checkValidate() {
    this.message = '';
    for (let i = 0; i < this.headBreadBtns.length; i++) {
      const b = this.headBreadBtns[i];
      if (b.name === 'tollbooth' && this.tollbooth === undefined) {
        this.message = 'Chưa chọn trạm xe hoặc ';
        break;
      }
      if (b.name === 'lane' && this.lane === undefined) {
        this.message = 'Chưa chọn làn xe';
        break;
      }
      if (b.name === 'date' && (this.date === undefined || this.date === '')) {
        this.message = 'Chưa nhập ngày tìm kiếm hoặc dữ liệu ngày không đúng!';
        break;
      }
      if (b.name === 'date range' && this.selected.endTime === null) {
        this.message = 'Chưa nhập khoảng thời gian!';
        break;
      }
      if (
        b.name === 'license plates' &&
        (this.license_plates === '' || this.license_plates === undefined)
      ) {
        this.message =
          'Chưa nhập biển số xe, vui lòng nhập biển số theo cú pháp và không sử dụng ký tự đặc biệt, ví dụ: 61X1234X';
        break;
      }
    }
    if (this.message === '') {
      return true;
    } else {
      return false;
    }
  }
  changePlaceholder() {
    const input = document.getElementsByClassName('license-plates');
    input[0].setAttribute('placeholder', '61C - 333.33');
  }
}
