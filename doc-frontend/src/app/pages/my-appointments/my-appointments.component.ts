import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { Appointment } from '../../interfaces/appointment.interface';
import { DoctorService } from '../../services/doctor.service';
import { Doctor } from '../../interfaces/doctor.interface';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-my-appointments',
  templateUrl: './my-appointments.component.html',
  imports: [
    DatePipe
  ],
  styleUrls: ['./my-appointments.component.css']
})
export class MyAppointmentsComponent {
  private apiUrl = 'http://localhost:3000/api';
  private http = inject(HttpClient);
  authService = inject(AuthService);
  doctorService = inject(DoctorService);

  me = this.authService.me;
  userId = '';

  appointments = signal<Appointment[]>([]);
  doctors = signal<Doctor[]>([]); // массив всех докторов

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.userId = profile.user._id;
      this.loadData();
    });
  }

  loadData() {
    this.http.get<Doctor[]>(`${this.apiUrl}/doctors`).subscribe(docs => {
      this.doctors.set(docs);

      this.http
        .get<Appointment[]>(`${this.apiUrl}/appointments/user/${this.userId}`)
        .subscribe(appts => this.appointments.set(appts));
    });
  }

  getDoctorById(id: string): Doctor | undefined {
    return this.doctors().find(d => d._id === id);
  }
}
