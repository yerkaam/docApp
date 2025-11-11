import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { DoctorService } from '../../services/doctor.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

interface PaymentInfo {
  method: string;
  account: string;
  name: string;
  comment: string;
}

@Component({
  selector: 'app-payment-modal',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.css']
})
export class PaymentModalComponent {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private doctorService = inject(DoctorService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  date!: string;
  time!: string;

  payment: PaymentInfo = {
    method: 'kaspi',
    account: '',
    name: '',
    comment: ''
  };

  apiUrl = 'http://localhost:3000/api/appointments';

  constructor() {
    // читаем параметры из URL
    this.route.queryParams.subscribe(params => {
      this.date = params['date'];
      this.time = params['time'];
    });
  }

  confirmPayment() {
    const doctor = this.doctorService.doctor();
    const user = this.authService.me();

    if (!doctor || !user) {
      alert('Нет данных пользователя или доктора');
      return;
    }

    if (!this.payment.account || !this.payment.name) {
      alert('Заполните реквизиты (номер/имя)');
      return;
    }

    const body = {
      date: this.date,
      time: this.time,
      userId: user._id,
      doctorId: doctor._id,
      paymentInfo: this.payment
    };

    this.http.post(`${this.apiUrl}/pay-simulate`, body).subscribe({
      next: (res: any) => {
        alert(res.message || 'Оплата имитирована, слот забронирован ✅');
        this.router.navigate(['/appointments']); // возвращаемся на страницу слотов
      },
      error: (err) => alert(err.error?.message || 'Ошибка имитации оплаты')
    });
  }
}
