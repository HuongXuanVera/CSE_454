import {
  Component,
  OnInit,
  AfterViewInit,
  Inject,
  OnChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { LayoutService } from '../../services/layout.service';
import { NavService } from '../../services/nav.service';
import { SignoutService } from '../../services/signout.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isCollapsed = true;

  constructor(
    private layoutService: LayoutService,
    private signOut: SignoutService,
    public navServices: NavService,
  ) {}
  username: string = '';
  ngOnInit(): void {
    this.username += localStorage.getItem('username');
    console.log('username ' + this.username);
  }
 
  toggleSidebar() {
    if (
      (this.navServices.collapseSidebar = !this.navServices.collapseSidebar)
    ) {
      document.querySelector('.app')?.classList.add('sidenav-toggled');
    } else {
      document.querySelector('.app')?.classList.remove('sidenav-toggled');
    }
  }

  toggleSidebarNotification() {
    if (
      document
        .querySelector('.sidebar-right')
        ?.classList.contains('sidebar-open')
    ) {
      this.layoutService.emitSidebarNotifyChange(false);
    } else {
      this.layoutService.emitSidebarNotifyChange(true);
    }
  }

  toggleSwitcher() {
    if (document.querySelector('.demo_changer')?.classList.contains('active')) {
      //this.switcherService.emitSwitcherChange(false);
    } else {
      //this.switcherService.emitSwitcherChange(true);
    }
  }
  signout() {
    this.signOut.signout();
  }
}
