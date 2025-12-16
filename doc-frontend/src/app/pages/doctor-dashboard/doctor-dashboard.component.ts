import { Component, inject, OnInit } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { DoctorService } from '../../services/doctor.service';
import { AppointmentService } from '../../services/appointment.service';
import { AuthService } from '../../services/auth.service';
import { Appointment } from '../../interfaces/appointment.interface';
import { Profile } from '../../interfaces/profile.interface';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css'],
  imports: [NgForOf, NgIf]
})
export class DoctorDashboardComponent implements OnInit {
  doctorService = inject(DoctorService);
  appointmentService = inject(AppointmentService);
  authService = inject(AuthService);

  doctor = this.doctorService.doctors;
  appointments: Appointment[] = [];

  // Словарь профилей: userId -> Profile
  profilesMap: Record<string, Profile> = {};

  // Таблица: день -> время -> Appointment + userProfile
  table: Record<string, Record<string, { appointment: Appointment, userProfile: Profile } | null>> = {};

  timeSlots: string[] = [
    '09:00','09:30','10:00','10:30','11:00','11:30',
    '12:00','12:30','13:00','14:00','14:30','15:00',
    '15:30','16:00','16:30','17:00'
  ];

  days: Date[] = [];

  ngOnInit() {
    this.generateDays();
    this.loadAppointments();
  }

  generateDays() {
    const today = new Date();
    this.days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      return d;
    });
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric'
    });
  }

  loadAppointments() {
    const doctorId = this.doctor()?._id;

    if (!doctorId) {
      console.error("❌ doctorId not found");
      return;
    }

    this.appointmentService.getAppointmentsByDoctor(doctorId).subscribe(apps => {
      this.appointments = apps;
      this.buildTableWithProfiles();
    });
  }

  buildTableWithProfiles() {
    // Создаем пустую таблицу
    this.table = {};
    for (const day of this.days) {
      const dayStr = day.toISOString().split("T")[0];
      this.table[dayStr] = {};
      for (const time of this.timeSlots) {
        this.table[dayStr][time] = null;
      }
    }

    // Получаем уникальные userId из appointments
    const uniqueUserIds = Array.from(new Set(this.appointments.map(a => a.userId)));

    // Загружаем все профили одновременно
    const profileObservables = uniqueUserIds.map(id => this.authService.getProfileById(id));

    forkJoin(profileObservables).subscribe(profiles => {
      profiles.forEach(profile => {
        this.profilesMap[profile._id] = profile;
      });

      // Заполняем таблицу
      for (const app of this.appointments) {
        const dayStr = app.date.split("T")[0];
        const time = app.time;
        const userProfile = this.profilesMap[app.userId];

        if (this.table[dayStr] && this.table[dayStr][time] !== undefined) {
          this.table[dayStr][time] = { appointment: app, userProfile };
        }
      }

      console.log("Table with profiles:", this.table);
    });
  }

  selectSlot(day: Date, time: string) {
    const dayStr = day.toISOString().split('T')[0];
    const cell = this.table[dayStr][time];
    if (cell) {
      console.log("Selected appointment:", cell.appointment);
      console.log("User profile:", cell.userProfile);
    } else {
      console.log('Selected empty slot:', { date: dayStr, time });
    }
  }
}
