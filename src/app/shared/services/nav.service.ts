import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, fromEvent, Subject } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';

//Menu Bar
export interface Menu {
  headTitle?: string;
  path?: string;
  title?: string;
  icon?: string;
  type?: string;
  badgeType?: string;
  badgeValue?: string;
  badgeClass?: string;
  active?: boolean;
  addition?: string;
  children?: Menu[];
  position?: number;
  detail?:string;
}

@Injectable({
  providedIn: 'root',
})
export class NavService implements OnDestroy {
  private unsubscriber: Subject<any> = new Subject();
  public screenWidth: BehaviorSubject<number> = new BehaviorSubject(
    window.innerWidth
  );

  public megaMenu: boolean = false;
  public megaMenuCollapse: boolean = window.innerWidth < 1199 ? true : false;
  public collapseSidebar: boolean = window.innerWidth < 991 ? true : false;
  public fullScreen: boolean = false;
  constructor(private router: Router) {
    this.setScreenWidth(window.innerWidth);
    fromEvent(window, 'resize')
      .pipe(debounceTime(1000), takeUntil(this.unsubscriber))
      .subscribe((evt: any) => {
        this.setScreenWidth(evt.target.innerWidth);
        if (evt.target.innerWidth < 991) {
          this.collapseSidebar = false;
          this.megaMenu = false;
        }
        if (evt.target.innerWidth < 1199) {
          this.megaMenuCollapse = true;
        }
      });
    if (window.innerWidth < 991) {
      this.router.events.subscribe((event) => {
        this.collapseSidebar = false;
        this.megaMenu = false;
      });
    }
  }

  ngOnDestroy() {
    this.unsubscriber.next(true);
    this.unsubscriber.complete();
  }

  private setScreenWidth(width: number): void {
    this.screenWidth.next(width);
  }

  MENUITEMS: Menu[] = [
    { headTitle: 'QUẢN LÝ' },
    {
      path: '/postcheck',
      title: 'Hậu Kiểm',
      type: 'link',
      icon: 'ti-video-camera',
      badgeType: 'danger',
      badgeValue: 'Hot',
      active: false,
    },
    {
      path: '/tables/vehicle-info',
      title: 'Thông Tin Phương Tiện',
      type: 'link',
      icon: 'ti-truck',
      badgeType: 'danger',
      badgeValue: 'Hot',
      active: false,
    },
    {
      path: '/tables/report-data',
      title: 'Xuất Báo Cáo',
      type: 'link',
      icon: 'ti-files',
      badgeType: 'danger',
      badgeValue: 'Hot',
      active: false,
    },

    { headTitle: 'HỖ TRỢ',position:132},
    {
      title: 'Liên Hệ Hỗ Trợ',
      type: 'big_card',
      icon: 'ti-headphone-alt',
      active: true,
      addition: 'open',
    },

    {
      title: 'Nguyễn Quang Vinh',
      type: 'card',
      icon: 'icon icon-user',
      active: false,
      detail:'M: 0909.099.990',
    },
    {
      title: 'Nguyễn Văn Tài',
      type: 'card',
      icon: 'icon icon-user',
      active: false,
      detail:'M: 0909.099.990'
    },
    {
      title: 'Bùi Hương Xuân',
      type: 'card',
      icon: 'icon icon-user',
      active: false,
      detail:'M: 0909.099.990'
    },
  ];

  //array
  items = new BehaviorSubject<Menu[]>(this.MENUITEMS);
}
