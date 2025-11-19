import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ClientGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const doctor = localStorage.getItem("doctors");

    if (doctor) {
      this.router.navigate(['/doctor-dashboard']);
      return false;
    }
    return true;
  }
}
