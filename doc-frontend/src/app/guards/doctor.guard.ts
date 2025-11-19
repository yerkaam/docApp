import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class DoctorGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const doctor = localStorage.getItem("doctors");

    if (!doctor) {
      this.router.navigate(['/doctor-login']);
      return false;
    }
    return true;
  }
}
