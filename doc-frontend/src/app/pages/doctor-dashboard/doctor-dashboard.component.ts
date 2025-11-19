import { Component, inject } from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import { DoctorService } from '../../services/doctor.service';
import { Appointment } from '../../interfaces/appointment.interface';
import { AppointmentService } from '../../services/appointment.service';
import {AuthService} from '../../services/auth.service';
import {Profile} from '../../interfaces/profile.interface';

@Component({
  selector: 'app-doctor-dashboard',
  imports: [NgForOf, NgIf],
  templateUrl: './doctor-dashboard.component.html',
  styleUrl: './doctor-dashboard.component.css'
})
export class DoctorDashboardComponent {
  doctorService = inject(DoctorService);
  appointmentService = inject(AppointmentService);
  authService = inject(AuthService);
  doctor = this.doctorService.doctors;
  users: Profile | undefined
  appointments: Appointment[] = [];

  // Таблица: dayString → (time → appointment)
  table: Record<string, Record<string, Appointment | null>> = {};

  // Временные слоты
  timeSlots: string[] = [
    '09:00','09:30','10:00','10:30','11:00','11:30',
    '12:00','12:30','13:00','14:00','14:30','15:00',
    '15:30','16:00','16:30','17:00'
  ];

  // 7 дней
  days: Date[] = [];

  ngOnInit() {
    this.generateDays();
    this.loadAppointments();
  }

  loadAppointments() {
    const doctorId = this.doctor()?._id;

    if (!doctorId) {
      console.error("❌ doctorId not found");
      return;
    }

    this.appointmentService.getAppointmentsByDoctor(doctorId).subscribe(app => {
      this.appointments = app;
      console.log("Appointments:", this.appointments);

      this.buildTable();
    });
  }

  // Генерация 7 дней
  generateDays() {
    const today = new Date();
    this.days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      return d;
    });
  }

  // Формат: Wed 20
  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric'
    });
  }

  // Таблица слотов: день × время
  buildTable() {
    this.table = {};
    for (const day of this.days) {
      const dayStr = day.toISOString().split("T")[0]; // YYYY-MM-DD

      this.table[dayStr] = {};

      for (const time of this.timeSlots) {
        this.table[dayStr][time] = null;
      }
    }

    for (const app of this.appointments) {
      const dayStr = app.date.split("T")[0]; // "2025-11-18"
      const time = app.time;

      this.authService.getProfileById(app.userId).subscribe(profile =>{
        this.users = profile
      })
      if (this.table[dayStr] && this.table[dayStr][time] !== undefined) {
        this.table[dayStr][time] = app;
      }
    }

    console.log("Table:", this.table);
  }

  selectSlot(day: Date, time: string) {
    console.log('Selected:', {
      date: day.toISOString().split('T')[0],
      time: time
    });
  }
}
