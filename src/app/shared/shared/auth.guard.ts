import { LoginService } from 'src/app/shared/services/login.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private service: LoginService, private route: Router) {}
  canActivate() {
    if (this.service.IsLoggedIn() && this.service.IsNotLogin()) {
      return true;
    } else {
      this.route.navigate(['auth/login']);
      return false;
    }
  }
}
