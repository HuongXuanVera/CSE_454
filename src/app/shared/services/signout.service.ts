import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SignoutService {
  constructor(private router: Router) {}
  signout() {
    localStorage.clear();
    this.router.navigate(['auth/login']);
  }
}
