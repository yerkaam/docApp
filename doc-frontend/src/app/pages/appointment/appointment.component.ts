import {Component, inject} from '@angular/core';
import {DoctorService} from '../../services/doctor.service';
import {NgForOf} from '@angular/common';
import {AppointmentTimeComponent} from '../../common-ui/appointment-time/appointment-time.component';
import {FeedbackComponent} from '../../common-ui/feedback/feedback.component';
import {ChatComponent} from '../../common-ui/chat/chat.component';

@Component({
  selector: 'app-appointment',
  imports: [
    NgForOf,
    AppointmentTimeComponent,
    FeedbackComponent,
    ChatComponent
  ],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css'
})
export class AppointmentComponent {
  doctorService = inject(DoctorService);
  doctor = this.doctorService.doctor
  constructor() {
    if(this.doctor() === null){
      this.doctor.set(JSON.parse(<string>localStorage.getItem('doctor')));
    }
  }

  starsArray = Array(5).fill(0);
  getFillPercent(index: number): string {
    const rating = this.doctor()!.rating;
    this.doctor()!.rating = Math.floor(rating * 10) / 10;
    const diff = rating - index
    if (diff >= 1) return '100%';
    if (diff > 0 && diff < 1) return `${diff * 100}%`;
    return '0%';
  }
}
