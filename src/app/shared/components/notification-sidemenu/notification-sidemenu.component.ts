import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { LayoutService } from '../../services/layout.service';
import { SignoutService } from '../../services/signout.service';

@Component({
  selector: 'app-notification-sidemenu',
  templateUrl: './notification-sidemenu.component.html',
  styleUrls: ['./notification-sidemenu.component.scss'],
})
export class NotificationSidemenuComponent implements OnInit {
  layoutSub: Subscription;

  @ViewChild('sidebar', { static: false }) sidebar!: ElementRef;
  constructor(
    private renderer: Renderer2,
    private layoutService: LayoutService,
    private SignoutService: SignoutService
  ) {
    this.layoutSub = layoutService.SidebarNotifyChangeEmitted.subscribe(
      (value) => {
        if (value) {
          this.renderer.addClass(this.sidebar.nativeElement, 'sidebar-open');
        } else {
          this.renderer.removeClass(this.sidebar.nativeElement, 'sidebar-open');
        }
      }
    );
  }
  ngOnInit(): void {}
  ngOnDestroy() {
    if (this.layoutSub) {
      this.layoutSub.unsubscribe();
    }
  }
  onClose() {
    this.layoutService.emitSidebarNotifyChange(false);
  }
  signout() {
    this.SignoutService.signout();
    console.log('SignoutService');
  }
}
