import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { DoctorService } from '../../services/doctor.service';
import { Router } from '@angular/router';
import { NgIf, NgForOf, NgClass, DatePipe } from '@angular/common';

interface TimeSlot {
  time: string;
  available: boolean;
}

@Component({
  selector: 'app-appointment-time',
  standalone: true,
  imports: [NgIf, NgForOf, NgClass, DatePipe],
  templateUrl: './appointment-time.component.html',
  styleUrls: ['./appointment-time.component.css'],
})
export class AppointmentTimeComponent implements OnInit {
  private apiUrl = 'http://localhost:3000/api';
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private doctorService = inject(DoctorService);
  private router = inject(Router);

  days: string[] = [];
  selectedDate!: string;

  slots: TimeSlot[] = [];
  bookedSlots: string[] = [];

  ngOnInit() {
    this.generateNextDays(7);
    this.selectedDate = this.days[0];
    this.loadAppointmentsForDate();
  }

  generateNextDays(count: number) {
    const today = new Date();
    this.days = [];
    for (let i = 0; i < count; i++) {
      const day = new Date(today);
      day.setDate(today.getDate() + i);
      this.days.push(day.toISOString().split('T')[0]);
    }
  }

  selectDate(date: string) {
    this.selectedDate = date;
    this.loadAppointmentsForDate();
  }

  loadAppointmentsForDate() {
    const doctor = this.doctorService.doctor();
    if (!doctor) return;

    this.http
      .get<any[]>(`${this.apiUrl}/appointments?doctor=${doctor._id}&date=${this.selectedDate}`)
      .subscribe({
        next: (appointments) => {
          // нормализуем строки времени
          this.bookedSlots = appointments.map(a => a.time.trim());
          this.generateSlots();
          console.log(appointments);
        },
        error: (err) => console.error('Ошибка загрузки слотов', err),
      });
  }

  generateSlots() {
    const times = [
      '09:00','09:30','10:00','10:30','11:00','11:30',
      '12:00','12:30','13:00','14:00','14:30','15:00',
      '15:30','16:00','16:30','17:00'
    ];
    const now = new Date();

    this.slots = times.map(t => {
      const [h, m] = t.split(':').map(Number);
      const slotTime = new Date(this.selectedDate);
      slotTime.setHours(h, m, 0, 0);

      // проверяем занят ли слот
      const isBooked = this.bookedSlots.includes(t.trim());

      const available = slotTime > now && !isBooked;
      return { time: t, available };
    });
  }

  openPaymentPage(slot: TimeSlot) {
    if(!this.authService.me()){
      alert('You have not logged in!');
      this.router.navigate(['login']);
      return;
    }
    if (!slot.available) return;
    // при клике на слот переходим на страницу оплаты
    this.router.navigate(['payment'], {
      queryParams: { date: this.selectedDate, time: slot.time }
    });
  }
}
