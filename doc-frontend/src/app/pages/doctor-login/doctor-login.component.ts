import {Component, inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {DoctorService} from '../../services/doctor.service';

@Component({
  selector: 'app-doctor-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doctor-login.component.html',
  styleUrls: ['./doctor-login.component.css']
})
export class DoctorLoginComponent {
  doctorService = inject(DoctorService);
  doctor = this.doctorService.doctors;
  email: string = "";
  password: string = "";

  constructor(
    public http: HttpClient,
    public router: Router
  ) {}

  login() {
    this.http.post("http://localhost:3000/api/doctor-login", {
      email: this.email,
      password: this.password,
    }).subscribe({
      next: (res: any) => {
        localStorage.setItem("doctors", JSON.stringify(res.doctor));
        this.doctor.set(res.doctor);
        this.router.navigate(['/doctor-dashboard']);
      },
      error: err => alert(err.error.message)
    });
  }
}
